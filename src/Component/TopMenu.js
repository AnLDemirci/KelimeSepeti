import React, {Component} from 'react';
import {StyleSheet, View,Image, TouchableOpacity} from 'react-native';

export default class TopMenu extends Component {


    _ClickUpperBar = () => {
        console.log("Tıklandı");
        this.props.navigation.push('ProfilePage');
    };

    render() {
        return(
            <TouchableOpacity 
                style={styles.container} 
                onPress={this.props.onPress}
            >
                <Image 
                source={require("../assets/ProfileImg.jpg")}
                resizeMode="cover"
                style={styles.ProfileImage}
                duration={500}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#AC0B0B',
    },
    ProfileImage: {
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: '#3A3535',
        borderWidth: 2,
    }
});