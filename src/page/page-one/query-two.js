import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Card, CardItem, Text, Body, Item, Input, Button, Form } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Adresses, GetData, ParseDate } from "../../services/db-services";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class QueryOneTwo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Data:null,
      inputData:{
        distance:null,
      }
    }
  }
 
  Query = async () =>{
    if(this.state.inputData.distance != null || this.state.inputData.distance != ""){
      let result = await GetData(JSON.stringify(this.state.inputData), Adresses.TypeOne.Two);
      if(result){
        this.setState({Data : result})
      }  
    }
  } 

  render(){
    return (
      <Container style={styles.container}>
        <View  style={styles.body}>   
        <ScrollView style={{flex:1}}>
          <View style={styles.header}>
            <Card>
              <CardItem header style={{backgroundColor:'#e85f5f', flexDirection:'column'}}>
                <Body>
                  <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Belirli mesafenin altında en çok seyahat yapılan gün ve seyahat uzunluğu</Text>
                </Body>
              </CardItem>
            </Card>  
            <Card>
              <CardItem header style={{backgroundColor:'#e85f5f', flexDirection:'column'}}>
                <Body>
                  <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Mesafe Giriniz :</Text>
                  <Form style={{alignSelf: 'stretch'}}>
                    <Item full style={{marginBottom:10, marginLeft:0}}>
                      <Icon color='white' style={{fontSize:30}} name='road' />
                      <Input style={{color:'white',fontSize:18,marginLeft:5}} 
                             keyboardType='number-pad'  
                             onChangeText={(dist)=>{this.setState({inputData:{ distance:dist }})}} 
                             placeholderTextColor="white"  
                             placeholder='Mesafe'/>
                    </Item>
                    <Button full style={{backgroundColor:'#FFF'}} onPress={() => this.Query()}>
                      <Text style={{color:'#e85f5f', fontSize:18, fontWeight:'bold'}}>Sorgula</Text>
                    </Button>
                  </Form>
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
                              <Row><Text style={{marginBottom:5, fontSize:18, fontWeight:'bold'}}>Yolculuk Edilen Gün</Text></Row>
                              <Row><Text style={{marginBottom:5, fontSize:18}}>{ParseDate(new Date(p.puDatetime))}</Text></Row>
                              <Row><Text style={{marginBottom:5, fontSize:18, fontWeight:'bold'}}>Yolculuk Mesafesi </Text></Row>
                              <Row><Text style={{marginBottom:5, fontSize:18}}>{p.trip_distance} Mil</Text></Row>
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
}};

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