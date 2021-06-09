import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import TopMenu from '../Component/TopMenu';
import InputText from '../Component/InputText';
import Btn from '../Component/Button';

export default class ExercisePage2 extends Component{
    render() {
        return(
            <View style={styles.container}>
                <View style= {styles.TopMenuContainer}>
                    <TopMenu onPress={() => this.props.navigation.push('ProfilePage')}/>
                </View>
                <View style= {styles.ExerciseContainer}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.text}>Deneme</Text>
                    </View>
                    <View>
                       <InputText
                            text="Kelimenin Anlamı"
                       />
                    </View>
                    <View style={styles.BtnContainer}>
                        <Btn
                            text="PASS"
                        />
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    TopMenuContainer:{
        flex: 1,
    },
    ExerciseContainer:{
        flex: 11,
        textAlign: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 22,
        fontWeight: "bold"
    },
    BtnContainer:{
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    TextContainer:{
        paddingVertical: 25,
    }
});