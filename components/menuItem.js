import React,{Component} from 'react'
import {View,Image,StyleSheet} from 'react-native'

export default class MenuItem extends Component {
    render(){
        //return custom style imtes to main screen
        return(
            <View style = {styles.menuItem}>
            <Image source = {this.props.itemImage}
            style={styles.image}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuItem: {
        width:'33.3333333%',
        height:"50%",
        padding:20,
        backgroundColor:'#F3BA36',
        opacity:0.4,
        borderColor:"white",
        borderWidth:2,
    },
    image:{
        width:'100%',
        height:'100%',
        opacity:0.8,
        //borderColor:"#F3BA36",
        //borderWidth:3
    }
})