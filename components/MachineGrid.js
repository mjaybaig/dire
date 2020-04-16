import React from "react";
import { TouchableOpacity, View, Text, StyleSheet,ImageBackground } from "react-native";

const MachineGrid = props => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
      <View
        style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
      <ImageBackground source = {{uri: props.image}} style = {styles.bgImage}>
        <Text style={styles.title}>{props.title}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 200
  },
  container: {
    flex: 1,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  title: {
    //fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "right",
    fontSize: 15,
    color:"white",
    //color with built in transparency
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical : 5,
    paddingHorizontal:12,
  },
  bgImage:{
    width:"100%",
    height:"100%",
    justifyContent:"flex-end",

}
});

export default MachineGrid;
