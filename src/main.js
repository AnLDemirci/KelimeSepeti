import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import StartPage from './Pages/StartPage';
import RegisterPage from './Pages/RegisterPage';
import MainPage from './Pages/MainPage';
import AddVocablePage from './Pages/AddVocablePage';
import ExercisePage from './Pages/ExercisePage';
import ExercisePage2 from './Pages/ExercisePage2';
import ExercisePage3 from './Pages/ExercisePage3';
import HamperPage from './Pages/HamperPage';
import ProfilePage from './Pages/ProfilePage';

const Stack = createStackNavigator();


export default class main extends Component {

  
  componentDidMount = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyAe3OX3pGBee15Fuwg3v_aH6GFtQ9RDOMs",
        authDomain: "kelimelik-52398.firebaseapp.com",
        projectId: "kelimelik-52398",
        storageBucket: "kelimelik-52398.appspot.com",
        messagingSenderId: "493359064824",
        appId: "1:493359064824:web:080b3d3702622863b67d0d"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  };
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="StartPage" component={StartPage}/>
          <Stack.Screen name="RegisterPage" component={RegisterPage}/>
          <Stack.Screen name="MainPage" component={MainPage}/>
          <Stack.Screen name="ExercisePage" component={ExercisePage}/>
          <Stack.Screen name="AddVocablePage" component={AddVocablePage}/>
          <Stack.Screen name="ExercisePage2" component={ExercisePage2}/>
          <Stack.Screen name="ExercisePage3" component={ExercisePage3}/>
          <Stack.Screen name="HamperPage" component={HamperPage}/>
          <Stack.Screen name="ProfilePage" component={ProfilePage}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};



