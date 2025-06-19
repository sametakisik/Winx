// OnayScreen.js
import React from 'react';
import { View, Text } from 'react-native';

function Onay({ route }) {
  const { players, teamName } = route.params || {};

  return (
    <View>
      <Text>Takım Adı: {teamName}</Text>
      <Text>Oyuncular:</Text>
      {players?.map((player, index) => (
        <Text key={index}>{player}</Text>
      ))}
    </View>
  );
}

export default Onay;