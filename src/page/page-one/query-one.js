import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Card, CardItem, Text, Body } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Adresses, GetData, ParseDate } from "../../services/db-services";

export default class QueryOneOne extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Data:null
    }
    this.Query()
  }

  Query = async (data) =>{
    var result = await GetData(null, Adresses.TypeOne.One);
    if(result) {this.setState({Data : result})}
  }
  
  render(){
    return (
        <Container style={styles.container}>
          <View style={styles.body}>   
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Card>
                  <CardItem style={{backgroundColor:'#e85f5f'}}>
                    <Body>
                      <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>En fazla yolcu taşınan 5 gün ve toplam yolcu sayıları</Text>
                    </Body>
                  </CardItem>
              </Card>             
            </View>
              <View style={{flex:1}}>
              { 
                this.state.Data != null &&
                this.state.Data.map((p,key)=>{
                  return (
                    <Card key={key}>
                      <CardItem header>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>{key + 1}. Kayıt</Text>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <Grid>
                              <Row><Text style={{marginBottom:5, fontSize:18, fontWeight:'bold'}}>Yolcuların yolculuk ettiği tarih</Text></Row>
                              <Row><Text style={{marginBottom:5, fontSize:18}}>{ParseDate(new Date(p.puDatetime))}</Text></Row>
                              <Row><Text style={{marginBottom:5, fontSize:18, fontWeight:'bold'}}>Toplam yolcu sayısı </Text></Row>
                              <Row><Text style={{marginBottom:5, fontSize:18}}>{p.passenger_count}</Text></Row>
                          </Grid>
                        </Body>
                      </CardItem>
                    </Card>
                    )
                })            
              }
              </View>
            </ScrollView>
          </View>
          <StatusBar style="light" />
        </Container>
      );
  }
}

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
  scrollView:{ 
    flex:1,
},
});