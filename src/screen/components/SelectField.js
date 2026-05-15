import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectField = ({ title, options = [], value, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{title}</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setOpen(!open)}
      >
        <Text style={value ? styles.selected : styles.placeholder}>
          {value || `Select ${title}`}
        </Text>
        <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => { onSelect(option); setOpen(false); }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { marginBottom: 15, width: '100%' },
  label: {
    fontSize: 16, fontWeight: 'bold',
    color: '#0D253C', marginBottom: 8, marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FBFD', borderRadius: 30,
    borderWidth: 1, borderColor: '#E1EAF2',
    paddingHorizontal: 15, paddingVertical: 8, height: 60,
  },
  placeholder: { color: '#999', fontWeight: 'bold', fontSize: 16 },
  selected: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  arrow: { color: '#888', fontSize: 12 },
  dropdown: {
    borderWidth: 1, borderColor: '#E1EAF2', borderRadius: 15,
    backgroundColor: '#fff', marginTop: 4, overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 15, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  optionText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
});

export default SelectField;