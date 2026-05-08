import React from 'react';
import {
  View,
  style,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const NavigationHomeEndPointRoutesLogs = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Home Pressed')}
      >
        <Image
          source={require('../../assests/GHR.png')}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('H Pressed')}
      >
        <Image
          source={require('../../assests/AddPatient.png')}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Email Pressed')}
      >
        <Image
          source={require('../../assests/Vector.png')}
          style={[styles.navIconImage, { tintColor: '#999' }]}
        />
        <Text style={styles.navText}>Pending Claims</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Vector Pressed')}
      >
        <Image
          source={require('../../assests/Logs.png')}
          style={[styles.navIconImage, { tintColor: '#999' }]}
        />
        <Text style={styles.navText}>Add Customer</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#999',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 5,
    tintColor: '#999',
  },
});
export default NavigationHomeEndPointRoutesLogs;
