import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Tflite from "tflite-react-native";

import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js"

import * as ImageManipulator from 'expo-image-manipulator';

import Colors from '../constants/Color'
import { decodeJpeg, fetch, asyncStorageIO, bundleResourceIO } from '@tensorflow/tfjs-react-native';


class CameraScreen extends React.Component{
  constructor(props){
    super(props)
    this.tflite = new Tflite();
    this.state = {
      isTfReady: false,
      pickedImage: null,
      isModelReady: false,
      whichMachine: null
    }

  }
  async componentDidMount(){

    this.tflite.loadModel({
      model: "model/model_unquant.tflite",
      labels: 'model/labels.txt',
      numThreads: 1
    }, (err, res) => {
      if(err){
        console.log(err)
      }
      else{
        this.setState({
          isModelReady: true
        })
        console.log(res);
      }
    })

    
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

    ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    }).then(newImage => {
      this.setState({
        pickedImage: {uri: newImage.uri}
      })

      ImageManipulator.manipulateAsync(newImage.uri, [{rotate: 1}], 
          {compress: 1, format: ImageManipulator.SaveFormat.JPEG}).then(resizeImage => {
            // console.log(resizeImage);
            this.tflite.runModelOnImage({
              path: resizeImage.uri, 
            }, (err, res) => {
              if(err){
                console.log(err)
              }
              else{

                  this.setState({
                    whichMachine: res[0].label
                  });
              }
            })
      }).catch(err => {
        console.log(err);
      })
    });
  }

  render(){
    console.log("STATE: ", this.state);
    return (
      <View style={this.styles.imagePicker}>
      <View style={this.styles.imagePreview}>
        {!this.state.pickedImage ? (
          <Text>No image picked yet.</Text>
          ) : (
            <Image style={this.styles.image} source={{ uri: this.state.pickedImage.uri }} />
            )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={this.takeImageHandler}
        disabled={!this.state.isModelReady}
        />
        {!this.state.whichMachine ? (
          <Text></Text>
        ):(<Text>{this.state.whichMachine}</Text>)}
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
