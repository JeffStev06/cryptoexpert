import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {colors} from '../util/colors';
import { WebView } from 'react-native-webview';


export default function NewsViewScreen({navigation, route}) {

  return (
    <View style={styles.base}>
    <Text>{console.log(route.params)}</Text>
      <WebView source={{ uri: route.params.url }} />
    </View>
  );
}

const styles = StyleSheet.create({

  base:{
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 1,
    marginTop:-17,
  },
  });
