import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";


import TopMenu from '../Component/TopMenu';
import InputText from '../Component/InputText';
import Btn from '../Component/Button';



export default class AddVocablePage extends Component{
    state = {
        vocableCount: 0,
        vocable: '',
        meaning: '',
        //data: {}
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                firebase.database().ref(`/users/${auth.uid}`).on('value', snaps => {
                    if(this.state.vocableCount==0){
                        //.setState({data: snaps.val()});
                        //console.log(this.state.data);
                        this.setState({vocableCount: snaps.val().vocableCount});
                    }         
                });
            }
        });
    }

    addVocable = () => {
        // veri yazma fonksiyonu
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                firebase.database().ref(`/users/${auth.uid}/kelimeler`)
                .push({vocable:this.state.vocable, meaning: this.state.meaning}).then(() => {
                    this.setState({vocable: ''});
                    this.setState({meaning: ''});});
                    this.setState({vocableCount: this.state.vocableCount+1});
                    firebase.database().ref(`/users/${auth.uid}`).update({vocableCount: this.state.vocableCount+1});
            }
        });
        
    }

    render() {
        return(
            <View style= {styles.body}>
                <View style= {styles.TopMenuContainer}>
                    <TopMenu onPress={() => this.props.navigation.push('ProfilePage')}/>
                </View>
                <View style = {styles.container}>
                    <View style = {styles.mt15}>
                        <InputText
                            text = "Eklenecek Kelime"
                            style = {styles.mt15}
                            onChangeText = {text => this.setState({vocable:text})}
                            value={this.state.vocable}
                        />
                    </View>
                    <View style = {styles.mt15}>
                        <InputText
                            text = "Kelimenin Anlamı"
                            style = {styles.mt15}
                            onChangeText = {text => this.setState({meaning:text})}
                            value={this.state.meaning}
                        />
                    </View>
                    <View style = {styles.mt15}>
                        <Btn
                            text= "Ekle"
                            onPress={() => this.addVocable()}
                        />
                    </View>
                    <View style = {styles.mt15}>
                        <Btn
                            text= "Geri"
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1
    },
    container: {
        flex: 2,
        marginTop: 100,
    },
    TopMenuContainer:{
        flex: 1,
    },
    mt15:{
        marginTop: 15,
    }
});