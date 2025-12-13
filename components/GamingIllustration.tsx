import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function GamingIllustration() {
  return (
    <View style={styles.container}>
      {/* Game controller base */}
      <View style={styles.controllerBase}>
        {/* Left joystick area */}
        <View style={styles.joystickOuter}>
          <View style={styles.joystickInner} />
        </View>
        
        {/* D-pad */}
        <View style={styles.dpadContainer}>
          <View style={styles.dpadHorizontal} />
          <View style={styles.dpadVertical} />
        </View>
        
        {/* Screen/display area */}
        <View style={styles.screen} />
        
        {/* Right buttons */}
        <View style={styles.buttonsContainer}>
          <View style={[styles.button, styles.buttonMargin]} />
          <View style={[styles.button, styles.buttonMargin]} />
          <View style={styles.button} />
        </View>
      </View>
      
      {/* Decorative elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 280,
    position: 'relative',
  },
  controllerBase: {
    width: 200,
    height: 100,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 20,
    position: 'relative',
    opacity: 0.8,
  },
  joystickOuter: {
    position: 'absolute',
    left: 20,
    top: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  dpadContainer: {
    position: 'absolute',
    left: 80,
    top: 35,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadHorizontal: {
    position: 'absolute',
    width: 20,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  dpadVertical: {
    position: 'absolute',
    width: 8,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  screen: {
    position: 'absolute',
    left: 110,
    top: 20,
    width: 60,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    opacity: 0.3,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    flexDirection: 'row',
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
  },
  buttonMargin: {
    marginRight: 8,
  },
  decorativeCircle1: {
    position: 'absolute',
    left: 30,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.6,
  },
  decorativeCircle2: {
    position: 'absolute',
    right: 30,
    top: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.SECONDARY,
    opacity: 0.6,
  },
  decorativeCircle3: {
    position: 'absolute',
    right: 0,
    bottom: 40,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.5,
  },
});

