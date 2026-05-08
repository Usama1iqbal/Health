import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from '@tanstack/react-query';
import TextinputField from '../components/TextinputField';
import Button from '../components/Button';
import ScrollViewContainer from '../components/ScrollViewContainer';
import { addPatientToDB } from '../../API/Home2';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';

const AddPatient = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [nic, setNic] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [insurance, setInsurance] = useState('');
  const [policy, setPolicy] = useState('');
  const [planType, setPlanType] = useState('');

  const { mutate: savePatient, isLoading } = useMutation({
    mutationFn: addPatientToDB,
    onSuccess: () => {
      Alert.alert('Success', 'Data inserted successfully!');
      setName('');
      setDob('');
      setDate(new Date());
      setGender('');
      setNic('');
      setPhone('');
      setAddress('');
      setInsurance('');
      setPolicy('');
      setPlanType('');
    },
    onError: error => {
      Alert.alert('Error', error.message || 'Kuch ghalat hua');
    },
  });

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setDate(selectedDate);
      setDob(`${year}-${month}-${day}`);
    }
  };

  const handleSave = () => {
    if (!name || !dob || !gender || !nic || !phone || !address)
      return Alert.alert('Error', 'Please fill all required fields!');

    savePatient({
      nic: nic.trim(),
      name: name.trim(),
      phone_no: phone.trim(),
      gender: gender.trim(),
      date_of_birth: dob.trim(),
      address: address.trim(),
      insurance_company: insurance.trim(),
      policy_number: parseInt(policy) || 0,
      plan_type: planType.trim(),
    });
  };

  return (
    <>
      <ScrollViewContainer>
        <View style={{ padding: 20, paddingBottom: 100 }}>
          <TextinputField
            title="Name"
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dateField}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={dob ? styles.dateText : styles.datePlaceholder}>
              {dob || 'yyyy-mm-dd'}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}

          <TextinputField
            title="Gender"
            placeholder="Male/Female"
            value={gender}
            onChangeText={setGender}
          />
          <TextinputField
            title="NIC"
            placeholder="Enter NIC"
            value={nic}
            onChangeText={setNic}
          />
          <TextinputField
            title="Phone"
            placeholder="Enter Phone"
            value={phone}
            onChangeText={setPhone}
          />
          <TextinputField
            title="Address"
            placeholder="Enter Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextinputField
            title="Insurance Company"
            placeholder="Select Company"
            value={insurance}
            onChangeText={setInsurance}
          />
          <TextinputField
            title="Policy Number"
            placeholder="Enter Policy Number"
            value={policy}
            onChangeText={setPolicy}
          />
          <TextinputField
            title="Plan Type"
            placeholder="Enter Plan Type"
            value={planType}
            onChangeText={setPlanType}
          />

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0D253C"
              style={{ marginTop: 30 }}
            />
          ) : (
            <Button
              title="Save"
              onPress={handleSave}
              style={styles.saveButton}
            />
          )}
        </View>
      </ScrollViewContainer>
      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Add" />
    </>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#2D3E50',
    borderRadius: 10,
    height: 40,
    marginTop: 30,
    width: '30%',
    alignSelf: 'center',
    marginHorizontal: 80,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 6,
    marginTop: 10,
  },
  dateField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dateText: { fontSize: 14, color: '#0D253C' },
  datePlaceholder: { fontSize: 14, color: '#aaa' },
  calendarIcon: { fontSize: 18 },
});

export default AddPatient;
