import React, { Component, useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Dimensions,
    Alert,
} from 'react-native';
import { StackActions } from '@react-navigation/native';


import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import Btn from '../Component/Button';

const { width, height } = Dimensions.get('window');

export default class RegisterPage extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        againPassword: '',
    }
    kayitOl = () => {
        if (this.state.email != '' && this.state.password != '') {
           if(this.state.password == this.state.againPassword){
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((auth) => {
                    let uid = auth.user.uid;
                    this.createUser(uid)
                    this.props.navigation.push('MainPage');
                }).catch((err) => {
                    Alert.alert(
                        'Hata',
                        err,
                        [{ text: 'Ok' }],
                    );
                })
           }else{
                console.log("Şifreler Uyuşmuyor")
                Alert.alert(
                    'Hata',
                    'Şifreler Uyuşmuyor',
                    [{ text: 'Ok' }],
                );
           }
        } else {
            if (this.state.email == '') {
                console.log("Mail Hatalı")
                Alert.alert(
                    'Hata',
                    'Mail Alanı Boş Olamaz',
                    [{ text: 'Ok' }],
                );
            }
            else {
                Alert.alert(
                    'Hata',
                    'Şifre Alanı Boş Olamaz',
                    [{ text: 'Ok' }],

                );
            }
        }
    }

    createUser = (uid) => {
        firebase.database().ref('users').child(uid).set({
            email: this.state.email,
            uid: uid,
            name: this.state.name,
            password: this.state.password,
            vocableCount: 0,
        }).then(() => {
            this.setState({name: ''},
            { email: ''},
            {password: ''},
            {againPassword: ''});
         })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Kelime</Text>
                    <Text style={styles.text}>Sepeti</Text>
                    <Image source={require('../assets/icon.png')} style={{ width: 100, height: 100 }} />
                    <TextInput
                        placeholder="Adınız"
                        style={styles.inputText}
                        underlineColorAndroid='transparent'
                        onChangeText={name => this.setState({ name: name })}
                        value={this.state.name}
                        keyboardType='email-address'
                        placeholderTextColor='gray'
                    />
                    <TextInput
                        placeholder="Email Adresi"
                        style={styles.inputText}
                        underlineColorAndroid='transparent'
                        onChangeText={email => this.setState({ email: email })}
                        value={this.state.email}
                        keyboardType='email-address'
                        placeholderTextColor='gray'
                    />
                    <TextInput
                        placeholder="Şifre"
                        style={styles.inputText}
                        underlineColorAndroid='transparent'
                        onChangeText={password => this.setState({ password: password })}
                        value={this.state.password}
                        secureTextEntry
                        placeholderTextColor='gray'
                    />
                    <TextInput
                        placeholder="Şifre Ekrarı"
                        style={styles.inputText}
                        underlineColorAndroid='transparent'
                        onChangeText={againPassword => this.setState({ againPassword: againPassword })}
                        value={this.state.againPassword}
                        secureTextEntry
                        placeholderTextColor='gray'
                    />
                    <View style={{ marginTop: 20 }}>
                        <Btn
                            text="Kayıt Ol"
                            textColor="#ffffff"
                            onPress={() => this.kayitOl()}
                        />
                        <Btn
                            text="Geri"
                            textColor="#ffffff"
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AC0B0B',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 60,
        fontWeight: 'bold',
        fontFamily: 'cooper',
        color: '#FFFFFF'
    },
    inputText: {
        marginHorizontal: 20,
        marginTop: 10,
        width: width - 40,
        padding: 12,
        fontSize: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
    },
});

