import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextinputField from '../components/TextinputField';
import Checkbox from '../components/CheckBox';
import { useState } from 'react';

const AdminScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <ScrollViewContainer>
        <Header title="Admin Panel" fontSize={35} />
        <View style={styles.statsCard}>
          <View style={styles.serverHeaderRow}>
            <Button
              title="Show Hospital"
              onPress={() => navigation.navigate('', {})}
              fontSize={16}
              style={{ flex: 1 }} // ✅ equal space
            />
            <Button
              title="Add Hospital"
              onPress={() => navigation.navigate('', {})}
              style={{ flex: 1 }} // ✅ equal space
            />
          </View>
        </View>
        <View style={styles.statsCard}>
          <TextinputField placeholder="Enter Name" />
          <View style={styles.serverHeaderRow}>
            <Button title="Save" onPress={() => navigation.navigate('', {})} />
            <Button
              title="cancle"
              onPress={() => navigation.navigate('', {})}
            />
          </View>
        </View>
        <View style={styles.statsCard}>
          <View style={styles.serverHeaderRow}>
            <Header title="Hold data" fontSize={15} />
            <Checkbox value={isChecked} onChange={setIsChecked} />
            <Button title="Save" onPress={() => navigation.navigate('', {})} />
          </View>
        </View>

        <Button title="History" onPress={() => navigation.navigate('', {})} />
      </ScrollViewContainer>
    </>
  );
};
const styles = StyleSheet.create({
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0a0b0eff',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  serverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // ✅ button bahar nahi jayega
    gap: 10, // ✅ buttons ke beech space
  },
});
export default AdminScreen;
