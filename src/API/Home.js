import axios from 'axios';

const BASE_URL = 'http://192.168.22.190:8001';

export const getPatientsFromDB = async () => {
  // try {
  const response = await axios.get(`${BASE_URL}/patients`);
  console.log('App received data:', response.data); // Terminal mein check karne ke liye
  return response.data;
  // } catch (error) {
  //   console.log('Network Error:', error);
  //   return [];
  // }
};

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

export const signupAPI = async ({ name, email, password }) => {
  console.log('=== SIGNUP CALLED ===');
  console.log('Data:', { name, email, password });

  const response = await axios.post(`${BASE_URL}/signup`, {
    name,
    email,
    password,
  });

  console.log('=== SUCCESS ===', response.data);
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

export const loginAPI = async ({ email, password }) => {
  console.log('=== Login CALLED ===');
  console.log('Data:', { email, password });

  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  console.log('=== SUCCESS ===', response.data);
  return response.data;
};
