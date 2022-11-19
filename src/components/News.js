import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../util/colors';
import {WebView} from 'react-native-webview';

class News extends Component {
  state = {
    news: [],
  };

  componentDidMount() {
    fetch(
      'https://newsapi.org/v2/everything?q=crypto&from=2021-11-10&to=2021-11-11&sortBy=popularity&apiKey=f43b37842fe54e40970127723ee95818',
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          news: response.articles,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        {this.state.news.length === 0 ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {this.state.news.map((news, index) => (
                
              <View style={styles.new}>
                <View style={styles.newTxt}>
                    <Text style={styles.title}>
                    {(news.title).substring(0,60)}...
                    </Text>
                    <Text style={styles.description}>
                    {news.description=== null ? news.description : (news.description).substring(0,30)}...
                    </Text>
                </View>
                <Image
                  source={{uri: `${news.urlToImage}`}}
                  style={styles.img}
                />
              </View>
              
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default News;

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

    new: {
        margin: 5,
        flexDirection: 'row',
        borderBottomColor:'white',
        borderBottomWidth: 0.5,
      },

    newTxt: {
        flexDirection: 'column',
        fontSize:12,
        width: 200,
        color: 'white'
      },

      description: {
        color: 'white',
        marginTop:20,
        fontSize:10,
      },
    
    img: {
        height: 80, 
        width: 140, 
        borderRadius: 10,
        marginLeft:10,
    },

    title: {
        width: 200, 
        textAlign: 'justify', 
        color: "white",
    },
  });