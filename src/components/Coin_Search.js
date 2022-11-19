import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from 'react-native'
import {colors} from '../util/colors';

const Coin_Search=(props)=>{

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
            <Text style={styles.coinName}>{props.coin.item.name}</Text>
            <Text style={styles.coinSymbol}>({props.coin.item.symbol})</Text>
        </View>

    </View>
)
}

export default Coin_Search


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
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 2,
        marginBottom:10,
    }, 

    coinName:{
        textTransform: 'capitalize',
        color: colors.text,
        marginLeft:5,
        fontSize:17,
    },

    coinSymbol:{
        textTransform: 'uppercase',
        color: colors.text,
        marginLeft:5,
        fontSize:17,
    },

    image:{
        width:30,
        height:30,
        marginRight:10,
    },
  });