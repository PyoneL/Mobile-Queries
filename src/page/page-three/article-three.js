import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { getTypeThreeArticleThree } from "../../services/fetch-services";
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
    getTypeThreeArticleThree()
      .then((x) => {
        this.setState({ Data: x.data[0] });
        this.setState({ Success: x.success });
        this.setState({ Message: x.message });
      }).finally(() => {
        if(this.state.Data !== null){
          console.log(this.state.Data.longest_trip)
        }
      });
  };
  getData(){
    /*
    longest_trip:
doLocationID: 264
puLocationID: 209
trip_distance: 20.7
*/
    return (<View>
          <Card>
          <CardItem header>
            <Text style={{fontSize:18, fontWeight:'bold'}}>En Uzun</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Grid>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>doLocationID</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{this.state.Data.longest_trip.doLocationID}</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>puLocationID</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{this.state.Data.longest_trip.puLocationID}</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>trip_distance </Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{this.state.Data.longest_trip.trip_distance}</Text></Row>
              </Grid>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header>
            <Text style={{fontSize:18, fontWeight:'bold'}}>En Kısa</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Grid>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>doLocationID</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{this.state.Data.shortest_trip.doLocationID}</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>puLocationID</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{this.state.Data.shortest_trip.puLocationID}</Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16, fontWeight:'bold'}}>trip_distance </Text></Row>
                  <Row><Text style={{marginBottom:5, fontSize:16}}>{this.state.Data.shortest_trip.trip_distance}</Text></Row>
              </Grid>
            </Body>
          </CardItem>
        </Card>
      
      
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
                    <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>En az 3 yolcunun bulunduğu seyahatlerden en kısa mesafeli ve en uzun mesafeli yolun çizilmesi</Text>
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
    )
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