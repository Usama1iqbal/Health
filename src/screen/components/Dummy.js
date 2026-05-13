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











import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import HospitalList from '../components/HospitalList';

const AdminDashboard = ({ navigation }) => {
  const myDummyData = [
    { hospital_id: 1, name: 'Shifa International' },
    { hospital_id: 2, name: 'Holly Family' },
    { hospital_id: 3, name: 'ABC Hospital' },
  ];
  return (
    <>
      <ScrollViewContainer>
        <Header title="Admin Panel" fontSize={35} />

        <Header title="Hospitals" fontSize={35} />
        <HospitalList
          data={myDummyData}
          onSelect={item => alert(`Selected: ${item.name}`)}
        />
      </ScrollViewContainer>
    </>
  );
};

export default AdminDashboard;












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

