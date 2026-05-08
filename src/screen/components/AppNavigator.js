import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ✅ Sahi Rasta (Correct Paths)
import AdminScreen from '../AdminScreen/AdminScreen';
import HistoryScreen from '../HistoryScreen/HistoryScreen';
import SignupScreen from '../SignupScreen/Signup';
import LoginScreen from '../LoginScreen/LoginStyle';
import AddPatient from '../AddPatient/AddPatient';
import PatientList from '../PatientList/PatientList';
import AddConsultationNotes from '../AddCunsultationNotes/AddCunsultationNotes';
import ViewNotes from '../VisitNotes/VisitNotes';
import ViewPatient from '../ViewPatient/ViewPatient';
import ShowHospital from '../ShowHospital/ShowHospital';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowHospital"
        component={ShowHospital}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen
        name="AddConsultationNotes"
        component={AddConsultationNotes}
      />
      <Stack.Screen name="ViewNotes" component={ViewNotes} />
      <Stack.Screen
        name="ViewPatient"
        component={ViewPatient}
        initialParams={{ mpi: null }} // ← yeh add karo
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
