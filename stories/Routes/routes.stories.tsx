import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ReactNode } from 'react';
import {
  Link,
  MemoryRouter,
  Route,
  Routes as ReactRouterRoutes,
  useLocation,
} from 'react-router';
import styled from 'styled-components';
import {
  RoutePatternProvider,
  Routes,
  useCurrentRoutePattern,
} from '../../src/lib/components/routes/Routes.component';
import { spacing, Stack } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { Wrapper } from '../common';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  padding: ${spacing.r16};
  color: ${(props) => props.theme.textPrimary};
  background: ${(props) => props.theme.backgroundLevel3};
`;

const CurrentRoute = () => {
  const { pathname } = useLocation();
  const pattern = useCurrentRoutePattern();
  return (
    <Panel>
      <Text>
        URL: <code>{pathname}</code>
      </Text>
      <Text>
        Reported pattern: <code>{pattern ?? 'null'}</code>
      </Text>
    </Panel>
  );
};

const Navigation = () => (
  <Stack gap="r16">
    <Link to="/">Home</Link>
    <Link to="/nodes">Nodes</Link>
    <Link to="/nodes/node-1">Node node-1</Link>
    <Link to="/nodes/node-1/alerts">Node node-1 alerts</Link>
  </Stack>
);

const Page = ({ title }: { title: string }) => <Text>{title}</Text>;

const NodeRoutes = () => (
  <Routes>
    <Route path="/" element={<Page title="Node overview" />} />
    <Route path="alerts" element={<Page title="Node alerts" />} />
  </Routes>
);

const UntrackedNodeRoutes = () => (
  <ReactRouterRoutes>
    <Route path="/" element={<Page title="Node overview" />} />
    <Route path="alerts" element={<Page title="Node alerts" />} />
  </ReactRouterRoutes>
);

const NodesApp = ({ nodeRoutes }: { nodeRoutes: ReactNode }) => (
  <Routes>
    <Route path="/" element={<Page title="Home" />} />
    <Route path="nodes" element={<Page title="Nodes" />} />
    <Route path="nodes/:nodeName/*" element={nodeRoutes} />
  </Routes>
);

const Demo = ({ nodeRoutes }: { nodeRoutes: ReactNode }) => (
  <MemoryRouter initialEntries={['/nodes/node-1/alerts']}>
    <RoutePatternProvider>
      <Stack direction="vertical" gap="r16">
        <Navigation />
        <CurrentRoute />
        <NodesApp nodeRoutes={nodeRoutes} />
      </Stack>
    </RoutePatternProvider>
  </MemoryRouter>
);

const meta: Meta<typeof Routes> = {
  title: 'Components/Navigation/Routes',
  component: Routes,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};
export default meta;

type Story = StoryObj<typeof Routes>;

export const NestedRoutes: Story = {
  render: () => <Demo nodeRoutes={<NodeRoutes />} />,
};

export const MixedWithReactRouterRoutes: Story = {
  render: () => <Demo nodeRoutes={<UntrackedNodeRoutes />} />,
};
