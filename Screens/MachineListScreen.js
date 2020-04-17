import React,{useState} from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform} from "react-native";
//import{ Searchbar} from 'react-native-elements'

import{MACHINECATEGORY} from "../data/machineDetail"
import MachineGrid from "../components/MachineGrid"
import { SearchBar } from "react-native-paper";


const MachineListScreen = props =>{
    // const [query,setQuery] = useState("")
    // const[searchTerm, setSearchResult] = useState([])

    // React.useEffect(() => {
    //     const newEntry = MACHINECATEGORY.title.filter(m => 
    //         m.toLowerCase().includes(searchTerm))
    //         setSearchResult(newEntry)
    // })

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
    <FlatList 
    // ListHeaderComponent = {<SearchBar placeholder = "Search.."
    // onChangeText = {setQuery}
    // value = {query}/>
    // }
    style = {styles.back}
   // keyExtractor={(item, index) => item.id} 
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
