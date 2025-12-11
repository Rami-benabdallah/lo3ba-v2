import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface RoomQRCodeProps {
  value: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
});

export default function RoomQRCode({ value }: RoomQRCodeProps) {
  return (
    <View style={styles.container}>
      <QRCode
        value={value}
        size={200}
        color="#000000"
        backgroundColor="#FFFFFF"
      />
    </View>
  );
}
