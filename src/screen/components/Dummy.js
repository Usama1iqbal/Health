import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextinputField from '../components/TextinputField';

const AdminScreen = ({ navigation }) => {
  return (
    <>
      <ScrollViewContainer>
        <Header title="Admin Panel" fontSize={35} />
        <View style={styles.serverHeaderRow}>
          <Button
            title="Show Hospital"
            onPress={() => navigation.navigate('', {})}
            fontSize={20}
            style={{ width: 200 }}
          />
          <Button
            title="Add Hospital"
            onPress={() => navigation.navigate('', {})}
          />
        </View>

        <TextinputField placeholder="Enter Name" />
        <View style={styles.serverHeaderRow}>
          <Button title="Save" onPress={() => navigation.navigate('', {})} />
          <Button title="cancle" onPress={() => navigation.navigate('', {})} />
        </View>
        <View style={styles.serverHeaderRow}>
          <Header title="Hold data" fontSize={15} />
          <Button
            title="Show data"
            onPress={() => navigation.navigate('', {})}
          />
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
});
export default AdminScreen;
