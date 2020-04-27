import React, {Component} from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform,Image, ScrollView} from "react-native";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import MACHINECATEGORY from "../data/machineDetail"


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
        <Text>{selectedCategory.desc}</Text>
        <Text style={styles.title}>Common Injuries</Text>
          {selectedCategory.comInjury.map(cat => <Text key={cat}>{cat}</Text>)}
         <Button title="More Info" onPress = {() => {
            this.props.navigation.navigate({routeName: 'MachinePrecautions', params: {categoryId: selectedCategory.id}})
         }}/>
      </View>
      </ScrollView>
   )
   }
}


MachineDetailScreen.navigationOptions = (navigationData) =>{
   const catId = navigationData.navigation.getParam("categoryId");
   const selectedCategory = MACHINECATEGORY.find(cat => cat.id == catId)
   return {
        headerTitle: selectedCategory.title 
      }
}

const styles = StyleSheet.create({
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
      fontSize:22,
      textAlign:'center',
      padding:12
    }
 });


