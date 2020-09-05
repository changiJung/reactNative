import React, {useState} from 'react'
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export const MainBoard = (route, navigation ) => {


    const itemId  = route.params;

    
    return (
        <View>




<Button
        title="Done"
        onPress={() => {
            console.log(route.params);
          // Pass params back to home screen


        }}

/>


<Text>{JSON.stringify(route.route.params.itemId)}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    },
    styleCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },


});

export default MainBoard;