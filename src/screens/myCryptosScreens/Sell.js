import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../util/colors';
import CustomModal from '../../components/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {checkNumber} from '../../util/utilFunctions'

import { auth, db, save } from "../../firebase/firebase";

const Sell = ({navigation}) => {
  const [user, loading, error] = useAuthState(auth);

  const [toSell, setToSell] = useState(0)
  const [toSellCoin, setToSellCoin] = useState(0)
  const [validationStyle, setValidationStyle] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const [showModal, setShowModal] = useState(false)
  // Valor actual de la moneda
  const [coinData, setCoinData] = useState(0);
  // Monedas de Firebase DISPONIBLES
  const [cryptos, setCryptos] = useState([])
  // Moneda seleccionada de Firebase
  const [selectedCrypto, setSelectedCrypto] = useState({})
  // Monedas de la API
  const [coins, setCoins] = useState([])
  // Moneda seleccionada de API
  const [selectedCoin, setSelectedCoin] = useState({})

  const getCryptos = async () => {
    try{
      let array=[]
      await db.collection("cryptos").where("id_user","==",user.uid).orderBy("invest","desc").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          let obj = doc.data()
          array.push(obj);
          console.info("Valor en for = " + JSON.stringify(obj))
        })
      })
      .then(() => {
        if (array.length != 0) {
          
          console.info("Terminé, hoy guardaré en array. array: " + array.length);
          getCoins(array);
          setCryptos(array);
        } else {
          console.log("No encontré cryptos")
          setIsDisabled(true)
        }
      })
    } catch (err) {
      console.error("Error en getCryptos" + err);
      ToastAndroid.show("Ocurrio un Error al Intentar Cargar Tu Información, Intenta de Nuevo", ToastAndroid.LONG);
    }
  }

  const getCoins = async (oldCryptos) => {
    let cryptosString = ""
    if (oldCryptos != undefined) {
      cryptosString = oldCryptos.map((item)=>(item.coinName)).join(",")
    }
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?ids=${cryptosString}&vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then(resp => resp.json())
    .then(data => {
      setCoins(data)
      setSelectedCoin(data[0])
      //setSelectedCrypto(findCrypto(data[0]))
    })
    .catch(e => {
      console.log("Error getCoins: " + e);
    })
  }

  const convert = (newPrice) => {
    //let factor = coinData.current_price
    //if (newPrice) {
    let factor = newPrice
    //}
    return parseFloat(toSell / factor).toFixed(8);
  }

  const findCrypto = (coinToFind) => {
    console.log("Finding Crypto with Coin")
    for (let i=0; cryptos.length; i++) {
      if (cryptos[i].coin.toLowerCase() == coinToFind.symbol.toLowerCase()) {
        //setSelectedCrypto(cryptos[i])
        console.log("selectedCrypto sería: " + cryptos[i] + ", numero: " + i)
        return cryptos[i]
      }
    }
  }

  useEffect(() => {
    if (selectedCoin.current_price != undefined) {
      //console.log("Por algún motivo entré a useEffect selectedCoin")
      setToSell(toSell)
      setToSellCoin(convert(selectedCoin.current_price))
      //console.log("selectedCoin: " + JSON.stringify(selectedCoin))
      setSelectedCrypto(findCrypto(selectedCoin))
      setIsLoading(false)
      setIsDisabled(false)
    } 
    //setIsLoading(false)
  }, [selectedCoin])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCryptos()
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    if (!isDisabled) {
      console.log("Por algún motivo entré a useEffect toSell")
      if (parseFloat(toSell) >= 0 && checkNumber(parseFloat(toSell))) {
        setValidationStyle({color: colors.text})

        // Validacion que no sea más de lo poseido
        if (parseFloat(toSell) > parseFloat(selectedCrypto.holdings)) {
          setValidationStyle({color: 'yellow'})
          setIsValid(false)
          ToastAndroid.show("Valor no válido", ToastAndroid.SHORT);
          return
        }

        let conver = convert(selectedCoin.current_price);
        if (conver == undefined) {
          setToSellCoin(0)
        } else {
          setToSellCoin(conver)
          setIsValid(true)
        }
      } else {
        setValidationStyle({color: colors.red})
        setIsValid(false)
        ToastAndroid.show("Valor no válido", ToastAndroid.SHORT);
      }
    }
  }, [toSell])

  const getOldCrypto = async (symbol) => {
    const loquequerrasponerle = await db.collection("cryptos")
    .where("id_user","==",user.uid)
    .where("coin","==",symbol).get()
    try {
      const otraconst = loquequerrasponerle.docs[0].data()      
      //console.log(JSON.stringify(loquequerrasponerle.docs[0]))
      return otraconst
    } catch (e) {
      console.log("Error verifyExist: " + e)
      return undefined
    }
  }

  const sell = () => {
    
    if (parseFloat(toSell) > parseFloat(selectedCrypto.holdings)) {
      Alert.alert("Saldo insuficiente")
      return
    }
    if (isValid && toSell != "" && parseFloat(toSell) > 0) {
      save("trading", {
        coin: selectedCrypto.coin,
        invested: parseFloat(toSell),
        bought: parseFloat(toSellCoin),
        type: 2,
        date: new Date(),
        user_id: user.uid
      })
      .then(()=>{
        getOldCrypto(selectedCrypto.coin)
        .then((oldCrypto) => {
          if (oldCrypto != undefined) {
            //const ref = db.ref()
            try {
              db.collection("cryptos").doc(oldCrypto.coin + user.uid).set({
                ...oldCrypto,
                profit: parseFloat(oldCrypto.profit) + parseFloat(toSell),
                invest: (parseFloat(oldCrypto.invest) - parseFloat(toSell)),
                holdings: (parseFloat(oldCrypto.holdings) - parseFloat(toSell)),
                holdingsBTC: (parseFloat(oldCrypto.holdingsBTC) - parseFloat(toSellCoin)).toFixed(8),
              })
              .then(() => {
                console.log("Actualizado")
              })
            } catch(e) {
              console.log(e)
            }
          } else {
            Alert.alert("Hubo un problema con tu solcitud, intentalo más tarde")
          }
        })
      })
      .then(()=>{
        setToSell(0)
        setTimeout(()=> 
          navigation.navigate("Balance")
        ,1000)
      })
      .catch(e => {
        console.log("Error guardando venta: " + e)
      })
    }
  }

  return (
    <ScrollView style={styles.base}>
      <View>
        <Text style={[styles.text,styles.title]}>Saldo disponible</Text>
        <View style={[styles.inputForm,{justifyContent:'flex-end'}]}>
            { isDisabled ?
              <Text style={{fontSize:15,color:colors.textDisabled}}>No hay monedas disponibles</Text>
              :
              isLoading ?
                <ActivityIndicator />
              :
              <Text style={[styles.tag,{color:colors.textDisabled}]}>
                {"$" + selectedCrypto.holdings}
              </Text>
            }
        </View>
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={[styles.text,styles.title]}>Total a vender en USD</Text>
        <View style={styles.inputForm}>
          <Text style={styles.tag}>$</Text>
          <TextInput
            style={[styles.input, validationStyle]}
            keyboardType="numeric"
            editable={!isDisabled}
            onChangeText={val => setToSell(val)}
            value={toSell.toString()}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={[styles.text,styles.title]}>Cantidad a vender</Text>
        <View style={styles.inputForm}>
          { 
            isDisabled ?
            <View style={styles.input}>
              <Text style={{fontSize:35,color:colors.textDisabled}}> 0.0</Text>
            </View>
            :
              isLoading ?
              <View style={styles.input}>
                <ActivityIndicator size="large" />
              </View>
              :
              <TextInput
                style={styles.input}
                editable={false}
                value={toSellCoin.toString()}
              />
          }
          <TouchableOpacity
            style={styles.select}
            disabled={isDisabled}
            onPress={()=> setShowModal(true)}
          >
            { 
              isDisabled ?
                <Text style={styles.selectText}>---</Text>
              :
                isLoading ?
                  <ActivityIndicator />
                :
                  <Text style={styles.selectText}>{selectedCoin.symbol.toUpperCase()}</Text>
            }
            <MaterialIcons 
              name="arrow-drop-down"
              color={colors.text}
              size={30}
            /> 
          </TouchableOpacity>
          {
            !isLoading && cryptos != undefined && !isDisabled ? 
              <CustomModal 
                visible={showModal}
                setVisibility={setShowModal}
                sellCoins={coins}
                setCoin={setSelectedCoin}
                modalType={2}
              />
            : <View />
          }
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.factorInfo} >
        { !isLoading && !isDisabled ?
          <Text style={styles.text}>
            {"1 " + selectedCoin.symbol.toUpperCase() + " = $" +  selectedCoin.current_price}
          </Text>
          : <View />
        }
      </View>
      <View style={styles.buttonPanel}>
        <Button
          title="Vender"
          onPress={() => sell()}
          disabled={isDisabled || !isValid}
          color={colors.button}
        />
      </View>
    </ScrollView>
  );
}


export default Sell;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: colors.text,
  },
  title: {
    fontSize: 12,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 5
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tag: {
    fontSize: 40,
    color: colors.text,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 40,
    paddingVertical: 0,
    color: colors.text,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 40,
    color: colors.accent,
    fontWeight: 'bold'
  },
  buttonPanel: {
    marginVertical: 50,
    paddingHorizontal:30
  },
  divider: {
    height: 5,
    paddingBottom: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  factorInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});
