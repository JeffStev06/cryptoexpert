import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResetPass from '../../screens/userScreens/ResetPass';

import {colors} from '../../util/colors';
const Stack = createStackNavigator();

export default function ResetPassStack() {
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
        name="ResetStack"
        component={ResetPass}
        options={{
          title: 'Cambiar Contraseña',
        }}
      />
    </Stack.Navigator>
  );
}
