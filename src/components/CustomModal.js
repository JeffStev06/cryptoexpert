import React, {useState, useEffect} from "react";
import {
  Modal,
  View,Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import {colors} from '../util/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from "./CustomButton";

export default function CustomModal(props) {
  const {visible, setVisibility, setCoin, sellCoins, modalType} = props;
  const [search, setSearch] = useState("")
  const [inputStyle,setInputStyle] = useState({borderBottomColor: colors.text})
  const [isLoading,setIsLoading] = useState(true);
  const [coins, setCoins] = useState([])

  const getCoins = async () => {
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then(resp => resp.json())
    .then(data => {
      setCoins(data)
      setIsLoading(false)
    })
    .catch(e => {
      console.log("Error getCoins: " + e);
    })
  }

  useEffect(() => {
    //setIsLoading(true)
    if (modalType == 1) {
      getCoins()
    } else {
      if (sellCoins != undefined) {
        setCoins(sellCoins)
        setIsLoading(false)
      }
    }
  }, [])

  const Row = ({item}) => {
    return(
      <TouchableOpacity
        style={styles.searchRow}
        onPress={() => {setCoin(item); setVisibility(false)}}
      >
        <View style={styles.searchRowItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.image} source={{uri: item.image}} />
            <Text style={[styles.text,{marginLeft:15}]}>{item.name}</Text>
          </View>
          <Text style={{marginRight:15,color:colors.textDisabled}}>${item.current_price}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        //Alert.alert("Modal has been closed.");
        setVisibility(false);
      }}
    >
      <View style={styles.view}>
        <View style={styles.modalView}>
          <View style={styles.searchArea}>
            <MaterialIcons 
              name="search"
              size={30}
              color="white"
            />
            <TextInput
              style={[styles.input, inputStyle]}
              onFocus={() => setInputStyle({borderBottomColor: colors.accent})}
              onBlur={() => setInputStyle({borderBottomColor: colors.text})}
              onChangeText={val => setSearch(val)}
              value={search}
            />
          </View>
          <View style={styles.listArea}>
          {
            isLoading ?
              <View style={styles.loader}>
                <ActivityIndicator />
              </View>
            :
            <FlatList
              data={coins.filter(
                (coin) => 
                  coin.name.toLowerCase().includes(search) ||
                  coin.symbol.toLowerCase().includes(search)
                )}
              renderItem={Row}
              keyExtractor={item => item.id}
            />
          }
          </View>

          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setVisibility(false)}
            >
              <Text style={styles.text}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 40,
    marginVertical: 100,
    backgroundColor: colors.backgroundDark,
    borderRadius: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView: {
    flex:1,
    padding: 15,
    flexDirection: 'column'
  },
  text: {
    color: colors.text
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 30,
    fontSize: 25,
    paddingVertical: 0,
    color: colors.text,
    borderBottomWidth: 1,
    marginLeft: 10
  },
  searchRow: {
    flexDirection: 'column',
  },
  searchRowItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: colors.gray,
    borderBottomColor: colors.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  listArea: {
    flex: 1,
    marginTop: 20
  },
  image:{
    width:30,
    height:30,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 3,
    padding: 5
  },
  loader: {
    marginVertical: 20
  }
})
