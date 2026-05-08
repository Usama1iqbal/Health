import React from 'react';

import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Container from '../components/Container';
const ShowHospital = ({ navigation }) => {
  return (
    <>
      <ScrollViewContainer>
        <Header title="Hospital" fontSize={35} />
        <Container
          name="Name"
          id={5}
          onPress={() => navigation.navigate('')}
        />
      </ScrollViewContainer>
    </>
  );
};
export default ShowHospital;
