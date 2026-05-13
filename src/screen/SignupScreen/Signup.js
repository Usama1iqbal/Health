import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

// Components
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import TextinputWraper from '../components/TextinputWraper';
import BlueButton from '../components/BlueButton';

import { useMutation, useQuery } from '@tanstack/react-query';
import { signupAPI, getHospitals } from '../../API/Home';
import DropdownArrow from '../components/DropdownArrow';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospital, setHospital] = useState(null);

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      Alert.alert('Success', 'Account created! Please Login.', [
        { text: 'OK', onPress: () => navigation?.navigate('Login') },
      ]);
    },
    onError: error => {
      console.log('=== ERROR ===', error.message);
      console.log('Backend:', error.response?.data);
      Alert.alert('Failed', error.message);
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
          title="Sign Up"
          onPress={() => navigation?.goBack()}
          fontSize={25}
        />
      </View>

      <TextinputWraper
        placeholder="Enter your Name"
        icon={require('../../assests/Profile.png')}
        value={name}
        onChangeText={text => setName(text)}
      />

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
        data={hospitalList} // Fix 2: Using transformed list
        value={hospital}
        onChange={item => setHospital(item.value)} // Fix 3: Setting the ID
        loading={isLoading}
      />

      <BlueButton
        title={isPending ? 'Creating Account...' : 'Sign up'}
        onPress={() =>
          handleSignup({ name, email, password, hospital_id: hospital })
        }
        disabled={isPending}
      />

      <View style={styles.footerContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign In</Text>
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

export default Signup;
