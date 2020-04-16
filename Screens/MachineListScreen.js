import React from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform} from "react-native";


import{MACHINECATEGORY} from "../data/machineDetail"
import MachineGrid from "../components/MachineGrid"


const MachineListScreen = props =>{

    const renderGridItem = itemData => {
        return <MachineGrid 
        title = {itemData.item.title}
        color = {itemData.item.color}
        image = {itemData.item.imageUrl}
        onSelect = {() => {
            props.navigation.navigate({
                routeName: "MachineDetail",
                params:{
                    categoryId: itemData.item.id
                }
            })
        }}
        />
    }
    //Flatlist gives us the item property
    // KeyExtractor (unique id maping) is not required for the latest verstion of react
    //using it for my refrence
   return( 
    <FlatList style = {styles.back}
    keyExtractor={(item, index) => item.id}
    data={MACHINECATEGORY}
    renderItem={renderGridItem}
    numColumns={1}
  />
   )
}

const styles = StyleSheet.create({
back:{
    backgroundColor:"white"
}
})
export default MachineListScreen;
