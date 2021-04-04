import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Dimensions  from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export const Typetwo = () =>{
    return (
        <Container style={styles.container}>
            <View  style={styles.body}>   
                
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Card>
                        <CardItem header style={{backgroundColor:'#e85f5f'}}>
                            <Text style={{fontSize:25, color:'white', fontWeight:'bold'}}>Sorgular : Tip 2</Text>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.scrollView}>
                    
                    <Card>
                        <CardItem header>
                            <Text style={styles.hText}>1.Madde</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <TextInput placeholder="deneme" />
                            <Text style={styles.text}>İki tarih arasında belirli bir lokasyondan hareket eden araç sayısı</Text>
                            </Body>
                        </CardItem>
                    </Card>
                
                    <Card>
                        <CardItem header>
                        <Text style={styles.hText}>2.Madde</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.text}>Günlük seyahat başına düşen ortalama alınan ücretlere göre; en az ücret alınan iki
                                tarih arasındaki günlük alınan ortalama ücretler</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header>
                        <Text style={styles.hText}>3.Madde</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.text}>İki tarih arasında seyahat edilen en az mesafeli 5 yolculuk</Text>
                            </Body>
                        </CardItem>
                    </Card>

                </ScrollView>

            </View>
        </Container>
    );
};

const styles = new StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#deded5'
    },
    body:{ 
        flex:1,
        top:Constants.statusBarHeight,  
        padding:10, 
        paddingBottom:30,
    },
    header:{
        marginBottom:10,
    },
    scrollView:{ 
        flex:1,
        marginBottom:10,
    },
    hText:{
        fontSize:25,
        color:'#1c1c1b'
    },
    text:{
        fontSize:22,
        color:'#1c1c1b'
    },
});