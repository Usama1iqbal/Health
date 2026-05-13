import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { getPatientsFromDB } from '../../API/Home';

import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';

import PatientListDetails from '../components/PatientListDetail';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';
import TextinputWraper from '../components/TextinputWraper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientList = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [hospitalId, setHospitalId] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('HOSPITAL_ID');
      setHospitalId(id);
    })();
  }, []);

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients', hospitalId],
    queryFn: () => getPatientsFromDB(hospitalId),
    enabled: !!hospitalId, // hospitalId aane ke baad hi call hogi
  });
  // 2. filter logic add for// serach functionality
  const filteredPatients =
    patients?.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    ) || [];
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollViewContainer>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../assests/Blue.png')}
            style={styles.headerBg}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.headerContent}>
              <View>
                <Image
                  source={require('../../assests/Profilee.png')}
                  style={styles.profilePic}
                />
                <Text style={styles.welcomeText}>welcome !</Text>
                <Text style={styles.userName}>Sana</Text>
              </View>
              <Image
                source={require('../../assests/Heart.png')}
                style={styles.heartLogo}
              />
            </View>
          </ImageBackground>

          <TextinputWraper
            placeholder="Search Patient..."
            icon={require('../../assests/Search.png')}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />

          <Header
            title="Patient List"
            fontSize={30}
            onPress={() => navigation?.goBack()}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#2F80ED"
            style={{ marginTop: 50 }}
          />
        ) : patients && patients.length > 0 ? (
          filteredPatients.map((item, index) => (
            <PatientListDetails
              key={index}
              patientData={item}
              onPress={() =>
                navigation.navigate('ViewPatient', {
                  mpi: item.mpi, // sirf mpi
                })
              }
            />
          ))
        ) : (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={styles.noDataText}>No Patients Found in DB</Text>
          </View>
        )}
      </ScrollViewContainer>

      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { marginBottom: 20, borderRadius: 20, overflow: 'hidden' },
  headerBg: { width: '100%', height: 180, justifyContent: 'center' },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  welcomeText: { color: '#333', fontSize: 14, fontWeight: '600' },
  userName: { color: '#000', fontSize: 20, fontWeight: 'bold' },
  heartLogo: { width: 100, height: 100, resizeMode: 'contain', opacity: 0.9 },
  noDataText: {
    fontSize: 16,
    color: '#777',
  },
});

export default PatientList;
