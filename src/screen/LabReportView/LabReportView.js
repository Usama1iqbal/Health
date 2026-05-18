import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getLabResults } from '../../API/Home';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Boxx from '../components/Boxx';
import ShadowLine from '../components/ShadowLine';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';

const LabReportView = ({ navigation, route }) => {
  const { test_req_id, patient_name, test_name } = route.params;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['labResults', test_req_id],
    queryFn: () => getLabResults(test_req_id),
    enabled: !!test_req_id,
  });

  return (
    <>
      <ScrollViewContainer>
        <Header
          title={`Patient: ${patient_name}`}
          onPress={() => navigation.goBack()}
          fontSize={20}
        />
        <Header title={`${test_name}: Report Summary`} fontSize={20} />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#2F80ED"
            style={{ marginTop: 30 }}
          />
        ) : isError ? (
          <Text style={styles.errorText}>
            {error?.message || 'Failed to load result'}
          </Text>
        ) : (
          <>
            <Boxx
              data={[
                { label: 'Test Name', value: data?.test_name ?? '-' },
                {
                  label: 'Description',
                  value: data?.description ?? 'No description available.',
                },
              ]}
            />

            {data?.mini_test_results?.length > 0 && (
              <>
                <Header title="Result" fontSize={35} />
                <View style={[styles.serverHeaderRow, styles.headerBorder]}>
                  <Text style={styles.middleTitle}>Parameter</Text>
                  <Text style={styles.middleTitle}>Range</Text>
                  <Text style={styles.middleTitle}>Unit</Text>
                  <Text style={styles.middleTitle}>Result</Text>
                </View>
                <ShadowLine />
                {data.mini_test_results.map(item => (
                  <View key={item.mini_test_id} style={styles.serverHeaderRow}>
                    <Text style={styles.middleTitle} numberOfLines={2}>
                      {item.test_name || '—'}
                    </Text>
                    <Text style={styles.middleTitle} numberOfLines={2}>
                      {item.normal_range || '—'}
                    </Text>
                    <Text style={styles.middleTitle} numberOfLines={1}>
                      {item.unit || '—'}
                    </Text>
                    <Text style={styles.middleTitle} numberOfLines={1}>
                      {item.result_value || '—'}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </>
        )}
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
  },
  headerBorder: {
    marginBottom: 5,
  },
  middleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D253C',
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: '#C62828',
    marginTop: 20,
    fontSize: 13,
  },
});

export default LabReportView;
