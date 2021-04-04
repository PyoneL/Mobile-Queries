import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { Typeone } from './src/page/type-one';
import { Typetwo } from './src/page/type-two';
import { Typethree } from './src/page/type-three';

const Tabs = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Tabs.Navigator  
           activeColor="#ede1e1"
           inactiveColor="#e37d7d"
           barStyle={{ backgroundColor: '#c93030' }}>
            <Tabs.Screen
             name="Tip 1"
             component={Typeone}
             options={{
              tabBarLabel: 'Tip 1',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="android-auto" color={color} size={22} />
              ),
            }}
            /><Tabs.Screen
            name="Tip 2"
            component={Typetwo}
            options={{
             tabBarLabel: 'Tip 2',
             tabBarIcon: ({ color }) => (
               <MaterialCommunityIcons name="android-auto" color={color} size={22} />
             ),
           }}
           /><Tabs.Screen
           name="Tip 3"
           component={Typethree}
           options={{
            tabBarLabel: 'Tip 3',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="android-auto" color={color} size={22} />
            ),
          }}
          />
          </Tabs.Navigator>
          <StatusBar/>
        </NavigationContainer>
    );
  }
}