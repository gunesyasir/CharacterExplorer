import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import {RootStackParamList, Screens} from './Screens';
import Episode from '../screens/Episode';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.Home}>
      <Stack.Screen
        name={Screens.Episode}
        component={Episode}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={Screens.Favorites}
        component={Favorites}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={Screens.Home}
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Root;
