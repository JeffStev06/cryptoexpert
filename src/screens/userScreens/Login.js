import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../util/colors';
//Prueba nueva impl
import { auth, signInWithEmailAndPassword , signInWithGoogle} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({navigation, navigation: { goBack }}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const login=()=>{

    if(email == '' || email.length < 1){
      alert("Ingresa tu Email")
      return
    }
    if(pass == '' || pass.length < 1){
        alert("Ingresa tu Contraña")
        return
    }  
    signInWithEmailAndPassword(email, pass)
  }
  
  useEffect(() => {
    console.log("Cargando: " + loading)
    if (!loading && user) {
      //navigation.navigate(CommonActions.goBack());
      goBack()
    }
  }, [user])
  

  return (
    <ScrollView style={styles.base}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../images/logo-dark.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>Correo electrónico: </Text>
      <TextInput
        style={styles.input}
        onChangeText={val => setEmail(val)}
        value={email}
        autocomplete="email"
      />
      <Text style={styles.text}>Contraseña: </Text>
      <TextInput
        style={styles.input}
        onChangeText={val => setPass(val)}
        value={pass}
        secureTextEntry={true}
      />
      <Button
        title="Acceder"
        color={colors.button}
        onPress={async () => {
          login()
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.link, styles.centered]}>
          No tienes una cuenta?, crea una aquí
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};
/*
<TouchableOpacity onPress={signInWithGoogle} style={styles.imageG} >
  <Image
      style={styles.tinyLogo}
      source={require('../../images/google.png')}
  />
</TouchableOpacity>
*/
export default LoginScreen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    color: colors.text,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  logo: {
    width: 180,
    height: 100,
  },
  input: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    color: '#FFF',
    padding: 10,
    marginBottom: 20,
  },
  link: {
    marginBottom: 25,
    color: colors.link,
  },
  centered: {
    textAlign: 'center',
    marginTop: 30,
  },
  imageG:{
    alignItems:'center',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});
