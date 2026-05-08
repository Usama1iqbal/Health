import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextinputField from '../components/TextinputField';
import Container from '../components/Container';
const HistoryScreen = ({ navigation }) => {
  return (
    <>
      <ScrollViewContainer>
        <View style={styles.serverHeaderRow}>
          <Header title="History" fontSize={35} />
          <Button
            title="Send to Engine"
            onPress={() => navigation.navigate('', {})}
          />
        </View>
        <Container
          name="Add Patient"
          count={5}
          onPress={() => navigation.navigate('')}
        />
          <Container
          name="Add Visit Notes"
          count={35}
          onPress={() => navigation.navigate('')}
        />
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
export default HistoryScreen;
