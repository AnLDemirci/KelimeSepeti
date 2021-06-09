import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image, Animated} from 'react-native';

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import Btn from '../Component/Button';


export default class ProfilePage extends Component {

    state = {
        vocableCount: 0,
        name: "",
        point: 0,
        fadeAnim: new Animated.Value(0),
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                firebase.database().ref(`/users/${auth.uid}`).on('value', snaps => {
                    this.setState({vocableCount: snaps.val().vocableCount});      
                    this.setState({name: snaps.val().name});
                    this.setState({point: snaps.val().point});
                });
                }
        });
        this.fadeIn();
    }

    fadeIn = () => {
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 1500}).start();
    }

    fadeOut = () => {
        Animated.timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 3000
        }).start();
      };

    render() {
        return(
            <Animated.View style={[styles.container,{opacity: this.state.fadeAnim}]}>
                <View style={[styles.Ortala,styles.ProfileImageContainer]}>
                    <Image 
                        source={require("../assets/ProfileImg.jpg")}
                        resizeMode="cover"
                        style={styles.ProfileImage}
                        duration={500}
                    />
                </View>
                <Text style={[styles.TextName,styles.Ortala]}>{this.state.name}</Text>
                <Text style={[styles.Text,styles.Ortala]}>Bilinen Toplam Kelime : {this.state.vocableCount}</Text>
                <Text style={[styles.Text,styles.Ortala]}>Toplam Puan : {this.state.point}</Text>
                <View style={styles.BtnContainer}>
                    <Btn
                        text="Geri"
                        textColor= "#FFFFFF"
                        onPress={() => {this.props.navigation.goBack();this.fadeOut();}}
                    />
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AC0B0B',
    },
    Ortala:{
        alignItems: 'center',
        textAlign: 'center',
    },
    ProfileImageContainer:{
        marginVertical:20,
    },
    ProfileImage:{
        marginTop: 20,
        width: 200,
        height: 200,
        borderRadius: 200,
        borderColor: '#3A3535',
        borderWidth: 2,
    },
    TextName:{
        fontSize: 24,
        color: '#FFFFFF',
        marginTop: 15,
    },
    Text:{
        fontSize: 20,
        color: '#FFFFFF',
        marginTop: 15,
    },
    BtnContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 50,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
});