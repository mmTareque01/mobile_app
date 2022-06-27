import {api, BASE_URL} from './apis';
import axios from 'axios';

const configParams = {
  'Content-Type': 'application/json',
};

const formDataConfig = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

// Signup Requests

export const STUDENT_SIGNUP_CALL = data => {
  return axios.post(api.student.signup, data, {headers: configParams});
};

//Update student data
export const UPDATE_ALL_STUDENT_DATA_CALL = (studentId, data) => {
  return axios.put(`${api.student.updateStudentInfo}/${studentId}`, data, {
    headers: configParams,
  });
};

//Update Password
export const UPDATE_STUDENT_PASSWORD_CALL = (studentId, data) => {
  return axios.put(`${api.student.updatePassword}/${studentId}`, data, {
    headers: configParams,
  });
};

// Get Info Requests

export const GET_STUDENT_INFO_CALL = (token, studentId) => {
  return axios.get(`${api.student.getInfo}/${studentId}`);
};

// Update Profile Pic

export const UPDATE_STUDENT_PROFILE_PIC = async (studentId, data) => {
  let returnData;
  try {
    returnData = await axios.post(
      `${api.student.updateProfilePic}/${studentId}`,
      data,
      {headers: formDataConfig},
    );
  } catch (error) {
    returnData = await error;
  }

  return returnData;
};

// Get all Mentor
export const GET_ALL_MENTORS_CALL = () => {
  return axios.get(api.student.showAllMentors, {headers: configParams});
};

// Get Mentor Available Appointment Slots
export const GET_MENTOR_AVAILABLE_SLOTS = data => {
  return axios.post(`${api.student.getMentorAppointmentSlots}`, data, {
    headers: configParams,
  });
};

// Request for Appointment
export const REQUEST_APPOINTMENT = data => {
  return axios.post(`${api.student.requestAppointment}`, data, {
    headers: configParams,
  });
};

//Student get all appointments
export const GET_ALL_STUDENT_APPOINTMENTS = studentId => {
  return axios.get(`${api.student.getAllAppointments}/${studentId}`, {
    headers: configParams,
  });
};
