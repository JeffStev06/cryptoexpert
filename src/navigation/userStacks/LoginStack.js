import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/userScreens/Login';

import {colors} from '../../util/colors';
const Stack = createStackNavigator();

export default function LoginStack() {
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
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Iniciar Sesión',
        }}
      />
    </Stack.Navigator>
  );
}
