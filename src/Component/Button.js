import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[StyleSheet.Button,{backgroundColor: this.props.bgColor}]}
                onPress= {this.props.onPress}
            >
                <Text style = {[{color: this.props.textColor}, styles.textStyle]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    witdh: PropTypes.string
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 6,
        marginVertical: 6,
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
    }
});