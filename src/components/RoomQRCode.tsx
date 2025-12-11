import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface RoomQRCodeProps {
  value: string;
}

export default function RoomQRCode({ value }: RoomQRCodeProps) {
  return (
    <View className="p-4 bg-white rounded-xl shadow-md items-center">
      <QRCode
        value={value}
        size={200}
        color="#000000"
        backgroundColor="#FFFFFF"
      />
    </View>
  );
}
