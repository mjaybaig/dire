import React,{Component} from 'react'
import {View,Image,StyleSheet, TouchableOpacity, Text} from 'react-native'
import {Icon} from 'react-native-elements'


export default class MenuItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log("NN", this.props.navigation)
        //return custom style imtes to main screen
        return(
            <TouchableOpacity style = {styles.menuItem} onPress={this.props.onSelect}>
            <View>
                {/* <Text>Hello</Text> */}
            <Icon name={this.props.icon} type='material-community' size={60}/>
            {/* <Icon  source = {this.props.itemImage}
            style={styles.image}/> */}
            </View>
            </TouchableOpacity>
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