import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Dimensions  from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

const ArticleMenu = ({navigation}) =>{
    return (
        <Container style={styles.container}>
            <View  style={styles.body}>   
                
                <View style={styles.header}>
                    <Card>
                        <CardItem header style={{backgroundColor:'#e85f5f'}}>
                            <Text style={{fontSize:25, color:'white', fontWeight:'bold'}}>Sorgular : Tip 1</Text>
                        </CardItem>
                    </Card>             
                </View>
                
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity onPress={() => navigation.navigate("ArticleOne")}>
                    <Card>
                        <CardItem header>
                            <Text style={styles.hText}>1.Madde</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.text}>En fazla yolcu taşınan 5 gün ve toplam yolcu sayıları</Text>
                            </Body>
                        </CardItem>
                    </Card>       
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ArticleTwo")}>
                    <Card>
                        <CardItem header>
                        <Text style={styles.hText}>2.Madde</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.text}>Belirli mesafenin altında en çok seyahat yapılan gün ve seyahat uzunluğu</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ArticleThree")}>
                    <Card>
                        <CardItem header>
                        <Text style={styles.hText}>3.Madde</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.text}>En uzun mesafeli 5 yolculuktaki gün ve mesafeleri</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        </Container>
    );
};
export default ArticleMenu;
const styles = new StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
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