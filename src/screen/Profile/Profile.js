import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import TextInputField from '../components/TextinputField';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    (async () => {
      setName((await AsyncStorage.getItem('DOC_NAME')) ?? '');
      setSpecialization(
        (await AsyncStorage.getItem('DOC_SPECIALIZATION')) ?? '',
      );
      setPhone((await AsyncStorage.getItem('DOC_PHONE')) ?? '');
      setAbout((await AsyncStorage.getItem('DOC_ABOUT')) ?? '');
    })();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <>
      <ScrollViewContainer>
        <Image
          source={require('../../assests/Image.png')}
          style={styles.avatar}
        />
        <Header
          title={name || 'Doctor Name'}
          fontSize={20}
          style={{ textAlign: 'center' }}
        />

        <View style={styles.row}>
          <Image
            source={require('../../assests/Logs.png')}
            style={styles.avatarr}
          />
          <Header title="Specialization" fontSize={15} />
        </View>
        <TextInputField
          title="Specialization"
          value={specialization}
          editable={false}
          placeholder="Specialization"
        />

        <View style={styles.row}>
          <Image
            source={require('../../assests/Phone.png')}
            style={styles.avatarr}
          />
          <Header title="Phone Number" fontSize={15} />
        </View>
        <TextInputField
          title="Phone Number"
          value={phone}
          editable={false}
          placeholder="Phone Number"
        />

        <View style={styles.row}>
          <Image
            source={require('../../assests/About.png')}
            style={styles.avatarr}
          />
          <Header title="About" fontSize={15} />
        </View>
        <TextInputField
          title="About"
          value={about}
          editable={false}
          placeholder="About"
        />

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.row}>
            <Image
              source={require('../../assests/Logout.png')}
              style={styles.avatarr}
            />
            <Header title="Logout" fontSize={15} />
          </View>
        </TouchableOpacity>
      </ScrollViewContainer>
      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Profile" />
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  avatarr: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 10,
  },
});

export default Profile;
