import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {colors} from '../util/colors';
import HeaderBar from '../components/HeaderBar';
import {ScrollView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel
} from 'victory-native';

const CoinDetail = ({route, navigation}) => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [price,setPrice] = useState([]);  
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const {currency} = route.params;
    setSelectedCurrency(currency);
    console.log("CURRENCY: ",currency);
    //console.log("Json: ",JSON.stringify(currency["item"]["sparkline_in_7d"]))
    let pricesTemp = [];
    currency["item"]["sparkline_in_7d"]["price"].forEach(function (value,i) {
      let price_spark = {
        hour: i,
        price:value
      }
      pricesTemp = [...pricesTemp,price_spark];
    })
    setPrice(pricesTemp);
    let image = JSON.stringify(currency?.item.image);
    
    setImageUrl(image?.replace(/['"{}]/g, ''));
    console.log(image?.replace(/['"{}]/g, ''));
    //console.log("route.params: ",route.params);
  }, []);

  //** Arreglo de datos para dar formato x,y a los valores obtenidos desde la api para crear grafica de los ultimos 7 dias **//

  function renderHeader() {
    return (
      <View style={styles.base}>
        <View style={styles.containerb}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <Text style={styles.texth}>
            {selectedCurrency?.item.name} ({selectedCurrency?.item.symbol.toUpperCase()})
          </Text>
        </View>
      </View>
    );
  }

  function renderChart() {
    return (
      <View style={styles.base}>
        <View style={styles.chart}>
          <VictoryChart
            width={375}
            domain={{x: [0,167]}}
            theme={VictoryTheme.material}>
            <VictoryLine
              data={price}
              style={{
                data: {stroke: '#FFFF00'},
                parent: {border: '1px solid #fff'},
              }}
              x="day"
              y="price"
            />
          </VictoryChart>
        </View>
        <Text style={styles.title}>Otros datos</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.baseb}>
            <Text style={styles.text}>Precio</Text>
            <Text style={styles.text}>Cap. de Mercado</Text>
            <Text style={styles.text}>Volumen</Text>
            <Text style={styles.text}>Ranking en Mercado</Text>
          </View>
          <View style={styles.basec}>
            <Text style={styles.text}>
              ${selectedCurrency?.item.current_price}
            </Text>
            <Text style={styles.text}>
              ${selectedCurrency?.item.market_cap}
            </Text>
            <Text style={styles.text}>
              ${selectedCurrency?.item.total_volume}
            </Text>
            <Text style={styles.text}>
              {selectedCurrency?.item.market_cap_rank}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.basearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>{renderHeader()}</View>
        <View style={styles.card}>{renderChart()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDetail;

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    backgroundColor: colors.background,
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
  baseb: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  basec: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  basearea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: -130,
  },
  title: {
    color: colors.text,
    fontSize: 25,
  },
  text: {
    color: colors.text,
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 15,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.button,
  },
  card: {
    flex: 1,
    paddingBottom: 130,
  },
  chart: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    //paddingVertical: 180,
  },
  image: {
    height: 35,
    width: 35,
    //marginLeft: -25,
  },
  texth: {
    color: colors.text,
    fontSize: 30,
    marginLeft: 15,
  },
  icon: {
    color: 'white',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  containerb: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
