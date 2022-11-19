import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// Se pueden encontrar más iconos aquí: https://oblador.github.io/react-native-vector-icons/
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import MyCryptoStack from './MyCryptoStack';
import SettingsStack from './SettingsStack';
import NewsStack from './NewsStack';

import {colors} from '../util/colors';

const Tab = createMaterialBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator
        barStyle={{backgroundColor: colors.backgroundDark}}
        activeColor={colors.accent}
      >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyCryptosStack"
        component={MyCryptoStack}
        options={{
          title: 'MyCryptos',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Noticias"
        component={NewsStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={SettingsStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
