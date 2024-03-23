import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {RootStackParamList, Screens} from './Screens';
import Episode from '../screens/Episode';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.Home} component={Home} />
      <Stack.Screen name={Screens.Episode} component={Episode} />
    </Stack.Navigator>
  );
};

export default Root;
