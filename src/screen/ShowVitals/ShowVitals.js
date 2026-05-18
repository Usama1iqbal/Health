import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import ScrollViewContainer from '../components/ScrollViewContainer';

// TODO 1: yeh dummy function hata do, real import lagao
// import { getVitals } from '../API/Home';
const getVitals = async (nic, doc_id) => {
  await new Promise(r => setTimeout(r, 800));
  return [
    {
      id: 1,
      type: 'BP',
      systolic: '120',
      diastolic: '80',
      unit: 'mmHg',
      date: '2025-05-10',
      time: '08:30 AM',
    },
    {
      id: 2,
      type: 'Sugar',
      meal_time: 'Before Meal',
      value: '95',
      unit: 'mg/dL',
      date: '2025-05-11',
      time: '09:00 AM',
    },
    {
      id: 3,
      type: 'Temperature',
      value: '98.6',
      unit: '°F',
      date: '2025-05-12',
      time: '10:15 AM',
    },
    {
      id: 4,
      type: 'BP',
      systolic: '130',
      diastolic: '85',
      unit: 'mmHg',
      date: '2025-05-13',
      time: '11:00 AM',
    },
    {
      id: 5,
      type: 'Sugar',
      meal_time: 'After Meal',
      value: '145',
      unit: 'mg/dL',
      date: '2025-05-14',
      time: '02:00 PM',
    },
    {
      id: 6,
      type: 'Temperature',
      value: '99.1',
      unit: '°F',
      date: '2025-05-15',
      time: '08:00 AM',
    },
  ];
};

const FILTERS = ['All', 'BP', 'Sugar', 'Temperature'];
const typeColor = { BP: '#1565C0', Sugar: '#2E7D32', Temperature: '#AD1457' };
const typeBg = { BP: '#E3F2FD', Sugar: '#E8F5E9', Temperature: '#FCE4EC' };
const typeIcon = { BP: '❤️', Sugar: '💧', Temperature: '🌡️' };

const ShowVitals = ({ navigation, route }) => {
  // TODO 2: nic aur doc_id route.params se aa rahe hain
  // jab session ready ho to doc_id session se lo:
  // const { user } = useSession();
  // const doc_id = user?.doc_id;
  const { nic, doc_id } = route.params;

  const [filter, setFilter] = useState('All');

  const {
    data: vitals = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['vitals', nic, doc_id],
    queryFn: () => getVitals(nic, doc_id), // TODO 1: real function yahan update hoga
  });

  const filtered =
    filter === 'All' ? vitals : vitals.filter(v => v.type === filter);

  return (
    <ScrollViewContainer>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>{'< Back'}</Text>
          </TouchableOpacity>
          <Header title="Patient Vitals" fontSize={20} color="#1a1a2e" />
          <TouchableOpacity onPress={refetch}>
            <Text style={styles.refreshText}>↻</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.nicText}>🪪 NIC: {nic}</Text>

        {!isLoading && !isError && (
          <View style={styles.statsRow}>
            {[
              {
                label: 'Total',
                count: vitals.length,
                color: '#062963',
                bg: 'white',
              },
              {
                label: 'BP',
                count: vitals.filter(v => v.type === 'BP').length,
                color: '#1565C0',
                bg: '#E3F2FD',
              },
              {
                label: 'Sugar',
                count: vitals.filter(v => v.type === 'Sugar').length,
                color: '#2E7D32',
                bg: '#E8F5E9',
              },
              {
                label: 'Temp',
                count: vitals.filter(v => v.type === 'Temperature').length,
                color: '#AD1457',
                bg: '#FCE4EC',
              },
            ].map(s => (
              <View
                key={s.label}
                style={[styles.statChip, { backgroundColor: s.bg }]}
              >
                <Text style={[styles.statCount, { color: s.color }]}>
                  {s.count}
                </Text>
                <Text style={[styles.statLabel, { color: s.color }]}>
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, filter === f && styles.chipTextActive]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator
          color="#062963"
          size="large"
          style={{ marginTop: 40 }}
        />
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load vitals</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={refetch}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No vitals found</Text>
        </View>
      ) : (
        filtered.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <View
              style={[styles.iconBadge, { backgroundColor: typeBg[item.type] }]}
            >
              <Text style={styles.iconText}>{typeIcon[item.type]}</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.typeRow}>
                <View
                  style={[
                    styles.typeBadge,
                    { backgroundColor: typeBg[item.type] },
                  ]}
                >
                  <Text
                    style={[styles.typeText, { color: typeColor[item.type] }]}
                  >
                    {item.type}
                  </Text>
                </View>
                {item.type === 'Sugar' && item.meal_time && (
                  <View style={styles.mealBadge}>
                    <Text style={styles.mealText}>{item.meal_time}</Text>
                  </View>
                )}
              </View>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>
                  {item.type === 'BP'
                    ? `${item.systolic}/${item.diastolic}`
                    : item.value}
                </Text>
                <Text style={styles.unitText}> {item.unit}</Text>
              </View>
            </View>
            <View style={styles.dateSection}>
              <Text style={styles.dateText}>📅 {item.date}</Text>
              <Text style={styles.timeText}>🕐 {item.time}</Text>
              <View style={styles.indexBadge}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D6EAF8',
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  backText: { color: '#062963', fontWeight: 'bold', fontSize: 14 },
  refreshText: { color: '#062963', fontSize: 22, fontWeight: 'bold' },
  nicText: { color: '#445577', fontSize: 13, fontWeight: '600', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  statChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  statCount: { fontSize: 18, fontWeight: '700' },
  statLabel: { fontSize: 11, fontWeight: '500' },
  filterRow: { flexDirection: 'row', gap: 8, padding: 16, paddingBottom: 4 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  chipActive: { backgroundColor: '#062963', borderColor: '#062963' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#555' },
  chipTextActive: { color: 'white' },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { fontSize: 22 },
  cardContent: { flex: 1, marginLeft: 14 },
  typeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeText: { fontSize: 11, fontWeight: '700' },
  mealBadge: {
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  mealText: { fontSize: 10, fontWeight: '600', color: '#2E7D32' },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 6 },
  valueText: { fontSize: 24, fontWeight: '700', color: '#1a1a2e' },
  unitText: { fontSize: 11, color: '#999', marginBottom: 2 },
  dateSection: { alignItems: 'flex-end', gap: 4 },
  dateText: { fontSize: 11, color: '#888' },
  timeText: { fontSize: 11, color: '#888' },
  indexBadge: {
    width: 22,
    height: 22,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  indexText: { fontSize: 10, fontWeight: '700', color: '#888' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#888', fontSize: 14, marginBottom: 12 },
  retryBtn: {
    backgroundColor: '#062963',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: { color: 'white', fontWeight: 'bold' },
  emptyText: { color: '#999', fontSize: 15 },
});

export default ShowVitals;
