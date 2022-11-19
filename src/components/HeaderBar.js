import React from 'react';
import {colors} from '../util/colors';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../images/left.png';

const HeaderBar = ({right}) => {

    const navigation = useNavigation();

    return(
        <View style={styles.base}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.text}><FontAwesomeIcon icon={ faArrowLeft } style={ styles.icon } size={35}/>  Regresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default HeaderBar;

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  text: {
    color: colors.text,
    fontSize: 30,
    marginLeft: 5,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container:{
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    width: 25,
    height: 25,
  },
  icon: {
    color: 'white',
  },
});