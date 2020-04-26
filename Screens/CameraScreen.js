import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// const model  = require( "../assets/model/model.json");
// const modelWeights = require('../assets/model/weights.bin');

import Tflite from "tflite-react-native";

import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js"
// import * as tmImage from '@teachablemachine/image';

import * as ImageManipulator from 'expo-image-manipulator';



import Colors from '../constants/Color'
import { decodeJpeg, fetch, asyncStorageIO, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { imag } from '@tensorflow/tfjs';


class CameraScreen extends React.Component{
  constructor(props){
    super(props)
    this.tflite = new Tflite();
    this.state = {
      isTfReady: false,
      pickedImage: null,
      isModelReady: false
    }

  }
  async componentDidMount(){
    // console.log(__dirname)
    // tf.ready().then(
    //   val => {
    //     this.setState({
    //       isTfReady: true
    //     })
    //     console.log(this.state);
    //   }, reject => {
    //     console.log(reject)
    //   }
    // )
    console.log("hello world");

    this.tflite.loadModel({
      model: "model/model_unquant.tflite",
      labels: 'model/labels.txt',
      numThreads: 1
    }, (err, res) => {
      if(err){
        console.log(err)
      }
      else{
        console.log("HELLO")
        this.setState({
          isModelReady: true
        })
        console.log(res);
      }
    })

    // tf.loadLayersModel(bundleResourceIO(model, modelWeights)).then(classifier => {
    //   console.log("Loaded Model");
    //   this.setState({
    //     machineClassifer: classifier,
    //     isModelReady: true
    //   })
    // }, err => {
    //   console.log("Error!")
    //   console.log(err);
    // });
    
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
  
  imagetoTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true
      const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
      // Drop the alpha channel info for mobilenet
      const buffer = new Uint8Array(width * height * 3)
      let offset = 0 // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset]
        buffer[i + 1] = data[offset + 1]
        buffer[i + 2] = data[offset + 2]
        offset += 4
      }
      return tf.tensor4d(buffer, [1, height, width, 3]);

  }

  predictMachine = async () => {
    try{
      const TO_UINT8ARRAY = true
      const response = await fetch(this.state.resizedImage.uri, {}, {isBinary: true});
      const rawImageData = await response.arrayBuffer();
      const tensor = this.imagetoTensor(rawImageData);
      // const tensor = decodeJpeg(jpeg.decode(rawImageData, TO_UINT8ARRAY));
      let predictions = await this.state.machineClassifer.predict(tensor);
      console.log(predictions.dataSync());
      // console.log("PREDICTION: ", this.state.machineClassifer.predict(this.imagetoTensor(rawImageData)).arraySync())
      }
      catch(err){
        console.log(err)
      }
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
      quality: 0.5,
    });
    this.setState({
      pickedImage: {uri: image.uri}
    })
    // console.log(this.state.machineClassifer.predict(image))
    ImageManipulator.manipulateAsync(image.uri, [{resize: {width: 224, height: 224}}], 
      {compress: 0, format: ImageManipulator.SaveFormat.JPEG}).then(resizeImage => {
        // console.log(resizeImage);
        this.tflite.runModelOnImage({
          path: resizeImage.uri
        }, (err, res) => {
          if(err){
            console.log(err)
          }
          else{
            console.log(res)
          }
        })
        // this.setState({resizedImage: resizeImage})
        // this.predictMachine();
      });

    // props.onImageTaken(image.uri);
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
        disabled={!this.state.isModelReady}
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
