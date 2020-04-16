import React from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform,Image} from "react-native";

import{MACHINECATEGORY} from "../data/machineDetail"


const MachineDetailScreen = props =>{
   
   const catId = props.navigation.getParam("categoryId")

   const selectedCategory = MACHINECATEGORY.find(cat => cat.id == catId)
   return(
<View>
<Image source = {{uri: selectedCategory.imageUrl}} style={styles.image}/>
<Text style = {styles.title}>Description</Text>
<Text> 1
2
3</Text>
<Text style = {styles.title}>Common Injuries</Text>
<Text > 1
2
3
 </Text>

</View>
   )
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
export default MachineDetailScreen;
