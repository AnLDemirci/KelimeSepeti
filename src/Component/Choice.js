import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Choice extends Component{
    render() {
        return (
            <TouchableOpacity style= {styles.container} onPress={this.props.onPress}>
                <View style = {[styles.circle, {borderColor: this.props.color}]}>

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>`${this.props.text.meaning}`</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

Choice.propTypes = {
    color: PropTypes.string,
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        margin: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    circle: {
        width:20,
        height:20,
        borderColor: '#AAAAAA',
        borderRadius: 50,
        borderWidth: 3,
        paddingRight:5,
    },
    textContainer:{
        paddingLeft: 15,
        textAlign: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 16,
    }
    



});