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
import Choice from '../Component/Choice';
import Btn from '../Component/Button';

export default class ExercisePage extends Component {

    state = {
        kelimeler: [],
        randomNumbers: {},
        kelime: '',
        secenek: [],
        stepcount: 1,
        vocableCount: 0,

        fadeAnim:  new Animated.Value(0),

        options0: "#DFDFDF",
        options1: "#DFDFDF",
        options2: "#DFDFDF",
        options3: "#DFDFDF",
        options4: "#DFDFDF",

        optionsText1: "A",
        optionsText2: "A",
        optionsText3: "A",
        optionsText4: "A",
        optionsText5: "A",

        vocableText: "Kelimed",
        vocableIndex: 0,


        userpoint:0,
    }

    fadeIn = () => {
        Animated.timing(this.state.fadeAnim, {toValue: 1, duration: 1500}).start();
    }

    componentDidMount = () => {
        this.start();
    }

    start = () => {
        var randomnum;
        var randomvoc;
        var randomnumArry=[];
        var check = true;
        var check1 = true;
        var count = 0;
        this.fadeIn();

        this.setState({optionsText1:"A"});
        this.setState({optionsText2:"A"});
        this.setState({optionsText3:"A"});
        this.setState({optionsText4:"A"});
        this.setState({optionsText5:"A"});

        randomvoc = Math.floor(Math.random() * 5);
        this.setState({vocableIndex: randomvoc});
        firebase.auth().onAuthStateChanged(auth => {
            if (auth) {
                firebase.database().ref(`/users/${auth.uid}`).on('value', snaps => {
                     this.setState({userpoint: snaps.val().point});
                     this.setState({vocableCount: snaps.val().vocableCount}); 
                    while(check1){
                        for (var i = 0; i < 5; i++) {
                            randomnum = Math.floor(Math.random() * this.state.vocableCount);
                            for (var j = 0; j < i; j++) {
                                if (randomnumArry[j] == randomnum) {
                                    check = false;
                                    i--;
                                    break;
                                }
                            }
                            if (check) {
                                randomnumArry.push(randomnum);
                            }
                            check=true;
                        }
                        if(randomnumArry.length == 5){
                            this.setState({randomNumbers: randomnumArry});
                            check1=false;
                        }
                    }
                    firebase.database().ref(`/users/${auth.uid}/kelimeler`).on('value', snaps => {
                        snaps.forEach((element) => {
                            if(count == randomnumArry[0] || count == randomnumArry[1] ||count == randomnumArry[2] ||count == randomnumArry[3] ||count == randomnumArry[4]){
                                if(this.state.optionsText1 == "A"){
                                    this.setState({optionsText1: element.val().meaning});
                                    if(randomvoc == 0){
                                        this.setState({vocableText: element.val().vocable});
                                    }
                                }
                                else if(this.state.optionsText2 == "A"){
                                    this.setState({optionsText2: element.val().meaning});
                                    if(randomvoc == 1){
                                        this.setState({vocableText: element.val().vocable});
                                    }
                                }
                                else if(this.state.optionsText3 == "A"){
                                    this.setState({optionsText3: element.val().meaning});
                                    if(randomvoc == 2){
                                        this.setState({vocableText: element.val().vocable});
                                    }
                                }
                                else if(this.state.optionsText4 == "A"){
                                    this.setState({optionsText4: element.val().meaning});
                                    if(randomvoc == 3){
                                        this.setState({vocableText: element.val().vocable});
                                    }
                                }
                                else if(this.state.optionsText5 == "A"){
                                    this.setState({optionsText5: element.val().meaning});
                                    if(randomvoc == 4){
                                        this.setState({vocableText: element.val().vocable});
                                    }
                                    
                                }
                            }
                            count++;
                        });
                    })
                });
            }
        });
    }

    trueOptions = () => {
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                this.setState({userpoint: this.state.userpoint+10});
                firebase.database().ref(`/users/${auth.uid}`).update({point: this.state.userpoint});
            }
        });
    }

    falseOptions = () => {
        firebase.auth().onAuthStateChanged(auth => {
            if(auth){
                this.setState({userpoint: this.state.userpoint-20});
                firebase.database().ref(`/users/${auth.uid}`).update({point: this.state.userpoint});
            }
        });
    }

    passButton = () => {
        if (this.state.stepcount == 5) {
            this.setState({ stepcount: 1 });
            this.props.navigation.goBack();
        }
        else {
            this.setState({ stepcount: this.state.stepcount + 1 });
            this.setState({options0: "#DFDFDF"});
            this.setState({options1: "#DFDFDF"});
            this.setState({options2: "#DFDFDF"});
            this.setState({options3: "#DFDFDF"});
            this.setState({options4: "#DFDFDF"});
        }
        this.start();
    }

    optionsButton = (index) => {
        if(this.state.vocableIndex == index){
            if(index == 0){
                this.setState({options0: "#0CBE3B"});
            }
            else if(index == 1){
                this.setState({options1: "#0CBE3B"});
            }
            else if(index == 2){
                this.setState({options2: "#0CBE3B"});
            }
            else if(index == 3){
                this.setState({options3: "#0CBE3B"});
            }
            else if(index == 4){
                this.setState({options4: "#0CBE3B"});
            }
            this.trueOptions();
            this.passButton();
        }
        else {
            if(index == 0){
                this.setState({options0: "#E20909"});
            }
            else if(index == 1){
                this.setState({options1: "#E20909"});
            }
            else if(index == 2){
                this.setState({options2: "#E20909"});
            }
            else if(index == 3){
                this.setState({options3: "#E20909"});
            }
            else if(index == 4){
                this.setState({options4: "#E20909"});
            }
            this.falseOptions();
        }
    }

    render() {
            return (
                <View style={styles.container}>
                    <View style={styles.TopMenuContainer}>
                        <TopMenu onPress={() => this.props.navigation.push('ProfilePage')} />
                    </View>
    
                    <Animated.View style={[styles.cardContainer, {opacity: this.state.fadeAnim}]}>
                        <View style={styles.stepCountContainer}>
                                <Text style={styles.stepCountText}>{this.state.stepcount}/5</Text>
                        </View>
                        <View style={styles.vocableContainer}>
                            <Text style={styles.vocableText}>{this.state.vocableText}</Text>
                        </View>
                        <View style={styles.meaningContainer}>
                            <TouchableOpacity style= {styles.row}
                                onPress = {() => this.optionsButton(0)}
                            >
                                <View style={[styles.meaningCircle,{borderColor: this.state.options0}]}></View>
                                <Text style={styles.meaningText}>{this.state.optionsText1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.row}
                                onPress = {() => this.optionsButton(1)}
                            >
                                <View style={[styles.meaningCircle,{borderColor: this.state.options1}]}></View>
                                <Text style={styles.meaningText}>{this.state.optionsText2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.row}
                                onPress = {() => this.optionsButton(2)}
                            >
                                <View style={[styles.meaningCircle,{borderColor: this.state.options2}]}></View>
                                <Text style={styles.meaningText}>{this.state.optionsText3}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.row}
                                onPress = {() => this.optionsButton(3)}
                            >
                                <View style={[styles.meaningCircle,{borderColor: this.state.options3}]}></View>
                                <Text style={styles.meaningText}>{this.state.optionsText4}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.row}
                                onPress = {() => this.optionsButton(4)}
                            >
                                <View style={[styles.meaningCircle,{borderColor: this.state.options4}]}></View>
                                <Text style={styles.meaningText}>{this.state.optionsText5}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
    
                    <View style={styles.BtnContainer}>
                        <Btn
                            text="PASS"
                            onPress={() => this.passButton()}
                        />
                    </View>
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
    ExerciseContainer: {
        flex: 11,
        textAlign: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: "bold"
    },
    BtnContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    TextContainer: {
        paddingVertical: 25,
    },
    stepCountContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    stepCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    cardContainer: {
        flex: 1,
        height: 200,
        textAlign: 'center',
        justifyContent: 'center',

        backgroundColor: '#147865',

        marginHorizontal: 40,
        marginBottom: 120,

        borderRadius: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    vocableContainer: {
        marginBottom: 20,
    },
    vocableText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#ffffff'
    },
    meaningCircle: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',

        borderColor: '#DFDFDF',
        borderWidth: 5,
        marginRight: 5,
    },
    row: {
        flexDirection:'row',
        marginVertical: 7,
    },
    meaningContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    meaningText: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
    }
});