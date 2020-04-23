import React, { Component } from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,ImageBackground} from "react-native";

import MenueItem from '../components/menuItem'

export default class MainScreen extends Component{
    render(){
    return(
        <View style ={styles.overlayContainer}>
        <View style = {styles.top}>
        <Text style = {styles.header}> H O M E</Text>
        </View>
        <View style={styles.menueContainer}>
            <MenueItem/>
            <MenueItem/>
            <MenueItem/>
            <MenueItem/>
            <MenueItem/>
            <MenueItem/>
        </View>
        </View>
    )
    
}}

const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
        //backgroundColor:'rgba(47,163,218, .4)'
    },
    top:{
        height:"50%",
        alignItems:"center",
        justifyContent:"center",
    },
    header: {
        color: "#F3BA36",
        fontSize: 28,
        borderColor:"#F3BA36",
        borderWidth:2,
        padding:20,
        paddingLeft:40,
        paddingRight:40,
        backgroundColor:'rgba(255,255,255, 0.1)',
    },
    menueContainer:{
        height:"40%",
        flexDirection:'row',
        flexWrap:'wrap',

    }
})
