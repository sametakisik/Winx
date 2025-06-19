import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const TextButton2 = ({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  textColor = '#007AFF',
  disabledColor = '#999999'
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[
          styles.text,
          { color: disabled ? disabledColor : textColor }
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TextButton2;