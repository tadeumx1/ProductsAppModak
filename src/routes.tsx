import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamListStack } from './types';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';

const Stack = createNativeStackNavigator<RootParamListStack>();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
        initialParams={{ categoryName: null }}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{ headerShown: false }}
        component={ProductDetail}
      />
    </Stack.Navigator>
  );
};

export default Router;
