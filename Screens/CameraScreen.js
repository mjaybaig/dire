import React from "react";
import { View,Button,Alert} from "react-native";


const CameraScreen = props =>{
    return(
    <View>
    <Button title="Capture" onPress = {() => {
        Alert.alert("Image is being processed!!!!")
    }}/>
    </View>
    )
}
export default CameraScreen;
