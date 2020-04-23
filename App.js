import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {enableScreens} from "react-native-screens"
import {createStore, combineReducers, applyMiddleware}  from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

import machineReducer from "./store-redux/places-reducer"

import DireNavigator from "./navigation/DireNavigator"
enableScreens()

//Meging all reducers to gether
const rootReducer = combineReducers({
  machines: machineReducer
}) 
//createing store and applying Reduxthunk so thunk package is attached to redux
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

//planing to load fonts later 

export default function App() {
// wraping with provided since every screen should have acess to store
  return (
    <Provider store={store}>
    <DireNavigator />
    </Provider>
  )}

