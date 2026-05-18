import axios from 'axios';

const BASE_URL = 'http://192.168.54.190:8001';

// export const getPatientsFromDB = async patient_id => {
//   const response = await axios.get(`${BASE_URL}/patients/${patient_id}`);
//   return response.data;
// };

export const getPatientsFromDB = async hospitalId => {
  const response = await axios.get(`${BASE_URL}/all-patients/${hospitalId}`);
  return response.data;
};
// } catch (error) {
//   console.log('Network Error:', error);
//   return [];
// }
// };

// export const signupAPI = async ({ name, email, password }) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/signup`, {
//       name,
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     console.log('Signup Error:', error);
//     throw error; // ← zarori hai useMutation ke onError ke liye
//   }
// };

export const signupAPI = async ({ name, email, password, hospital_id }) => {
  console.log('=== SIGNUP CALLED ===');
  console.log('Data:', { name, email, password, hospital_id });

  const response = await axios.post(`${BASE_URL}/signup`, {
    name,
    email,
    password,
    hospital_id,
  });

  console.log('=== SUCCESS ===', response.data);
  return response.data;
};

export const getHospitals = async () => {
  // try {
  const response = await axios.get(`${BASE_URL}/all-hospitals`);
  console.log('App received data:', response.data); // Terminal mein check karne ke liye
  return response.data;
};

// export const loginAPI = async ({ email, password }) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/login`, {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     const detail = error.response?.data?.detail;

//     // Array hai toh string banao
//     if (Array.isArray(detail)) {
//       throw new Error(detail.map(d => d.msg).join('\n'));
//     }

//     throw new Error(detail || 'Network Error');
//   }
// };

// export const loginAPI = async ({ email, password }) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/login`, { email, password });
//     return response.data;
//   } catch (error) {
//     const detail = error.response?.data?.detail;
//     if (Array.isArray(detail)) {
//       throw new Error(detail.map(d => d.msg).join('\n'));
//     }
//     throw new Error(detail || 'Network Error');
//   }
// };

export const loginAPI = async ({ email, password, hospital_id }) => {
  console.log('=== Login CALLED ===');
  console.log('Data:', { email, password, hospital_id });

  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
    hospital_id,
  });
  console.log('=== SUCCESS ===', response.data);
  return response.data;
};

export const loginAdminAPI = async ({ email, password }) => {
  console.log('=== Login CALLED ===');
  console.log('Data:', { email, password });

  const response = await axios.post(`${BASE_URL}/login-admin`, {
    email,
    password,
  });
  console.log('=== SUCCESS ===', response.data);
  return response.data;
};

export const updateDoctor = async (doc_id, doctorData) => {
  const response = await axios.put(
    `${BASE_URL}/change-doctor/${doc_id}`,
    doctorData,
  );
  return response.data;
};


export const getLabResults = async (report_id) => {
  const response = await axios.get(`${BASE_URL}/lab-results/${report_id}`);
  return response.data;
};