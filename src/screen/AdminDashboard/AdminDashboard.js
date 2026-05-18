import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import HospitalList from '../components/HospitalList';
import { useQuery } from '@tanstack/react-query';
import { allHospital } from '../../API/Home2';

const AdminDashboard = ({ navigation }) => {
  const { data: hospitals = [], isLoading } = useQuery({
    queryKey: ['hospitals'],
    queryFn: allHospital,
  });

  return (
    <ScrollViewContainer>
      <Header title="Admin Panel" fontSize={35} />
      <Header title="Hospitals" fontSize={35} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <HospitalList
          data={hospitals}
          onSelect={item => alert(`Selected: ${item.name}`)}
        />
      )}
    </ScrollViewContainer>
  );
};
const styles = StyleSheet.create({
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A365D',
  },
  systemId: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default AdminDashboard;
