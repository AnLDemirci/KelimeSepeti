import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class FlatCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.word}</Text>
                <View style={styles.cizgi}/>
                <Text style={styles.text}> {this.props.meaning} </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cizgi:{
        height: 15,
        width:3,
        backgroundColor: "#999999",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 5
    },
});