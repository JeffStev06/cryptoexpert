import React, {useEffect, useState} from 'react';
import { View, FlatList, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import {colors} from '../util/colors';

export default function CustomTable(props) {
  const {cryptos, isLoading} = props;
  //const [cryptos, setCryptos] = useState([...rows]);
  const navigation = useNavigation()

  /*useEffect(() => {
    newCryptos = [];
    updatePrices()
  }, [])*/
  
  //onPress={() => navigation.navigate("MyAccount", {currency : item})}
  const Row = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("CoinStatitics", {currency : item})}
      >
        <View style={styles.row}>
          <View style={[styles.cell, styles.cellStyle]}>
            <View style={styles.doubleCell}>
              <Image style={styles.image} source={{uri: item.image}} />
              <Text style={styles.text}>{item.coin.toUpperCase()}</Text>
            </View>
          </View>
          <View style={[styles.cell, styles.cellStyle]}>
            <Text style={styles.text}>$ {item.invest}</Text>
          </View>
          <View style={[styles.cell, styles.cellStyle]}>
            <Text style={styles.text}>$ {item.profit}</Text>
          </View>
          <View style={[styles.cellBig,styles.cellStyle]}>
            <View style={[styles.doubleCell]}>
              <Text style={styles.text}>$ {item.holdings}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.subText,{fontWeight: 'bold'}]}>{item.holdingsBTC}</Text>
                <Text style={styles.subText}> {item.coin.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.cell, styles.cellStyle]}>
          <Text style={[styles.text,styles.title]}>Moneda</Text>
        </View>
        <View style={[styles.cell, styles.cellStyle]}>
          <Text style={[styles.text,styles.title]}>Compras</Text>
        </View>
        <View style={[styles.cell, styles.cellStyle]}>
          <Text style={[styles.text,styles.title]}>Ventas</Text>
        </View>
        <View style={[styles.cellBig, styles.cellStyle]}>
          <Text style={[styles.text]}>Valor en Cartera</Text>
        </View>
      </View>
      {
        isLoading ?
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        :
          <FlatList
            data={cryptos}
            renderItem={Row}
            keyExtractor={item => item.coin}
          />
      }
      
    </View>
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
  },
  title: {
    fontWeight: 'bold',
    paddingVertical: 10
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: colors.text,
  },
  subText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: colors.textDisabled,
  },
  active: {
    color: colors.accent,
  },
  image:{
    width:30,
    height:30,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellBig: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cellStyle: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    paddingVertical: 5,
  },
  doubleCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  loader: {
    marginVertical: 25
  }
});