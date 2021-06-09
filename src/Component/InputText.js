import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

export default class InputText extends Component {
    render() {
        
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder= {this.props.text}
                    onChangeText = {this.props.onChangeText}
                    value={this.props.value}
                />
            </View>
        );
    }
}

InputText.propTypes = {
    text: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    textInput: {
        marginHorizontal: 40,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        borderWidth: 1,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 14,
    }
});