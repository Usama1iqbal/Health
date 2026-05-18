import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Text,
  TextInput,
} from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import TextInputField from '../components/TextinputField';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { updateDoctor } from '../../API/Home';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [docId, setDocId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Edit fields
  const [editPhone, setEditPhone] = useState('');
  const [editSpecialization, setEditSpecialization] = useState('');
  const [editAbout, setEditAbout] = useState('');

  useEffect(() => {
    (async () => {
      setName((await AsyncStorage.getItem('DOC_NAME')) ?? '');
      setSpecialization(
        (await AsyncStorage.getItem('DOC_SPECIALIZATION')) ?? '',
      );
      setPhone((await AsyncStorage.getItem('DOC_PHONE')) ?? '');
      setAbout((await AsyncStorage.getItem('DOC_ABOUT')) ?? '');
      setDocId(await AsyncStorage.getItem('DOC_ID'));
    })();
  }, []);

  const { mutate, isLoading } = useMutation({
    mutationFn: data => updateDoctor(docId, data),
    onSuccess: async () => {
      // AsyncStorage update karo
      await AsyncStorage.setItem('DOC_PHONE', editPhone);
      await AsyncStorage.setItem('DOC_SPECIALIZATION', editSpecialization);
      await AsyncStorage.setItem('DOC_ABOUT', editAbout);
      setPhone(editPhone);
      setSpecialization(editSpecialization);
      setAbout(editAbout);
      setModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully');
    },
    onError: () => {
      Alert.alert('Error', 'Update failed');
    },
  });

  const handleEdit = () => {
    setEditPhone(phone);
    setEditSpecialization(specialization);
    setEditAbout(about);
    setModalVisible(true);
  };

  const handleSave = () => {
    mutate({
      phone_no: editPhone,
      specialization: editSpecialization,
      about: editAbout,
    });
  };

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

        {/* Edit Button */}
        <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>

        <Header
          title={name || 'Doctor Name'}
          fontSize={20}
          style={{ textAlign: 'center' }}
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
            <Header title="Logout" fontSize={15} color="red" />
          </View>
        </TouchableOpacity>
      </ScrollViewContainer>

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Header title="Edit Profile" fontSize={18} />

            <TextInput
              style={styles.input}
              placeholder="Phone No"
              value={editPhone}
              onChangeText={setEditPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Specialization"
              value={editSpecialization}
              onChangeText={setEditSpecialization}
            />
            <TextInput
              style={styles.input}
              placeholder="About"
              value={editAbout}
              onChangeText={setEditAbout}
              multiline
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={styles.saveBtnText}>
                {isLoading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  avatarr: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 10,
  },
  editBtn: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  editBtnText: { color: 'white', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cancelText: { textAlign: 'center', color: 'gray', marginTop: 5 },
});

export default Profile;
