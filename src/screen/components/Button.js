import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ title, onPress, style, fontSize }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, fontSize && { fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10, // ✅ 'margine' typo fix
    backgroundColor: '#2D3E50',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 120,
    alignItems: 'center', // ✅ text center
  },
  buttonText: {
    color: 'white',
    textAlign: 'center', // ✅ text center
    fontSize: 14, // ✅ default font size
  },
});

export default Button;
