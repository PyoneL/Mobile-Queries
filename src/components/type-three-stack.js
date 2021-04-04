import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ArticleMenu from '../page/page-three/article-menu';
import ArticleOne from '../page/page-three/article-one';
import ArticleTwo from '../page/page-three/article-two';
import ArticleThree from '../page/page-three/article-three';

const TypeThree = createStackNavigator();

const TypeThreeStack = () =>{
    return(
        <TypeThree.Navigator initialRouteName="ArticleMenu">
            <TypeThree.Screen 
                options={{headerShown:false, title: "Sorgular : Tip 3"}} 
                name="ArticleMenu" 
                component={ArticleMenu} />
            <TypeThree.Screen 
                options={{headerShown:true, title: "Madde 1",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleOne" 
                component={ArticleOne} />
            <TypeThree.Screen 
                options={{headerShown:true, title: "Madde 2",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleTwo" 
                component={ArticleTwo} />
            <TypeThree.Screen 
                options={{headerShown:true, title: "Madde 3",headerTintColor:'white', headerStyle:{backgroundColor:'#e85f5f'}}} 
                name="ArticleThree" 
                component={ArticleThree} />
        </TypeThree.Navigator>
    );
};
export default TypeThreeStack;