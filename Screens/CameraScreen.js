import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { Button, Card, IconButton} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Tflite from "tflite-react-native";

import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js"

import * as ImageManipulator from 'expo-image-manipulator';

import Colors from '../constants/Color'
import { decodeJpeg, fetch, asyncStorageIO, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import Color from '../constants/Color';
import { ListItem } from 'react-native-elements';


class CameraScreen extends React.Component{
  constructor(props){
    super(props)
    this.tflite = new Tflite();
    this.state = {
      isTfReady: false,
      pickedImage: null,
      isModelReady: false,
      whichMachineName: null,
      whichMachineId: null
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
      quality: 1,
    }).then(newImage => {
      if(!newImage.cancelled){
        // console.log("NEW IMAGE", newImage)
        this.setState({
          pickedImage: {uri: newImage.uri}
        });
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
                      whichMachineName: res[0].label.substr(2, res[0].label.length - 1),
                      whichMachineId: res[0].label.substr(0, 1)
                    });
                }
              })
            }).catch(err => {
                console.log(err);
              })
            }
          });
    }
    // .catch(e => {
    //   console.log(e)
    // });
  // }
  
  render(){
    console.log("STATE: ", this.state);
    return (
      <View style={this.styles.imagePicker}>
        <View style={this.styles.imagePreview}>
          {!this.state.whichMachineName ? (

            <View style={{alignItems: "center"}}>

              <IconButton
                icon="camera"
                color={Color.hedTint}
                size={100}
                onPress={this.takeImageHandler}
            />
            <Button onPress={this.takeImageHandler} color={Color.hedTint}>Tap to take photo</Button>
            </View>
            ) : (
              <Image style={this.styles.image} source={this.state.pickedImage}></Image>
            )}
        </View>
        {!this.state.whichMachineName ? (
          <Text></Text>
          ):(
            <Card style={this.styles.resultCard}>
            <Card.Title title={this.state.whichMachineName.concat(" detected")} subtitle={"We guess that the picture above is of a".concat(this.state.whichMachineName)} />
            <Card.Content>
              <View>
                <Text>Because this feature is new, we may have guessed wrong. If the image above is blurry or unclear, please take a clear image and try again.</Text>
              </View>
            </Card.Content>
            <Card.Actions style={{justifyContent: "flex-end"}}>
              <Button
                icon="camera"
                style={this.styles.btnStyle}
                mode="outlined"
                color={Colors.hedTint}
                onPress={this.takeImageHandler}
                disabled={!this.state.isModelReady}
                >
                Retake Picture</Button>
              <Button 
                style={this.styles.btnStyle}
                mode="contained"
                color={Color.hedTint}
                // color={Colors.accentColor}
                onPress={() => {
                  this.props.navigation.navigate({
                    routeName: 'MachinePrecautions',
                    params: {
                      categoryId: parseInt(this.state.whichMachineId)
                    }
                  })
                }} 
                >
                  Safety Rules
                </Button>
              </Card.Actions>
            </Card>
          )
        }
        {
          !this.state.pickedImage &&(
            // <Text>Hello</Text>
            <Card style={{width: '90%'}}>
              <ListItem style={this.styles.instructions}  bottomDivider key={1} title="Take a photo with a clear view of the machine"/>
              <ListItem style={this.styles.instructions} bottomDivider key={2} title="Make sure the picture is not blurry"/>
              <ListItem style={this.styles.instructions} bottomDivider key={4} title="Try to have a good lighting"/>
            </Card> 
          // </View>
          )
        }
      </View>

    );
  }

  styles = StyleSheet.create({
      imagePicker: {
        alignItems: 'center',
        marginBottom: 15
      },
      resultCard: {
        width: '100%'
      },
      instructions: {
        fontSize: 9
      },
      imagePreview: {
        width: '100%',
        height: 350,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        padding: 5,
        borderWidth: 1
      },
      btnStyle: {
        marginLeft: 5
      },
      image: {
        width: '100%',
        height: '100%'
      },
      textDisc:{
        padding:10,
        fontWeight:"bold", 
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 6,
        elevation: 3,
        backgroundColor:"#FAE5B6"
      },
      gridItem: {
        flex: 1,
        marginTop:10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight:10,
        height: 200,
      }
  });
}

CameraScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Machine Detector"
  }
}
export default CameraScreen;
