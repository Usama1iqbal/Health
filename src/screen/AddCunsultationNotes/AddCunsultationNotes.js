import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import TextinputField from '../components/TextinputField';
import Dropdown from '../components/DropDown';
import Button from '../components/Button';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';
import { addVisitNote, searchLabTest } from '../../API/Home2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddConsultationNotes = ({ navigation, route }) => {
  const { pid } = route.params;
  const [docId, setDocId] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('DOC_ID');
      const hId = await AsyncStorage.getItem('HOSPITAL_ID');
      setDocId(id);
      setHospitalId(hId);
    })();
  }, []);

  const queryClient = useQueryClient();

  const [noteTitle, setNoteTitle] = useState('');
  const [complaint, setComplaint] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [noteDetails, setNoteDetails] = useState('');
  const [labName, setLabName] = useState('');
  const [labTests, setLabTests] = useState([]);
  const [labSearch, setLabSearch] = useState('');
  const [labResults, setLabResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [billAmount, setBillAmount] = useState('');

  // Lab search
  const handleLabSearch = async text => {
    setLabSearch(text);
    if (text.length > 1) {
      const results = await searchLabTest(text);
      setLabResults(results || []);
      setShowResults(true);
    } else {
      setShowResults(false);
      setLabResults([]);
    }
  };

  // Add test — pura object save karo
  const addLabTest = item => {
    setLabTests(prev => [
      ...prev,
      {
        loinc_code: item.loinc_code,
        long_common_name: item.long_common_name,
        short_name: item.short_name || null,
        component: item.component || null,
        system: item.system || null,
        display_name: item.long_common_name,
        // mobile_name: item.mobile_name || null, // ← add karo
      },
    ]);
    setLabSearch('');
    setShowResults(false);
  };

  // Remove test
  const removeLabTest = index => {
    setLabTests(prev => prev.filter((_, i) => i !== index));
  };

  const { mutate: saveNote, isLoading } = useMutation({
    mutationFn: addVisitNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['visitNotes', docId, pid, hospitalId]);
      Alert.alert('Success', 'Note save Successfully!');
      navigation.goBack();
    },
    onError: error => {
      // ✅ exact backend error dekho
      const detail = error.response?.data?.detail;
      Alert.alert('Error', JSON.stringify(detail) || error.message);
    },
  });

  const handleSave = () => {
    if (!noteTitle || !complaint || !diagnosis || !billAmount)
      return Alert.alert('Error', 'Please fill all requirements!');

    const payload = {
      mpi: Number(pid),
      doctor_id: Number(docId),
      hospital_id: hospitalId,
      note_title: noteTitle.trim(),
      patient_complaint: complaint.trim(),
      dignosis: diagnosis.trim(),
      note_details: noteDetails.trim(),
      bill_amount: parseFloat(billAmount) || 0,
      lab_name: labName || null,
      test_names: labTests.length > 0 ? labTests : null,
    };

    console.log('PAYLOAD:', JSON.stringify(payload, null, 2)); // 👈 terminal mein dekho
    saveNote(payload);
  };

  return (
    <>
      <ScrollViewContainer>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Header title="Visiting Notes" fontSize={30} />
        </View>

        <TextinputField
          title="Note Title"
          placeholder="Emergency Visit"
          value={noteTitle}
          onChangeText={setNoteTitle}
        />
        <TextinputField
          title="Patient Complaint"
          placeholder="Vomiting and Fever"
          value={complaint}
          onChangeText={setComplaint}
        />
        <TextinputField
          title="Diagnosis"
          placeholder="Dengue"
          value={diagnosis}
          onChangeText={setDiagnosis}
        />
        <View style={{ height: 90, marginBottom: 20 }}>
          <TextinputField
            title="Consultation Notes"
            placeholder="High fever and vomiting"
            value={noteDetails}
            onChangeText={setNoteDetails}
          />
        </View>

        <Text style={styles.label}>Lab Test</Text>
        <View style={styles.serverHeaderRow}>
          <Dropdown
            title="Select Lab"
            options={['IOC', 'MIR']}
            onSelect={v => setLabName(v)}
          />
        </View>

        {/* Search Input */}
        <TextinputField
          placeholder="Search Lab Test..."
          value={labSearch}
          onChangeText={handleLabSearch}
        />

        {/* Search Results */}
        {showResults &&
          labResults.map(item => (
            <TouchableOpacity
              key={item.loinc_code}
              style={styles.resultItem}
              onPress={() => addLabTest(item)}
            >
              <Text style={styles.resultText}>{item.long_common_name}</Text>
            </TouchableOpacity>
          ))}

        {/* Added Tests */}
        {labTests.map((test, index) => (
          <View key={index} style={styles.testRow}>
            <Text style={styles.testName}>{test.long_common_name}</Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeLabTest(index)}
            >
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.label}>Bill Amount</Text>
        <TextinputField
          placeholder="2000"
          value={billAmount}
          onChangeText={setBillAmount}
          keyboardType="numeric"
        />

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0D253C" />
          ) : (
            <Button title="Save" onPress={handleSave} />
          )}
        </View>
      </ScrollViewContainer>
      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Home" />
    </>
  );
};

const styles = StyleSheet.create({
  label: { color: 'black', fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  resultText: { fontSize: 14, color: '#333' },
  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  testName: { flex: 1, fontSize: 14, color: '#333' },
  removeBtn: {
    backgroundColor: '#0D253C',
    padding: 6,
    borderRadius: 6,
  },
  removeBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

export default AddConsultationNotes;
