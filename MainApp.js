// import React from 'react';
// import { SafeAreaView } from 'react-native';

// // Aapki Login Screen ko import kar rahe hain
// import LoginScreen from './src/screen/LoginScreen/LoginStyle';
// import SignupScreen from './src/screen/SignupScreen/Signup';
// import AddPatient from './src/screen/AddPatient/AddPatient';
// import PatientList from './src/screen/PatientList/PatientList';
// import ClaimList from './src/screen/ClaimList/Claimlist';
// import DashBoard from './src/screen/DashBoard/DashBoard';
// import Routee from './src/screen/AllRoutes/Routee';
// import AddServer from './src/screen/AddServer/AddServer';
// import AddRouterDeatil from './src/screen/AddRouteDetail/AddRouteDetail';

// const MainApp = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* Yellow screen hata kar Login Screen laga di */}
//       {/* <LoginScreen /> */}
//       <SignupScreen />
//       {/* <AddPatient /> */}
//       {/* <PatientList></PatientList> */}
//       {/* <ClaimList></ClaimList> */}
//       {/* <DashBoard></DashBoard> */}
//       {/* <AddServer></AddServer> */}
//       {/* <AddRouterDeatil></AddRouterDeatil> */}
//       {/* <Routee></Routee> */}
//     </SafeAreaView>
//   );
// };

// export default MainApp;

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screen/components/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Global variable for DOC_ID (set dynamically from login)
// global.DOC_ID will be set when user logs in

const MainApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default MainApp;
