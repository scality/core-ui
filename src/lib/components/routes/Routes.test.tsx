import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, useLocation } from 'react-router';
import { getWrapper } from '../../testUtils';
import { Tabs } from '../tabsv2/Tabsv2.component';
import {
  Routes,
  toRoutePattern,
  useCurrentRoutePattern,
} from './Routes.component';

const CurrentPattern = () => (
  <output aria-label="pattern">{useCurrentRoutePattern() ?? 'none'}</output>
);

const NodeTabs = () => {
  const { pathname } = useLocation();
  const baseUrl = pathname.substring(0, pathname.lastIndexOf('/'));
  return (
    <Tabs>
      <Tabs.Tab path={`${baseUrl}/overview`} label="Overview">
        Overview content
      </Tabs.Tab>
      <Tabs.Tab path={`${baseUrl}/alerts`} label="Alerts">
        Alerts content
      </Tabs.Tab>
    </Tabs>
  );
};

const NodePage = () => (
  <Routes>
    <Route path=":name/*" element={<NodeTabs />} />
  </Routes>
);

const MicroApp = () => (
  <Routes>
    <Route path="nodes/*" element={<NodePage />} />
    <Route path="about" element={<>About</>} />
  </Routes>
);

const renderAt = (path: string) => {
  const { Wrapper } = getWrapper();
  return render(
    <Wrapper>
      <MemoryRouter initialEntries={[path]}>
        <CurrentPattern />
        <Routes>
          <Route path="/platform/*" element={<MicroApp />} />
        </Routes>
      </MemoryRouter>
    </Wrapper>,
  );
};

describe('Routes', () => {
  it('reports the full pattern across nested Routes and Tabs', () => {
    renderAt('/platform/nodes/node-1/overview');

    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'pattern' })).toHaveTextContent(
      '/platform/nodes/:name/overview',
    );
  });

  it('updates the pattern on navigation', async () => {
    renderAt('/platform/nodes/node-1/overview');

    await userEvent.click(screen.getByRole('tab', { name: /Alerts/ }));

    expect(screen.getByText('Alerts content')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'pattern' })).toHaveTextContent(
      '/platform/nodes/:name/alerts',
    );
  });

  it('reports the deepest matching route when a nested Routes matches nothing', () => {
    renderAt('/platform/nodes');

    expect(screen.getByRole('status', { name: 'pattern' })).toHaveTextContent(
      '/platform/nodes/*',
    );
  });

  it('renders the children of a layout route without an element', () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <MemoryRouter initialEntries={['/settings/profile']}>
          <CurrentPattern />
          <Routes>
            <Route path="settings" element={null}>
              <Route path="profile" element={<>Profile</>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Wrapper>,
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'pattern' })).toHaveTextContent(
      '/settings/profile',
    );
  });

  it('forgets the pattern of unmounted routes', () => {
    const { unmount } = renderAt('/platform/about');
    expect(screen.getByRole('status', { name: 'pattern' })).toHaveTextContent(
      '/platform/about',
    );
    unmount();

    renderAt('/elsewhere');
    expect(screen.getByRole('status', { name: 'pattern' })).toHaveTextContent(
      'none',
    );
  });
});

describe('toRoutePattern', () => {
  it('drops the splat of every parent and keeps index routes out', () => {
    expect(
      toRoutePattern([
        { route: { path: '/platform/*' } },
        { route: { path: 'volumes/*' } },
        { route: { index: true } },
      ] as Parameters<typeof toRoutePattern>[0]),
    ).toBe('/platform/volumes');
  });

  it('returns null without matches', () => {
    expect(toRoutePattern([])).toBeNull();
  });
});
