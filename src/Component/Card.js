import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends Component {
    render() {
        return (
            <TouchableOpacity
                style= {[styles.card, this.props.style, styles.ortala]}
                onPress={this.props.OnPress}
            >

                <Text style={styles.cardNameText}>{this.props.cardName}</Text>
                <Text style={styles.text}>{this.props.text}</Text>

            </TouchableOpacity>
        );
    }
}

Card.propTypes = {
    cardName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    card: {
        height: 120,
        marginHorizontal: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(70,70,70,0.4)'
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
    },
    ortala: {
        textAlign: 'center',
        alignItems: 'center',
    }
});