import React, { Component } from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,ImageBackground} from "react-native";

import MenueItem from '../components/menuItem'


export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.screens = ['MachineList', 'Camera', 'Hospitals']
    }
    render(){
    //calling menue item to get format with image to diplay here
    return(
        <View style ={styles.overlayContainer}>
        <View style = {styles.top}>
        <Text style = {styles.header}>D I R E</Text>
        </View>
        <View style={styles.menueContainer}>
            <MenueItem icon = 'tractor'
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "MachineList"
                })
            }}>
            </MenueItem>
            <MenueItem icon='camera'
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "Camera",
                })
            }}/>
            <MenueItem icon='hospital'
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "Hospitals",
                })
            }}/>
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
