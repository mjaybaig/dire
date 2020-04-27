import React, { Component } from "react";
import { View, Text, StyleSheet,Keyboard,TouchableWithoutFeedback} from "react-native";
import MapView from 'react-native-maps'
import axios from "axios"
import googleKey from "../env"
//import Geolocation from 'react-native-geolocation-service'
export default class  ShowDirectionScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userLatitude: 0,
            userLongitude: 0
        }
       // this.showDirectionsOnMap = this.showDirectionsOnMap.bind(this)
    }

    componentDidMount(){
        let placeId = this.props.navigation.getParam('placeId');
        //continusoly get positon from user and stoping this dismount happens
        navigator.geolocation.watchPosition(
            pos =>{
                this.setState({
                    userLatitude: pos.coords.latitude,
                    userLongitude: pos.coords.longitude,
                })
                this.showDirectionsOnMap(placeId)
                
            },
            err => console.warn(err),
            {
                enableHighAccuracy: true
            }
            )
        }
        hideKeyboard(){
            Keyboard.dismiss()
        }
        componentWillUnmount(){
            navigator.geolocation.clearWatch(this.locationWtchID)
        }
        async showDirectionsOnMap(placeId){
            try{
                const result = await axios.get(
                    `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.userLatitude},${this.state.userLongitude}&destination=place_id:${placeId}&key=${googleKey.googleApiKey}`
            )
            console.log(result.data)
        }catch(err){
            console.error(err)
        }
    }
    render(){
        // const placeId = this.props.navigation.getParam("placeId") 

    const mapRegion = {
        //points and surface
        latitude: this.state.userLatitude,
        longitude: this.state.userLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    return(
        //when user press screen to close the keyboard
  
       <View style = {styles.container}>
        <MapView showsUserLocation followsUserLocation style={styles.map} region = {mapRegion}/>
        </View>
        )
}}
const styles = StyleSheet.create({
    container:{
     flex:1,
    },
    map:{
        ...StyleSheet.absoluteFillObject
    }
})

