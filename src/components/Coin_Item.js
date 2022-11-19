//import { NavigationContainer } from '@react-navigation/native'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {colors} from '../util/colors';

const Coin_Item=(props)=>{

    const [priceChange, setPriceChange] = useState(0)

    const priceFormat = () =>{
        setPriceChange(props.coin.item.price_change_percentage_24h)
        return priceChange
      }

      useEffect(()=>{
        priceFormat()
      }, [])

return(
    <View style={styles.containerItem}>
        <View style={styles.name}>
            <Image 
                style={styles.image}
                source={{uri: props.coin.item.image }}
            />
            <Text style={styles.coinSymbol}>{props.coin.item.symbol}</Text>
        </View>
        <Text style={styles.price}>${props.coin.item.current_price}</Text>
        <Text style={priceChange>0 ? styles.priceChange : styles.priceChangeNegative}>{priceChange.toFixed(2)}%</Text>
        <Text style={styles.marketCap}>${props.coin.item.market_cap}</Text>
    </View>
)
}

export default Coin_Item


const styles = StyleSheet.create({

    containerItem:{
        paddingTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(214, 214, 214, 0.1)',
        borderBottomWidth: 2,
        marginHorizontal: 5,
    },

    name:{
        flexDirection: 'column',
        width: '15%',
        alignItems:'center',
    },

    price: {
        color: colors.text,
        width: '25%',
        textAlign: 'center',
        textAlignVertical: 'center',
    }, 

    priceChange: {
        color: 'rgb(102,184,93)',
        width: '25%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    priceChangeNegative: {
        color: 'red',
        width: '25%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    
    marketCap: {
        color: colors.text,
        width: '35%',
        textAlign: 'center',
        textAlignVertical: 'center',
      }, 
      

    coinSymbol:{
        textTransform: 'uppercase',
        color: colors.text,
    },

    image:{
        width:30,
        height:30,
    },
  });