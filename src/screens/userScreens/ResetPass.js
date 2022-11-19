import React, {useState, useContext} from 'react';
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
import { sendPasswordResetEmail } from "../../firebase/firebase";

const ResetPass =({navigation})=>{
    const [email, setEmail] = useState('');
    return (
        <ScrollView style={styles.base}>
            <Text style={styles.text}>Correo electrónico: </Text>
            <TextInput
                style={styles.input}
                onChangeText={val => setEmail(val)}
                value={email}
                autocomplete="email"
            />
            <Button
                title="Acceder"
                color={colors.button}
                onPress={async () => {
                    await sendPasswordResetEmail(email);
                    navigation.goBack();
                }} />
        </ScrollView>
    );
};
export default ResetPass;
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
  