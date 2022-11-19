import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyAccountScreen from '../../screens/userScreens/MyAccount';

import {colors} from '../../util/colors';
const Stack = createStackNavigator();

export default function MyAccountStack() {
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
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          title: 'Mi Cuenta',
        }}
      />
    </Stack.Navigator>
  );
}
