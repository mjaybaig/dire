import React, {Component} from "react";
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator} from "react-native";
import {SearchBar} from "react-native-elements";
import _ from 'lodash'

import MachineGrid from "../components/MachineGrid"
import MACHINECATEGORY from "../data/machineDetail"

export default class MachineListScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:[],
            fullData:[],
            loading: false,
            error: null,
            query:""

        }
    }
     componentDidMount(){
         this.getData()
     }
     getData = _.debounce(() =>{
        this.setState({loading :true})
        const machine = MACHINECATEGORY
        this.setState({
            loading: false,
            data: machine,
            fullData: machine,
            //query:""
        })
     },250 ) 

    renderFooter = () => {
        if(!this.state.loading) return null
        return (
            <View
            style ={{
                paddingVertical :20,
                borderTopWidth:1
            }}>
            <ActivityIndicator animating size = "large"/>
            </View>
        )
    }
    
     renderHeader = () =>{
        const { data,text } = this.state;  
        return <SearchBar placeholder ="Search Here" 
        lightTheme round editable= {true}
        onChangeText = {this.handelSearch}
        value = {data,text}
       />
    }
    handelSearch = (text) => {
        const formatedQuery = text.toLowerCase()
         const data = _.filter(this.state.fullData, photo => {
             if(photo.title.toLowerCase().includes(formatedQuery)){
                 return true
             }
             return false
         })
         this.setState({data,text})
      }
    render(){
    
       
    const renderGridItem = itemData => {
        return <MachineGrid 
        title = {itemData.item.title}
        color = {itemData.item.color}
        image = {itemData.item.imageUrl}
        onSelect = {() => {
            this.props.navigation.navigate({
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
   return (  
    <FlatList 
    ListHeaderComponent = {this.renderHeader}
    style = {styles.back}
   // keyExtractor={(item, index) => item.id} 
    data={this.state.data}
    renderItem={renderGridItem}
    numColumns={1}
    ListFooterComponent={this.renderFooter}
  />
) 
}}

const styles = StyleSheet.create({
back:{
    backgroundColor:"white"
}
})
