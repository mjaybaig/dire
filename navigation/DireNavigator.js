import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import {Platform } from 'react-native';

import MainScreen from "../Screens/MainScreen"
import MachineListScreen from "../Screens/MachineListScreen"
import MachineDetailScreen from "../Screens/MachineDetailScreen"

import Colors from "../constants/Color"


const DireNavigator = createStackNavigator({
    FirstScreen : MainScreen,
    MachineList: MachineListScreen,
    MachineDetail : MachineDetailScreen
},{
    defaultNavigationOptions: {
        headerStyle:{
          backgroundColor: Platform.OS === "android" ?Colors.primaryColor: ""
        },
        headerTintColor:Platform.OS == "android" ? "white" : Colors.primaryColor
      }
})

export default createAppContainer(DireNavigator)