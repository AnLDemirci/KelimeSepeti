import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import TopMenu from '../Component/TopMenu';
import Btn from '../Component/Button';


export default class ExercisePage2 extends Component{

    state = {
        kelimeler: [],
    }


    verileriGetir = () => {
        firebase.database().ref(`/users/${auth.uid}/kelimeler`).on('value', snaps => {
            snaps.forEach((element) => {
                data = data+ {vocable: element.vocable, meaning: element.meaning}
            });
            this.setState(kelimeler, data);
        })
    }

    componentDidMount = () => {
        var data = [];
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                firebase.database().ref(`/users/${auth.uid}/kelimeler`).on('value', snaps => {
                    snaps.forEach((element) => {
                        data.push(element.val());
                    });
                    this.setState({kelimeler:data});
                })
            }
        }); 
    }

    render() {
        
        return(
            <View style={styles.container}>
                <View style= {styles.TopMenuContainer}>
                    <TopMenu onPress={() => this.props.navigation.push('ProfilePage')}/>
                </View>
                <View style = {styles.TextContainer}>
                    <Text style={styles.text}>Sepette bulunan toplam kelime miktarı : {this.state.kelimeler.length}</Text>
                </View>
                <View style={styles.FlatListContainer}>
                    <FlatList
                        data={this.state.kelimeler}
                        renderItem={({item}) =>(
                            <TouchableOpacity style={styles.FCcontainer}>
                                <View style={styles.FCTextContainer}>
                                    <Text style={styles.FCtext}>{item.vocable}</Text>
                                </View>
                                <View style={styles.FCcizgi}/>
                                <View style={styles.FCTextContainer}>
                                    <Text style={styles.FCtext}>{item.meaning}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item=>item.uid}
                    />
                </View>
                <View style={styles.BtnContainer}>
                    <Btn
                        text="Geri"
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    FCcontainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    FCcizgi:{
        height: 3,
        width:10,
        backgroundColor: "#999999",
        alignItems: 'center',
        justifyContent: 'center',
    },
    FCtext:{
        flex: 8,
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 22,
        paddingHorizontal: 25,
    },
    TextContainer:{
        flex:3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FlatListContainer:{
        flex: 12,
        paddingHorizontal: 20,
    },
    FCTextContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
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