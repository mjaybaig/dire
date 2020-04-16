import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {enableScreens} from "react-native-screens"

import DireNavigator from "./navigation/DireNavigator"
enableScreens()

//planing to load fonts later 

export default function App() {
  return <DireNavigator />
}

