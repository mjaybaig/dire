import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as tf from "@tensorflow/tfjs";

import Colors from '../constants/Color'

class CameraScreen extends React.Component{
  constructor(props){

    super(props)

    this.state = {
      isTfReady: false,
      pickedImage: null
    }

  }
  async componentDidMount(){

    tf.ready().then(
      val => {
        this.setState({
          isTfReady: true
        })
        console.log(this.state);
      }, reject => {
        console.log(reject)
      }
      )
    }
    
    //if user did/cancel give permision he wont be asked again
  verifyPermissions = async () => {
      //waits for the user to accent or decline askAsync
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  takeImageHandler = async () => {
    const hasPermission = await this.verifyPermissions();
    if (!hasPermission) {
      return;
    }
    //ASync operation which retains a promise wait untill user is done /cancel
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    console.log(image)
    this.setState({
      pickedImage: image.uri
    })
    //props.onImageTaken(image.uri);
  }

  render(){
    return (
      <View style={this.styles.imagePicker}>
      <View style={this.styles.imagePreview}>
        {!this.state.pickedImage ? (
          <Text>No image picked yet.</Text>
          ) : (
            <Image style={this.styles.image} source={{ uri: this.state.pickedImage }} />
            )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={this.takeImageHandler}
        />
    </View>
  );
}
styles = StyleSheet.create({
    imagePicker: {
      alignItems: 'center',
      marginBottom: 15
    },
    imagePreview: {
      width: '100%',
      height: 400,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1
    },
    image: {
      width: '100%',
      height: '100%'
    }
  });
}
export default CameraScreen;
