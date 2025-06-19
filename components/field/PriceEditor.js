import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { patchField } from '../../utils/FieldApiService';

const PriceEditor = ({fieldId,  price, setPrice}) => {
 
  const [editing, setEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(price);

  const toggleEdit = async () => {
    if (editing) {
      setPrice(tempPrice);
      await patchField(fieldId, {pricePerHour: tempPrice})
    } else {
      setTempPrice(price); // Düzenlemeye hazırlan
    }
    setEditing(!editing);
  };

  return (
    <View style={styles.container}>
      {editing ? (
        <TextInput
          value={tempPrice}
          onChangeText={setTempPrice}
          keyboardType="numeric"
          style={styles.input}
        />
      ) : (
        <Text style={styles.price}>
          {price}₺ <Text style={styles.perHour}>/saat</Text>
        </Text>
      )}

      <IconButton
        icon={editing ? 'check' : 'pencil'}
        onPress={toggleEdit}
        size={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: 'bold' },
  perHour: { fontSize: 14, color: 'gray' },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    width: 80,
    marginRight: 8,
  },
});

export default PriceEditor;
