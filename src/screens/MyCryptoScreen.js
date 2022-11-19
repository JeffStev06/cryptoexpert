import { Navigation, navigate,NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
//import {StackNavigator} from 'react-navigation';

import {colors} from '../util/colors';

const MyCryptoScreen = ({navigation}) => {
  
 
  
  return (
    <View style={styles.base}>
      <Image source={require('../images/logo-dark.png')} style={styles.logo}/>
      <Text style={styles.text}>Para acceder a esta</Text> 
      <Text style={styles.text}>funcionalidad debes tener</Text> 
      <Text style={styles.text}>una cuenta</Text>
      <View style={styles.margin}></View> 
      <Button title="          Registrate           " color={colors.button} style={styles.button}
        onPress={() => navigation.navigate('Register')} />
      <View style={styles.margin}></View>
      <Button title="         Inicia sesion         " color={colors.button} style={styles.button} 
        onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default MyCryptoScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 5,
    paddingVertical: 100,
    alignItems: 'center',
  },
  margin: {
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 25,
  },
  logo: {
    width: 220,
    height: 125,
    marginBottom: 50,
  },
  button: {
    backgroundColor: colors.button,
    margin: 15,
    width: "100%",
  },
});
