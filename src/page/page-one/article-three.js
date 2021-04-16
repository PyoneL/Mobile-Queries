import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { getTypeOneArticleThree } from "../../services/fetch-services";
import { Col, Row, Grid } from "react-native-easy-grid";


export default class ArticleThree extends React.Component {
  state = {
    Data: Array,
    Success: Boolean,
    Message: String,
  };
  constructor(props) {
    super(props);
    this.setArticleThree();
  }
  setArticleThree = () => {
    getTypeOneArticleThree()
      .then((x) => {
        this.setState({ Data: x.data });
        this.setState({ Success: x.success });
        this.setState({ Message: x.message });
      }).finally(() => {
        if(this.state.Data !== null){
          console.log(this.state.Data)
        }
      });
  };

  getData(){
    return (<View>
      {
        this.state.Data.map((item,key) => (
          <Card key={key}>
          <CardItem header>
            <Text style={{fontSize:18, fontWeight:'bold'}}>{key + 1}. Kayıt</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Grid>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>En uzun yolculuk yapılan tarih</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{item.puDatetime}</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>Toplam mesafe </Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{item.trip_distance}</Text></Row>
              </Grid>
            </Body>
          </CardItem>
        </Card>
           ))
      }
    </View>);
  };
  render() {
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
          <View style={{ flex: 1 }}>
              {this.state.Data !== null && this.state.Success === true && this.getData()}
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
});