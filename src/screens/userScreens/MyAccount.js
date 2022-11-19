import React, { useState, useEffect } from 'react';
import {View, Text, Button, Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from '../../util/colors';
import {auth} from '../../firebase/firebase'
import { useAuthState } from "react-firebase-hooks/auth";

const MyAccount = () => {
  const [user,loading,error]=useAuthState(auth);
  
  const [email,setEmail] = useState();
  const [nombre,setNombre] = useState();
  const [password,setPassword] = useState('123456');
  const [confirmPassword,setConfirmPassword] = useState();

  useEffect(() => {
    setEmail(user.email)
  }, [])

  return (
    <>
    <View style={styles.base}>      
      <Text style={styles.text}>Correo</Text>
      <TextInput
        style={styles.input}
        onChangeText={(mail=> setEmail(mail))} 
        value={email}
      />

      <View style={styles.marginBottom}>
        <Button title="Aceptar" color={colors.button} style={styles.button} onPress={() => console.log('Actualizar info usuario')} />
      </View>
    </View>
    
    </>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    paddingTop:10,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.button,
  },
  input:{
    borderBottomColor:'#FFF',
    borderBottomWidth: 1,
    color:'#FFF',
    padding:10
  },
  opcion: {
    padding:20,
    alignItems:'center'
  },
  marginBottom:{
    marginTop:80
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
});
