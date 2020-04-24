import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js"

import { FileSystem } from "react-native-unimodules";
// import * as fs from "react-native-fs";

import Colors from '../constants/Color'
import { decodeJpeg, fetch } from '@tensorflow/tfjs-react-native';


class CameraScreen extends React.Component{
  constructor(props){

    super(props)

    this.state = {
      isTfReady: false,
      pickedImage: null,
      isModelReady: false
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
    tf.loadLayersModel('../mlmodel/model.json').then(machineClassifer => {
      this.setState({
        machineClassifer: machineClassifer,
        isModelReady: true
      });
      console.log(this.state.machineClassifer);
    }, err => {
      console.log(err);
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
  
  imagetoTensor = rawImageData => {
    const TO_UINT8ARRAY = true
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    console.log(width)
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0 // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]
      offset += 4
    }
    console.log("hello")
    return tf.tensor3d(buffer, [height, width, 3])
  }

  predictMachine = async () => {
    // const image = await fs.readFile(this.state.pickedImage.uri);
    // var rawImageData = jpeg.decode(image)
    // console.log(rawImageData);
    // console.log(image);
    try{
      // const image = await FileSystem.readAsStringAsync(this.state.pickedImage.uri, {encoding: FileSystem.EncodingType.Base64});
      const imageAssetPath = Image.resolveAssetSource(this.state.pickedImage);
      console.log(imageAssetPath);
      const response = await fetch(imageAssetPath.uri, {}, {isBinary: true});
      // console.log(response);
      // const rawImageData = await im.arrayBuffer()
      const rawImageData = await response.arrayBuffer();
      console.log(rawImageData);
      // console.log(image)
      const imageTensor = this.imagetoTensor(rawImageData);
      // console.log(imageTensor);
      console.log(this.state.machineClassifer);
      console.log(this.state.machineClassifer.predict(imageTensor))
    }
    catch(err){
      console.log(err);
    }
      // this.state.machineClassifer.classify(imgTensor).then(predictions => {
      //   console.log(predictions);
      // });
    // await fetch(this.state.pickedImage, {}, {isBinary: true});

  }

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
    this.setState({
      pickedImage: {uri: image.uri}
    })
    this.predictMachine();
    //props.onImageTaken(image.uri);
  }

  render(){
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
