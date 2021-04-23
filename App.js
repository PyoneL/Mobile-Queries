import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BottomTabBar from './src/components/bottomTabBar';
import { View,Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createMaterialBottomTabNavigator();

export default class App extends React .Component {
  constructor(props){
    super(props)
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render(){
    if (!this.state.isReady) {
      return (<View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}></View>);
    }
    else{
      return (
        <NavigationContainer>
          <BottomTabBar/>
          <StatusBar style="dark" />
        </NavigationContainer>
    );
    }    
  }
};