{/*else {
    <View style= {styles.container}>
        <View style={styles.TopMenuContainer}>
            <TopMenu onPress={() => this.props.navigation.push('ProfilePage')} />
        </View>

        <Animated.View style={[styles.cardContainer, {opacity: this.state.fadeAnim}]}>

            <Text>
                Alıştırma yapabilmeniz için sepetinizde minimum 5 adet kelime olmalıdır.
            </Text>
            
            <View style = {styles.mt15}>
                <Btn
                    text= "Sepet"
                    onPress={() => this._goToHamper()}
                />
            </View>

            <View style = {styles.mt15}>
                <Btn
                    text= "Geri"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>

        </Animated.View>



    </View>
}*/}

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
} from 'react-native';

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import TopMenu from '../Component/TopMenu';
import Btn from '../Component/Button';

export default class ExercisePage extends Component {

    state = {
        vocableCount: 0,

        fadeAnim:  new Animated.Value(0),
    }

    fadeIn = () => {
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 1500}).start();
    }

    componentDidMount = () => {
        this.fadeIn();
        firebase.auth().onAuthStateChanged(auth => {
            if (auth) {
                firebase.database().ref(`/users/${auth.uid}`).on('value', snaps => {
                     this.setState({vocableCount: snaps.val().vocableCount}); 
                });
            }
        });
    }

    _goToAddVocable = () => {
        this.props.navigation.push('AddVocablePage');
    };

    render() {
        return (
            <View style= {styles.container}>
                <View style={styles.TopMenuContainer}>
                    <TopMenu onPress={() => this.props.navigation.push('ProfilePage')} />
                </View>
        
                <Animated.View style={[{opacity: this.state.fadeAnim},styles.animationContainer]}>
        
                    <Text>
                        Alıştırma yapabilmeniz için sepetinizde minimum 5 adet kelime olmalıdır.
                    </Text>
                    
                    <View style = {styles.mt15}>
                        <Btn
                            text= "Kelime Ekle"
                            onPress={() => this._goToAddVocable()}
                        />
                    </View>
        
                    <View style = {styles.mt15}>
                        <Btn
                            text= "Geri"
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
        
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TopMenuContainer: {
        flex: 1,
    },
    mt15: {
        marginTop: 15,
    },
    animationContainer: {
        flex: 11,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    }
});