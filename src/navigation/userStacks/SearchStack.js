import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../components/Search';

import {colors} from '../../util/colors';
const Stack = createStackNavigator();

export default function SearchStack() {
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
        name="SearchScreen"
        component={Search}
        options={{
          title: 'Búsqueda',
        }}
      />
    </Stack.Navigator>
  );
}