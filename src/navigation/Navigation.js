import React, { useEffect, useState,useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchStack from './userStacks/SearchStack';
import TabStack from './TabStack';
import LoginStack from './userStacks/LoginStack';
import RegisterStack from './userStacks/RegisterStack'
import ResetPassStack from './userStacks/ResetPassStack'
import MyAccountStack from './userStacks/MyAccountStack';
import {colors} from '../util/colors';
import NewsViewStack from './NewsViewStack';
//Nueva implementacion
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase";

import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

export default function MyTabs() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        barStyle={{backgroundColor: colors.backgroundDark}}
        activeColor={colors.accent}>
        <Stack.Screen
          name="Home"
          component={TabStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPass"
          component={ResetPassStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccountStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
