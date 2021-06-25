import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'epxo-barcode-scanner'

export default class TransactionScreen extends React.Component {
    constructor(){
      super()
      this.state = {
        buttonStatus:"normal",
        hasCameraPermission:null,
        scanned:false,
        scanData:""
      }
    } 
    getCameraPermissions=async()=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
        buttonStatus:"clicked",
        hasCameraPermission: status === "granted",
        scanned:false,

      })
    }
    handleBarCodeScanned=async({type,data})=>{
      this.setState({
        scanned:true,
        scanData:data,
        buttonStatus:"normal"
      })
    }
    render() {
      const buttonStatus=this.state.buttonStatus
      const hasCameraPermission=this.state.hasCameraPermission
      const scanned=this.state.scanned
      if (buttonStatus==="clicked" && hasCameraPermission){
        return(
          <BarCodeScanner 
              onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
          />
        )
      }
      else if (buttonStatus==="normal"){
        return (
          <View style={styles.container}>
            <Text style = {styles.displayText}>{hasCameraPermission===true?this.state.scanData:"request for camera permission"}</Text>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.buttonText}>scan QR code</Text>
              
            </TouchableOpacity>
          </View>
        );
      }
      
    }
  }
  
  
  
  const styles = StyleSheet.create({ 
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    }, 
    displayText:{ 
      fontSize: 15, 
     textDecorationLine: 'underline' 
    }, 
    scanButton:{ 
       backgroundColor: '#2196F3', 
        padding: 10, 
        margin: 10 
    }, 
    buttonText:{ 
        fontSize: 20, 
    } 
  });