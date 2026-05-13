import axios from 'axios';

const BASE_URL = 'http://192.168.246.190:8001';

// Error helper
const handleError = error => {
  const detail = error.response?.data?.detail;
  const message =
    typeof detail === 'string'
      ? detail
      : Array.isArray(detail)
      ? detail.map(d => d.msg || JSON.stringify(d)).join('\n')
      : error.message;
  throw new Error(message);
};
export const getPatientDetail = async mpi => {
  const response = await axios.get(`${BASE_URL}/patients/${mpi}`);
  return response.data;
};

export const addPatientToDB = async data => {
  const response = await axios.post(`${BASE_URL}/patients`, data);
  return response.data;
};

export const getVisitNotes = async ({ docId, pid }) => {
  const response = await axios.get(
    `${BASE_URL}/all-visit-notes${docId}/${pid}`,
  );
  return response.data;
};

export const addVisitNote = async data => {
  const response = await axios.post(`${BASE_URL}/visit-note-add`, data);

  return response.data;
};

export const searchLabTest = async search_name => {
  const response = await axios.get(
    `${BASE_URL}/lab_test_search?search_name=${search_name}`,
  );
  return response.data;
};

export const getVisitNoteDetail = async note_id => {
  const res = await axios.get(`${BASE_URL}/visit-note${note_id}`);
  return res.data;
};

export const getLabReports = async note_id => {
  const res = await axios.get(`${BASE_URL}/lab-reports-by-${note_id}`);
  return res.data;
};

export const submitClaim = async payload => {
  const response = await axios.post(`${BASE_URL}/submit-claims`, payload, {});
  return response.data;
};

export const changeConfig = async data => {
  try {
    const response = await axios.post(
      `${BASE_URL}/change-config-status`,
      data,
      {},
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const sentConfig = async data => {
  const response = await axios.post(`${BASE_URL}/sent-config-to-engine`, data);
  return response.data;
};

export const addHospital = async (name) => {
  const response = await axios.post(`${BASE_URL}/add-hospital?name=${name}`);
  return response.data;
};
export const allHospital = async () => {
  const response = await axios.get(`${BASE_URL}/all-hospitals`);
  return response.data;
};
export const configHistory = async () => {
  const response = await axios.get(`${BASE_URL}/config-history`);
  return response.data;
};
export const sentToEngine = async () => {
  const response = await axios.get(`${BASE_URL}/csent-config-to-engine`);
  return response.data;
};