import React from 'react';
import Router from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReactNativePaperProvider } from 'react-native-paper';
import { LoadingDeepLink } from './components/LoadingDeepLink';

const queryClient = new QueryClient();

const config = {
  screens: {
    Home: 'home/:categoryName?',
    ProductDetail: 'productDetail/:productId',
  },
};

const linking = {
  prefixes: ['productsapp://'],
  config,
};

const AppRouter = () => {
  return (
    <NavigationContainer linking={linking} fallback={<LoadingDeepLink />}>
      <ReactNativePaperProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ReactNativePaperProvider>
    </NavigationContainer>
  );
};

export default AppRouter;
