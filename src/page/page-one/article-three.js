import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import firebase from 'firebase';

const taxiCollection = firebase.firestore().collection('taxi_info');

function getpageone(){
  const result =  taxiCollection.orderBy('passenger_count','desc')
  .limit(5)
  .get()
  .then(querySnapshot =>{
    querySnapshot.forEach(documentSnapshot =>{
      console.log(documentSnapshot.data());
    });
    
  });
}

const ArticleThree = () => {
    return (
      <Container style={styles.container}>
        <View  style={styles.body}>   
          <View style={styles.header}>
            <Card>
                <CardItem style={{backgroundColor:'#e85f5f'}}>
                  <Body>
                    <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>En uzun mesafeli 5 yolculuktaki gün ve mesafeleri</Text>
                  </Body>
                </CardItem>
            </Card>             
          </View>
          <ScrollView>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={() => {getpageone()}}>
              <Text>TO DO</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <StatusBar style="light" />
      </Container>
    );
};
export default ArticleThree;

const styles = new StyleSheet.create({
  container:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#deded5'
  },
  body:{ 
      flex:1,
      padding:10, 
      paddingBottom:30,
  },
  header:{
      marginBottom:10,
  },
});