import React, { useContext, useState } from 'react';
import {View, Text, Button, Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {colors} from '../../util/colors';
//Prueba nueva conf
import { useAuthState } from "react-firebase-hooks/auth";
import {  auth, registerWithEmailAndPassword, signInWithGoogle,getInformation} from "../../firebase/firebase";
import { NavigationContainer } from '@react-navigation/native';

const register = ({navigation}) => {
  const [email,setEmail] = useState();
  const [nombre,setNombre] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [user,loading,error]=useAuthState(auth);
  const register = () =>{

    if(nombre == '' || nombre.length < 1){
      alert("Ingresa tu Nombre")
      return
    }  
    
    if(email == '' || email.length < 1){
        alert("Ingresa tu Email")
        return
    }
    if(password == '' || password.length < 1){
        alert("Ingresa tu Contraseña")
        return
    }  
    registerWithEmailAndPassword(nombre,email,password);
    //console.info("Resultado del Registro = "+getInformation(user.uid,"cryptos",).length);
    navigation.navigate("MyCryptosStack")
  }

  return (
    <>
    <View style={styles.base}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput style={styles.input} textContentType="name" onChangeText={(nombre=> setNombre(nombre))} re ></TextInput>

      <Text style={styles.text}>Correo</Text>
      <TextInput style={styles.input} textContentType="emailAddress" onChangeText={(mail=>setEmail(mail))} ></TextInput>

      <Text style={styles.text}>Contraseña</Text>
      <TextInput style={styles.input} textContentType="password" onChangeText={(pass=>setPassword(pass))} secureTextEntry={true} ></TextInput>

      <View style={styles.marginBottom}>
        <Button title="Registrarse" color={colors.button} style={styles.button} onPress={async () => {
            register(nombre,email,password);
            
            }} />
      </View>

      <View style={styles.opcion}>
        <Text style={styles.text}>o</Text>
        <Text style={styles.text}>Registrate con Google</Text>
      </View>
      <View style={styles.opcion}>
        <TouchableOpacity onPress={signInWithGoogle}
        >
          <Image
              style={styles.tinyLogo}
              source={require('../../images/google.png')}
          />
        </TouchableOpacity>
      </View>
  
    </View>
    
    </>
  );
};

export default register;

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
    marginTop:40
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});
