import React, {Component} from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform,Image, ScrollView} from "react-native";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import MACHINECATEGORY from "../data/machineDetail"
import { pad } from "@tensorflow/tfjs";
import {Icon} from 'react-native-elements'
import Colors from "../constants/Color"

export default class MachineDetailScreen extends Component {
   render(){
   const catId = this.props.navigation.getParam("categoryId")
   const selectedCategory = MACHINECATEGORY.find(cat => cat.id == catId)
   return(
<ScrollView>
      <View>
        <Image
          source={{ uri: selectedCategory.imageUrl }}
          style={styles.image}
        />
        <Text style={styles.title}>Description</Text>
        <Text style={styles.txtStyles}>{selectedCategory.desc}</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.title}>Common Injuries</Text>
          {selectedCategory.comInjury.map(cat => <Text style={styles.txtStyles} key={cat}>{cat}</Text>)}
      </View>
      </ScrollView>
   )
   }
}


MachineDetailScreen.navigationOptions = (navigationData) =>{
   const catId = navigationData.navigation.getParam("categoryId");
   const selectedCategory = MACHINECATEGORY.find(cat => cat.id == catId)
   
   return {
      headerRight: () => (
         <TouchableOpacity  onPress={() => {
            navigationData.navigation.navigate({routeName: 'MachinePrecautions', 
            params: {categoryId: selectedCategory.id}})
         }}>
            <View style={styles.headerText}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:18,padding:5}} >More</Text><Icon name="arrow-right" type='material-community' color="black"/>
            </View>
           </TouchableOpacity>),
        headerTitle: selectedCategory.title 
      }
}

const styles = StyleSheet.create({
   txtStyles: {
      fontSize: 16
   },
   image:{
      width :'100%',
      height : 200
    },
    details:{
      flexDirection:"row",
      padding: 15,
      justifyContent:"space-around"
    },
    title:{
      fontSize:18,
      textAlign:'center',
      padding:5,
      marginBottom:5,
      fontWeight: "bold",
      marginTop: 5,
      backgroundColor: "#F3BA36"
    },
    headerText:{
      fontSize:18,
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }
 });


