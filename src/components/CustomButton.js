import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../util/colors';

export default function CustomButton(props) {
  const { onPress, title = 'Save', icon } = props;
  
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      {
        icon !== '' ? 
          <MaterialIcons 
            name={icon}
            color={colors.text}
            size={15}
          /> 
        : <View></View>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: colors.button,
    flexDirection: 'row'
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: colors.text,
  },
  active: {
    color: colors.accent,
  }
});