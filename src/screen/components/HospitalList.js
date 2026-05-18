import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HospitalList = ({ data = [], onSelect }) => {
  if (data.length === 0) {
    return (
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{ color: '#aaa' }}>No hospitals found</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {data.map(item => (
        <TouchableOpacity
          key={item.hospital_id.toString()}
          style={styles.card}
          onPress={() => onSelect(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.hospitalName}>{item.name}</Text>
          <Text style={styles.hospital_id}>
            Hospital ID: {item.hospital_id ?? 'N/A'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A365D',
  },
});

export default HospitalList;
