import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DashBoardData = ({ name, protocol, status, onPress }) => {
  return (
    <View style={[styles.serverHeaderRow, styles.headerBorder]}>
      {/* 1. Name */}
      <Text style={styles.SmiddleTitle}>{name}</Text>

      {/* 2. Protocol */}
      <Text style={styles.SmiddleTitle}>{protocol}</Text>

      {/* 3. Status (Logic: Agar Active hai to Green, warna Red) */}
      <Text
        style={status === 'Active' ? styles.ActiveTitle : styles.InactiveTitle}
      >
        {status}
      </Text>

      {/* 4. View Button */}
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.SmiddleTitle}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  SmiddleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0D253C',
    flex: 1, // Barabar jagah lene ke liye
  },
  ActiveTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0dba13ff', // Green
    flex: 1,
  },
  InactiveTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#c41c22ff', // Red
    flex: 1,
  },
});

export default DashBoardData;
