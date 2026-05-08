import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components imports
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import TextinputWraper from '../components/TextinputWraper';
import BlueButton from '../components/BlueButton';

import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../../API/Home';

const LoginStyle = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useMutation
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: response => {
      // doctor_id global mein save karo — poori app mein use hoga
      (async () => {
        await AsyncStorage.setItem('DOC_ID', response?.doctor_id.toString());
        console.log('Doctor ID saved:', response?.doctor_id); // Terminal mein check karne ke liye
      })();
      navigation.navigate('PatientList');
    },
    onError: error => {
      Alert.alert('Login Failed', error.message || 'Network Error');
    },
  });

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

      {/* --- LOGIN BUTTON --- */}
      <BlueButton
        title={isPending ? 'Logging in...' : 'Sign in'}
        onPress={() => handleLogin({ email, password })}
      />

      {/* --- FOOTER SECTION --- */}
      <View style={styles.footerContainer}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign up</Text>
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
