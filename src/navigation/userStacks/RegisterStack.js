import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../../screens/userScreens/Register';

import {colors} from '../../util/colors';
const Stack = createStackNavigator();

export default function RegisterStack() {
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
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Registro',
        }}
      />
    </Stack.Navigator>
  );
}
