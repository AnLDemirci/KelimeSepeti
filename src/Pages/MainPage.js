import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Button,
    Animated,
} from 'react-native';

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import TopMenu from '../Component/TopMenu';
import Card from '../Component/Card';

export default class MainPage extends Component {
    state = {
        vocableCount: 0,

        fadeAnim:  new Animated.Value(0),
    }

    componentDidMount = () => {
        this.fadeIn();
    }


    _goToExercise = () => {
        if(this.state.vocableCount<5){
            this.props.navigation.push('ExercisePage3');
        }
        else {
            this.props.navigation.push('ExercisePage');
        }
    };
    _goToAddVocable = () => {
        this.props.navigation.push('AddVocablePage');
    };
    _goToHamper = () => {
        this.props.navigation.push('HamperPage');
    };
    _goToProfile = () => {
        this.props.navigation.push('ProfilePage');
    };

    fadeIn = () => {
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 1500}).start();
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                firebase.database().ref(`/users/${auth.uid}`).on('value', snaps => {
                    this.setState({vocableCount: snaps.val().vocableCount});      
                });
                }
        });
    }

    componentDidMount = () => {
        this.fadeIn();
    }


    render() {
        return (
            <View>
                <TopMenu onPress={() => this._goToProfile()}/>
                <Animated.View style={{flex: 1, marginTop: 100, opacity: this.state.fadeAnim}}>
                    <TouchableOpacity 
                        style={[styles.card, styles.ortala]} 
                        onPress={() => this._goToAddVocable()}
                    >
                        <Text style={styles.cardNameText}>Kelime Ekle</Text>
                        <Text style={styles.text}>Sepetimize Kelime Ekleme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.card, styles.ortala]} 
                        onPress= {()=> this._goToExercise()}
                    >
                        <Text style={styles.cardNameText}>Alıştırma</Text>
                        <Text style={styles.text}>Daha Önceki Günlerde Sepetinize Attığınız Kelimeler Rastgele Şekilde Önünüze Gelir.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.card, styles.ortala]} 
                        onPress= {()=> this._goToHamper()}
                    >
                        <Text style={styles.cardNameText}>Sepet</Text>
                        <Text style={styles.text}>Daha Önce Eklediğimiz Kelimeleri Listelendiği Sayfa</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    card: {
        height: 120,
        marginHorizontal: 50,
        marginVertical: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(70,70,70,0.4)',
        flex: 1, 
        zIndex: 1,
        marginTop:40,
    },
    cardNameText: {
        marginTop: 10,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 22,
    },
    text: {
        marginTop: 5,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 12,
        paddingBottom: 20,
    },
    ortala: {
        textAlign: 'center',
        alignItems: 'center',
    }
});