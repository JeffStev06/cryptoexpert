import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewsScreen from '../screens/NewsViewScreen';

import {colors} from '../util/colors'
const Stack = createStackNavigator();

export default function NewsViewStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.backgroundDark,
          shadowColor: 'black',
        },
      }}>
      <Stack.Screen
        name="NewsViewScreen"
        component={NewsScreen}
        options={{
          title: 'Navegador Web',
        }}
      />
    </Stack.Navigator>
  );
}