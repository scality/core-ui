import { QueryClient, QueryClientProvider } from 'react-query';
import { coreUIAvailableThemes } from './style/theme';
import { CoreUiThemeProvider } from './components/coreuithemeprovider/CoreUiThemeProvider';

export const getWrapper = () => {
  const queryClient = new QueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CoreUiThemeProvider>
    );
  };

  return { Wrapper: Wrapper, queryClient: queryClient };
};
