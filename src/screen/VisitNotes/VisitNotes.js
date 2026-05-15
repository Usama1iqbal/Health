import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Boxx from '../components/Boxx';
import Button from '../components/Button';
import TextInputField from '../components/TextinputField';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';
import PagePAtientDetail from '../components/PagePAtientDetail';
import {
  getVisitNoteDetail,
  getLabReports,
  submitClaim,
} from '../../API/Home2';

const ViewNotes = ({ navigation, route }) => {
  const { note_id } = route.params ?? {};

  // State mein default note data se lo
  // const [totalBill, setTotalBill] = useState(0);

  // note aane ke baad automatically fill karo
  // useEffect(() => {
  //   if (note) {
  //     setTotalBill(String(note.total_bill ?? '0'));
  //   }
  // }, [note]);
  
  const { data: note, isLoading: noteLoading } = useQuery({
    queryKey: ['visitNote', note_id],
    queryFn: () => getVisitNoteDetail(note_id),
    enabled: !!note_id,
  });
  
  const { data: labReports = [], isLoading: labLoading } = useQuery({
    queryKey: ['labReports', note_id],
    queryFn: () => getLabReports(note_id),
    enabled: !!note_id,
  });
  
  const { mutate: handleSubmit, isPending: isSubmitting } = useMutation({
    mutationFn: () =>
      submitClaim({
        vid: note?.note_id,
        mpi: note?.mpi,
        service_included: true,
        lab_included: labReports.length > 0,
        total_fee: parseFloat(note?.total_bill) || 0,
      }),
      onSuccess: () => {
        Alert.alert('Success', 'Claim submitted successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      },
      onError: error => {
        Alert.alert('Error', error.message || 'Submit failed');
      },
    });

  // setTotalBill(note?.total_bill ?? 0);
    
  if (noteLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0D253C" />
        <Text style={{ color: '#777', marginTop: 10 }}>Loading note...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollViewContainer>
        <Header
          title={note?.note_title || 'Visit Note'}
          fontSize={25}
          onPress={() => navigation.goBack()}
        />
        <Boxx
          data={[
            {
              label: 'Patient Complaint',
              value: note?.patient_complaint ?? '-',
            },
            { label: 'Diagnosis', value: note?.dignosis ?? '-' },
            { label: 'Consultation Notes', value: note?.note_details ?? '-' },
            {
              label: 'Consultation Bill',
              value: note?.consultation_bill ?? '-',
            },
            // { label: 'Lab Bill', value: note?.lab_bill ?? '-' },
            // { label: 'Total Bill', value: note?.total_bill ?? '-' },
            { label: 'Bill Status', value: note?.bill_status ?? '-' },
          ]}
        />

        <View style={styles.serverHeaderRow}>
          <Header title="Lab Reports" fontSize={20} />
        </View>

        <View style={styles.statsCard}>
          {labLoading ? (
            <ActivityIndicator color="#0D253C" />
          ) : labReports.length === 0 ? (
            <Text style={styles.emptyText}>No reports</Text>
          ) : (
            labReports.map(report => (
              <PagePAtientDetail
                key={report.report_id}
                testName={`${report.lab_name} - ${report.test_name}`}
                date={report.created_at}
                status={report.test_status}
              />
            ))
          )}
        </View>

        <TextInputField
          title="Total Lab Charges"
          value={String(0)}
          editable={false} // ← uneditable
          keyboardType="numeric"
        />
        <TextInputField
          title="Total Bill"
          value={String(note?.total_bill ?? 0)}
          editable={false} // ← uneditable
          keyboardType="numeric"
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Button
            title={isSubmitting ? 'Submitting...' : 'Submit Claim'}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  emptyText: { color: '#aaa', textAlign: 'center', padding: 10 },
});

export default ViewNotes;
