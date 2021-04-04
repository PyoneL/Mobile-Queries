import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ArticleMenu from '../page/page-one/article-menu';
import ArticleOne from '../page/page-one/article-one';
import ArticleTwo from '../page/page-one/article-two';
import ArticleThree from '../page/page-one/article-three';

const TypeOne = createStackNavigator();

const TypeOneStack = () =>{
    return(
        <TypeOne.Navigator initialRouteName="ArticleMenu">
            <TypeOne.Screen 
                options={{headerShown:false}} 
                name="ArticleMenu" 
                component={ArticleMenu} />
            <TypeOne.Screen 
                options={{headerShown:true, title: "Madde 1", headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}}
                name="ArticleOne" 
                component={ArticleOne} />
            <TypeOne.Screen 
                options={{headerShown:true, title: "Madde 2", headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleTwo" 
                component={ArticleTwo} />
            <TypeOne.Screen 
                options={{headerShown:true, title: "Madde 3", headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleThree" 
                component={ArticleThree} />
        </TypeOne.Navigator>
    );
};
export default TypeOneStack;