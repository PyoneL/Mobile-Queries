import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ArticleMenu from '../page/page-two/article-menu';
import ArticleOne from '../page/page-two/article-one';
import ArticleTwo from '../page/page-two/article-two';
import ArticleThree from '../page/page-two/article-three';

const TypeTwo = createStackNavigator();

const TypeTwoStack = () =>{
    return(
        <TypeTwo.Navigator initialRouteName="ArticleMenu">
        <TypeTwo.Screen 
                options={{headerShown:false, title: "Sorgular : Tip 2"}} 
                name="ArticleMenu" 
                component={ArticleMenu} />
            <TypeTwo.Screen 
                options={{headerShown:true, title: "Madde 1",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleOne" 
                component={ArticleOne} />
            <TypeTwo.Screen 
                options={{headerShown:true, title: "Madde 2",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleTwo" 
                component={ArticleTwo} />
            <TypeTwo.Screen 
                options={{headerShown:true, title: "Madde 3",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleThree" 
                component={ArticleThree} />    
        </TypeTwo.Navigator>
    );
};
export default TypeTwoStack;