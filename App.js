import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {enableScreens} from "react-native-screens"
import {createStore, combineReducers, applyMiddleware}  from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import * as Permissions from 'expo-permissions';

import machineReducer from "./store-redux/places-reducer"

import {init,insertPlace,fetchPlaces} from "./Database/db"
import DireNavigator from "./navigation/DireNavigator"


export default class App extends Component {
// wraping with provided since every screen should have acess to store
constructor(props){
  super(props);   
  }

componentDidMount(){
  enableScreens()
  init().then(() => {
    console.log("Initialized database")
  }).catch(err => {
    console.log('initializing db failt')
    console.log(err)
  })

   insertPlace().then(() => {
    console.log("Inserted Items into database")
  }).catch(err => {
    console.log('Inserting failed')
    console.log(err)
  })  
  fetchPlaces()
  // loadMachine()
  this.getLocationAsync()
}
getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }
}
//}
// //Meging all reducers to gether
//  rootReducer = combineReducers({
//   machines: machineReducer
// }) 
// //createing store and applying Reduxthunk so thunk package is attached to redux
//  store = createStore(rootReducer, applyMiddleware(ReduxThunk))

// //planing to load fonts later

render(){  
return (
    // <Provider store={store}>
    <DireNavigator />
    // </Provider>
  )}
}

