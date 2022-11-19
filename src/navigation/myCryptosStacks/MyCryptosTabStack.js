import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import BalanceScreen from '../../screens/myCryptosScreens/Balance';
import BuyScreen from '../../screens/myCryptosScreens/Buy';
import SellScreen from '../../screens/myCryptosScreens/Sell';

import {colors} from '../../util/colors';
const Tab = createMaterialTopTabNavigator();

export default function MyCryptosTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textDisabled,
        tabBarIndicatorStyle: {backgroundColor: colors.accent},
        tabBarLabelColor: {color: colors.text},
        tabBarStyle: {
          backgroundColor: colors.backgroundDark,
        },
      }}>
      <Tab.Screen
        name="Balance"
        component={BalanceScreen}
        options={{
          titleBarLabel: 'Balance',
        }}
      />
      <Tab.Screen
        name="Comprar"
        component={BuyScreen}
        options={{
          titleBarLabel: 'Comprar',
        }}
      />
      <Tab.Screen
        name="Vender"
        component={SellScreen}
        options={{
          titleBarLabel: 'Vender',
        }}
      />
    </Tab.Navigator>
  );
}
