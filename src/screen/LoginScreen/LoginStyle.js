import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components imports
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import TextinputWraper from '../components/TextinputWraper';
import BlueButton from '../components/BlueButton';

import { useMutation, useQuery } from '@tanstack/react-query';
import { loginAPI, getHospitals } from '../../API/Home';
import DropdownArrow from '../components/DropdownArrow';

const LoginStyle = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospital, setHospital] = useState(null);

  // useMutation
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: async response => {
      await AsyncStorage.setItem('DOC_ID', String(response?.users_id));
      await AsyncStorage.setItem('HOSPITAL_ID', String(response?.hospital_id));
      await AsyncStorage.setItem('DOC_NAME', response?.name ?? '');
      await AsyncStorage.setItem('DOC_EMAIL', response?.email ?? '');
      await AsyncStorage.setItem(
        'DOC_SPECIALIZATION',
        response?.specialization ?? '',
      );
      await AsyncStorage.setItem('DOC_PHONE', response?.phone_no ?? '');
      await AsyncStorage.setItem('DOC_ABOUT', response?.about ?? '');
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
      console.log('AsyncStorage data:', allData);
      navigation.navigate('PatientList');
    },

    onError: error => {
      Alert.alert('Login Failed', error.message || 'Network Error');
    },
  });

  const { data: hospitalsData, isLoading } = useQuery({
    queryKey: ['hospitals'],
    queryFn: getHospitals,
  });

  // Transform data for Dropdown (label/value format)
  const hospitalList =
    hospitalsData?.map(h => ({
      label: h.name,
      value: h.hospital_id,
    })) || [];

  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header
          title="Login"
          onPress={() => navigation?.goBack()}
          fontSize={25}
        />
      </View>

      {/* --- INPUTS SECTION --- */}
      <TextinputWraper
        placeholder="Enter your Email"
        icon={require('../../assests/Email.png')}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextinputWraper
        placeholder="Enter your Password"
        icon={require('../../assests/Password.png')}
        rightIcon={require('../../assests/eye-slash.png')}
        isPassword={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <DropdownArrow
        placeholder="Select Hospital"
        icon={require('../../assests/Logs.png')}
        data={hospitalList}
        value={hospital}
        onChange={item => setHospital(item.value)}
        loading={isLoading}
      />

      {/* --- LOGIN BUTTON --- */}
      <BlueButton
        title={isPending ? 'Logging in...' : 'Sign in'}
        onPress={() => handleLogin({ email, password, hospital_id: hospital })}
      />

      {/* --- FOOTER SECTION --- */}
      <View style={styles.footerContainer}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text>Login as admin?</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('LoginAdmin')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>
            Admin Screen
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LoginStyle;
