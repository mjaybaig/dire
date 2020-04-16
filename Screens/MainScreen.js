import React from "react";
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity,Platform} from "react-native";


const MainScreen = props =>{
    return(
    <View>
    <Button title="Next" onPress = {() => {
        props.navigation.navigate({routeName: "MachineList"})
    }}/>
    </View>
    )
}
export default MainScreen;
