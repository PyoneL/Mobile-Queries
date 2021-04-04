import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BottomTabBar from './src/components/bottomTabBar';

const Tabs = createMaterialBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
          <BottomTabBar/>
          <StatusBar style="dark" />
        </NavigationContainer>
    );
};
export default App;