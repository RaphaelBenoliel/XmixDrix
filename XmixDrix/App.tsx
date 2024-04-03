import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import XmixDrixScreen from './xmixdrix';

export default function App() {
  return (
    <ImageBackground source={require('./assets/background_image.png')} style={styles.background}>
    {/* <View style={styles.container}> */}
      
      <XmixDrixScreen/>
      <StatusBar style="auto" />
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
