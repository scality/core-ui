import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { coreUIAvailableThemes } from './style/theme';

export const getWrapper = () => {
  const queryClient = new QueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    );
  };

  return { Wrapper: Wrapper, queryClient: queryClient };
};
