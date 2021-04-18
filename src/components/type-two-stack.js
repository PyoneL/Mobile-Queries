import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuTwo from '../page/page-two/menu';
import QueryTwoOne from '../page/page-two/query-one';
import QueryTwoTwo from '../page/page-two/query-two';
import QueryTwoThree from '../page/page-two/query-three';

const TypeTwo = createStackNavigator();

const TypeTwoStack = () =>{
    return(
        <TypeTwo.Navigator initialRouteName="MenuTwo">
            <TypeTwo.Screen 
                options={{headerShown:false, title: "Sorgular : Tip 2"}} 
                name="MenuTwo" 
                component={MenuTwo} />
            <TypeTwo.Screen 
                options={{headerShown:true, title: "Madde 1",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="QueryTwoOne" 
                component={QueryTwoOne} />
            <TypeTwo.Screen 
                options={{headerShown:true, title: "Madde 2",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="QueryTwoTwo" 
                component={QueryTwoTwo} />
            <TypeTwo.Screen 
                options={{headerShown:true, title: "Madde 3",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="QueryTwoThree" 
                component={QueryTwoThree} />    
        </TypeTwo.Navigator>
    );
};
export default TypeTwoStack;