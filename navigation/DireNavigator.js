import React from "react" 
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform } from "react-native";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import MainScreen from "../Screens/MainScreen"
import MachineListScreen from "../Screens/MachineListScreen"
import MachineDetailScreen from "../Screens/MachineDetailScreen"
import CameraScreen from "../Screens/CameraScreen"
import MapsScreen from "../Screens/MapsScreen"
import SmoothMapsScreen from "../Screens/SmoothMapsScreen"

import Colors from "../constants/Color"

const defaultStackOption = {
  headerStyle:{
    backgroundColor: Platform.OS === "android" ?Colors.primaryColor: ""
  },
  headerTintColor:Platform.OS == "android" ? "white" : Colors.primaryColor
}

//Main Navigator Stack navigation 
const DireNavigator = createStackNavigator({
    FirstScreen : MainScreen,
    MachineList: MachineListScreen,
    MachineDetail : MachineDetailScreen,
    Camera:CameraScreen,
    Maps:MapsScreen,
    SmoothMaps:SmoothMapsScreen

},{
    defaultNavigationOptions: defaultStackOption
})

//Bottom tab navigation when user clicks on list screen
const TabListNavigator = createStackNavigator({
  MachineList: MachineListScreen,
  MachineDetail : MachineDetailScreen,

},{
  defaultNavigationOptions: defaultStackOption
})

//Bottom Tab navigation when user clicks on camera screen
const TabCamNavigator = createStackNavigator({
  Camera:CameraScreen,

},{
  defaultNavigationOptions: defaultStackOption
})
//Buttom Tab bavigation when user clikcs on Maps screen
const TabMapNavigator = createStackNavigator({
  Maps:MapsScreen,
},{
  defaultNavigationOptions: defaultStackOption
})

const TabsScreenConfig = {
  Home: {
    screen: DireNavigator,
    navigationOptions: {
      // tabinfo will diynamically get the collor from tabBarOption using it for my
      // convienece
      tabBarIcon: tabInfo => {return (<Ionicons name="ios-home"size={20}color={tabInfo.tintColor } />);
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Lsit: {
    screen: TabListNavigator,
    navigationOptions: {
      // tabinfo will diynamically get the collor from tabBarOption using it for my
      // convienece
      tabBarIcon: tabInfo => {return (<Ionicons name="ios-list"size={20}color={tabInfo.tintColor } />);
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Camera: {
    screen: TabCamNavigator,
    navigationOptions: {
      tabBarLabel: "Cam",
      tabBarIcon: tabInfo => {
        return (<Ionicons name="ios-camera" size={20}color={tabInfo.tintColor} />);
      },
      tabBarColor: Colors.accentColor
    }
  },
  Maps: {
    screen: TabMapNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (<MaterialCommunityIcons name="map-marker-outline" size={25}color={tabInfo.tintColor} />);
      },
      tabBarColor: Colors.accentColor
    }
  },
  // Temp: {
  //   screen: MachineListScreen,
  //   navigationOptions: {
  //     tabBarIcon: tabInfo => {
  //       return (<MaterialCommunityIcons name="weather-cloudy" size={25}color={tabInfo.tintColor} />);
  //     },
  //     tabBarColor: Colors.accentColor
  //   }
  // },
  // SmoothMaps: {
  //   screen: SmoothMapsScreen,
  //   navigationOptions: {
  //     tabBarIcon: tabInfo => {
  //       return (<MaterialCommunityIcons name="weather-cloudy
  //       " size={25}color={tabInfo.tintColor} />);
  //     },
  //     tabBarColor: Colors.accentColor
  //   }
  // }
}

const DireTabNavigator = Platform.OS == "android"
 ? createMaterialBottomTabNavigator(TabsScreenConfig, {
   activeTintColor: 'white',
   shifting: true,
   //Set colour defualt for alll tabs
  //  barStyle:{
  //    backgroundColor: Colors.primaryColor
  //}
 }) : createBottomTabNavigator(TabsScreenConfig,
  { // customization of how the Tab bar
  tabBarOptions: {
    activeTintColor: Colors.accentColor
  }
});

export default createAppContainer(DireTabNavigator)