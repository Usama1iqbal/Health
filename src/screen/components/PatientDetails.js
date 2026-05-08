import React from 'react';
import {
  View,
  style,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const PatientDetails = () => {
  return (
    <View style={styles.patientCard}>
      {/* Left Side: Avatar Image */}
      <Image
        // Apni image ka sahi naam check karein (Profile.png ya Image.png)
        source={require('../../assests/Image.png')}
        style={styles.avatar}
      />

      {/* Right Side: Details */}
      <View style={styles.cardDetails}>
        {/* Name */}
        <Text style={styles.patientName}>Patient Name </Text>

        {/* Details Rows */}
        <Text style={styles.detailText}>MPI: </Text>
        <Text style={styles.detailText}>Date</Text>
        <Text style={styles.detailText}>policy_number: </Text>
      </View>

      {/* Arrow Icon (Optional - Right side pe) */}
      <Text style={styles.arrowIcon}>›</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  patientCard: {
    flexDirection: 'row', // Zaroori: Image aur Text ko aamne samne lata hai
    alignItems: 'center', // Center mein align karta hai
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Halki grey border
    marginBottom: 10, // Neeche walay card se gap

    // Shadow (Optional khubsurti ke liye)
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  avatar: {
    width: 60, // Image ka fix size
    height: 60,
    borderRadius: 30, // Gol Circle
    marginRight: 15, // Text aur Image ke darmiyan gap
    backgroundColor: '#eee', // Agar image na ho to grey color aye
  },

  cardDetails: {
    flex: 1, // Baqi sari jagah text le le
    justifyContent: 'center',
  },

  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D253C', // Dark Blue Text
    marginBottom: 4,
  },

  detailText: {
    fontSize: 12,
    color: '#777', // Grey Text
    marginBottom: 2, // Lines ke darmiyan thora gap
    fontWeight: '500',
  },

  arrowIcon: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: 'bold',
  },
});
export default PatientDetails;
