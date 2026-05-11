import axios from 'axios';

const BASE_URL = 'http://192.168.22.190:8001';

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
  try {
    const response = await axios.get(`${BASE_URL}/patients/${mpi}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addPatientToDB = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/patients`, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getVisitNotes = async ({ docId, pid }) => {
  try {
    const url = `${BASE_URL}/all-visit-notes${docId}/${pid}`;
    console.log('Fetching notes URL:', url); // ← add karo
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Notes error:', error.message); // ← add karo
    handleError(error);
  }
};
export const addVisitNote = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/visit-note-add`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const searchLabTest = async search_name => {
  try {
    const response = await axios.get(
      `${BASE_URL}/lab_test_search?search_name=${search_name}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getVisitNoteDetail = async note_id => {
  const res = await fetch(`${BASE_URL}/visit-note${note_id}`);
  if (!res.ok) throw new Error('Note not found');
  return res.json();
};

export const getLabReports = async note_id => {
  const res = await fetch(`${BASE_URL}/lab-reports-by-${note_id}`);
  if (!res.ok) throw new Error('Lab reports not found');
  return res.json();
};

export const submitClaim = async payload => {
  const res = await fetch(`${BASE_URL}/submit-claims`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Claim submit failed');
  return res.json();
};
