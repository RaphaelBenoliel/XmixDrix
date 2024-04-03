import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  ImageBackground } from 'react-native';
import XmixDrixScreen from './xmixdrix';

export default function App() {
  return (
    <ImageBackground source={require('./assets/background_image.png')} style={styles.background}>
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
});
