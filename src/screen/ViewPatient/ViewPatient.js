import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Boxx from '../components/Boxx';
import Button from '../components/Button';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';
import PagePAtientDetail from '../components/PagePAtientDetail';
import { getPatientDetail, getVisitNotes } from '../../API/Home2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewPatient = ({ navigation, route }) => {
  const { mpi } = route.params ?? {};
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('user_id');
      setDocId(id);
    })();
  }, []);

  // API 1 — Patient detail
  const { data: patient, isLoading: patientLoading } = useQuery({
    queryKey: ['patient', mpi],
    queryFn: () => getPatientDetail(mpi),
    enabled: !!mpi,
  });

  // API 2 — Visit notes
  const {
    data: notes = [],
    isLoading: notesLoading,
    isError,
  } = useQuery({
    queryKey: ['visitNotes', docId, mpi],
    queryFn: () => getVisitNotes({ docId, pid: mpi }),
    enabled: !!docId && !!mpi,
  });

  if (patientLoading) {
    return (
      <ActivityIndicator size="large" color="#0D253C" style={{ flex: 1 }} />
    );
  }

  return (
    <>
      <ScrollViewContainer>
        <Header title={`Patient: ${patient?.name || ''}`} fontSize={25} />
        <Boxx
          data={[
            { label: 'Age', value: patient?.age },
            { label: 'Gender', value: patient?.gender },
            { label: 'Phone no', value: patient?.phone_no },
            { label: 'NIC', value: patient?.nic },
            { label: 'Address', value: patient?.address },
          ]}
        />

        <View style={styles.serverHeaderRow}>
          <Header title="Visiting Notes" fontSize={20} />
          <Button
            title="Add Notes"
            onPress={() =>
              navigation.navigate('AddConsultationNotes', {
                pid: mpi,
              })
            }
          />
        </View>

        <View style={styles.statsCard}>
          {notesLoading ? (
            <ActivityIndicator color="#0D253C" />
          ) : isError ? (
            <Text style={styles.errorText}>No note loaded</Text>
          ) : notes.length === 0 ? (
            <Text style={styles.emptyText}>No note received</Text>
          ) : (
            notes.map(note => (
              <PagePAtientDetail
                key={note.note_id}
                testName={note.note_title}
                date={note.visit_date}
                onPress={() =>
                  navigation.navigate('ViewNotes', { note_id: note.note_id })
                }
              />
            ))
          )}
        </View>
      </ScrollViewContainer>
      <NavHomeAddNotifiProfile navigation={navigation} activeTab="Home" />
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
  statsCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30,
    elevation: 2,
  },
  errorText: { color: 'red', textAlign: 'center', padding: 10 },
  emptyText: { color: '#aaa', textAlign: 'center', padding: 10 },
});

export default ViewPatient;
