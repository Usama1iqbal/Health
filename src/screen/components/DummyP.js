import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextinputField from '../components/TextinputField';
import NavHomeAddNotifiProfile from '../components/NavHomeAddNotifiProfile';

const Profile = ({ navigation }) => {
  return (
    <>
      <ScrollViewContainer>
        <Image
          source={require('../../assests/Image.png')}
          style={styles.avatar}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginVertical: 20,
          }}
        >
          <Image
            source={require('../../assests/Logs.png')}
            style={styles.avatarr}
          />
          <Header title="Specialization" fontSize={15} />
        </View>
        <TextinputField placeholder="Enter your specialization" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginVertical: 20,
          }}
        >
          <Image
            source={require('../../assests/Phone.png')}
            style={styles.avatarr}
          />
          <Header title="Phone Number" fontSize={15} />
        </View>
        <TextinputField placeholder="Enter your phone number" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginVertical: 20,
          }}
        >
          <Image
            source={require('../../assests/About.png')}
            style={styles.avatarr}
          />
          <Header title="About" fontSize={15} />
        </View>
        <TextinputField placeholder="Enter information about yourself" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginVertical: 20,
          }}
        >
          <Image
            source={require('../../assests/Logout.png')}
            style={styles.avatarr}
          />
          <Header title="Logout" fontSize={15} />
        </View>
        
        
      </ScrollViewContainer>
       <NavHomeAddNotifiProfile navigation={navigation} activeTab="Profile" />
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
  // Style mein:
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center', // ← darmiyan
    marginVertical: 20, // ← upar neeche thora bara
  },
  avatarr: {
    width: 60, // Image ka fix size
    height: 60,
    borderRadius: 30, // Gol Circle
    marginRight: 15, // Text aur Image ke darmiyan gap
    backgroundColor: '#eee', // Agar image na ho to grey color aye
  },
});
export default Profile;
