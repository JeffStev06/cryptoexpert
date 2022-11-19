import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import {colors} from '../../util/colors';
//import CustomButton from '../../components/CustomButton'
import CustomTable from '../../components/CustomTable'
import {auth,db} from '../../firebase/firebase'
import { useAuthState } from "react-firebase-hooks/auth";

const Balance = ({navigation}) => {
  //const [filtro,setFiltro] = useState('');
  const [totals, setTotals] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [cryptos, setCryptos] = useState([]);
  const [user,loading,error]=useAuthState(auth);
  
  const getInformation= async() => {
    try{      
      let array=[]
      await db.collection("cryptos").where("id_user","==",user.uid).orderBy("invest","desc").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          let obj = doc.data()
          array.push(obj);
          //console.info("Valor en for ="+JSON.stringify(obj))
        })
        console.info("Terminé, hoy guardaré en array.");
        setIsLoading(false);
        setCryptos(array);
      })
    }catch(err){
      console.error(err);
      ToastAndroid.show("Ocurrio un Error al Intentar Cargar Tu Información, Intenta de Nuevo", ToastAndroid.LONG);
    }
  }
  const updatePrices = async (oldCryptos) => {
    let newCryptos = []
    let coins = oldCryptos.map((item)=>(item.coinName)).join(",")
    console.log("Evaluando: " + coins)
    await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`)
    .then(resp => resp.json())
    .then(data => {
      oldCryptos.map((obj) => {
        let price = parseFloat(data[obj.coinName].usd)
        let newHoldings = parseFloat(Math.ceil((price * parseFloat(obj.holdingsBTC)) * parseFloat(100))/parseFloat(100))        
        console.log("Nuevo price: " + price + ", nuevo holdings: " + newHoldings.toFixed(2))
        obj.holdings = newHoldings
        obj.holdingsBTC = parseFloat(obj.holdingsBTC)
        newCryptos.push(obj)
      })
      console.log(" newCryptos update"+ newCryptos.length)
      return newCryptos
    })
    .catch(e => {
      console.log("Error updatePrices: " + e);
    })
  }

  const calculateTotals = () => {
    let valorActual = 0;
    let comprado = 0; 
    let vendido = 0;
    let lucro = 0; 
    let lucroP = 0;
    cryptos.map((item) => {
      valorActual += parseFloat(item.holdings);
      comprado += parseFloat(item.invest);
      vendido += parseFloat(item.profit);
      // lucro = valor actual - (comprado - vendido)
      // lucro = 43.57 - (100 - 100) = 43.57
      // lucro = 23.57 - (100 - 120) = 43.57
      lucro += (parseFloat(item.holdings) - (parseFloat(item.invest) - parseFloat(item.profit)))
    })
    valorActual = Math.floor(valorActual * 100) / 100
    lucro = Math.floor(lucro * 100) / 100
    let porcentaje = Math.floor(((lucro / comprado) * 100) * 100) / 100;
    if (porcentaje > 0) {
      lucroP = "(+"+ (porcentaje) +"%)"
    } else if (porcentaje < 0) {
      lucroP = "(-"+ (porcentaje*-1) +"%)"
    } else {
      lucroP = "("+ (porcentaje) +"%)"
    }

    setTotals({
      valorActual,
      comprado,
      vendido,
      lucro,
      lucroP
    })
  }

  useEffect(() => {
    if (!isLoading && cryptos.length != 0) {
      updatePrices(cryptos)
      .then((arrCryp) => {
        //console.log("new Cryptos use Effect "+JSON.stringify(newCryptos));
        if (arrCryp != undefined) {
          setCryptos(arrCryp)
          console.log("Guardando datos")
          
        }
      })
      .then(() => {
        calculateTotals()
        updateDB()
      })
      .catch(e => {
        console.log(e)
      })
    }
  }, [cryptos])


  const updateDB=()=>{
    try{
      console.log("Estoy Guardando tamanio="+cryptos.length)      
      cryptos.forEach((coinData)=>{
        console.log("coindata"+JSON.stringify(coinData))
        db.collection("cryptos").doc(coinData.coin + user.uid).set(coinData)      
      })
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    const interval=setInterval(()=>{
      getInformation()
      updatePrices(cryptos)
      //updateDB()
      console.log("Me corro cada 30 segundos")
    },30000)
  }, [])



  return (
    <View style={styles.base}>
      <Text style={[styles.text,styles.title]}>Saldo actual</Text>
      
      <Text style={[styles.text,styles.balance]}>{ isLoading ? <ActivityIndicator /> :  totals.valorActual!=undefined?"$ "+totals.valorActual:"$ 0" }</Text>
      <View>
        <View style={styles.data}>
          <Text style={styles.text}>Total comprado:</Text>
          <Text style={styles.text}>{ isLoading ? <ActivityIndicator /> : totals.comprado!=undefined?"$ "+totals.comprado:"$ 0" }</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>Total vendido:</Text>
          <Text style={styles.text}>{ isLoading ? <ActivityIndicator /> :  totals.vendido!=undefined?"$ " +totals.vendido:"$ 0" }</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>Total Ganado/Perdido: </Text>
          <Text style={ !isLoading && totals.lucro < 0 ? styles.textRed : styles.textGreen }>
            { isLoading ? <ActivityIndicator /> :( (totals.lucro!=undefined?"$ " +totals.lucro:"$ 0" )+ " " +(totals.lucroP!=undefined?"$ " +totals.lucroP:"(0%)")) }
          </Text>
        </View>
        <View style={styles.buttonPanel}>
          <View style={styles.filters}>
            {/* <CustomButton
              title="BTC/USD"
              onPress={() => console.log('Filtrar por compras CUSTOM')}
            /> */}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <CustomTable
        cryptos={cryptos}
        isLoading={isLoading}
      />
    </View>
  );
}

export default Balance;

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
  textGreen: {
    color: colors.green,
  },
  textRed: {
    color: colors.red,
  },
  title: {
    fontSize: 12,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 5
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonPanel: {
    marginTop: 10,
    flexDirection: 'row',
    fontSize: 10,
    justifyContent: 'space-between'
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  divider: {
    height: 5,
    paddingBottom: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
});
