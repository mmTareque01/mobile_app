import {api, BASE_URL} from './apis';
import axios from 'axios';

const configParams = {
  'Content-Type': 'application/json',
};

const formDataConfig = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

// Mentor signup requests

export const MENTOR_SIGNUP_1 = data => {
  return axios.post(`${api.mentor.signup1}`, data, {
    headers: configParams,
  });
};
export const MENTOR_SIGNUP_2 = data => {
  return axios.post(`${api.mentor.signup2}`, data, {
    headers: configParams,
  });
};
export const MENTOR_SIGNUP_3 = data => {
  return axios.post(`${api.mentor.signup3}`, data, {
    headers: configParams,
  });
};

export const MENTOR_SIGNUP_4 = async (mentorId, data) => {
  let returnData;
  try {
    returnData = await axios.post(`${api.mentor.signup4}/${mentorId}`, data, {
      headers: formDataConfig,
    });
  } catch (error) {
    returnData = await error;
  }

  return returnData;
};

// Update Profile Pic

export const UPDATE_MENTOR_PROFILE_PIC = async (mentorId, data) => {
  let returnData;
  try {
    returnData = await axios.post(
      `${api.mentor.uploadProfilePic}/${mentorId}`,
      data,
      {headers: formDataConfig},
    );
  } catch (error) {
    returnData = await error;
  }

  return returnData;
};

//Get Info Requests

export const GET_MENTOR_INFO_CALL = mentorId => {
  return axios.get(`${api.mentor.getInfo}/${mentorId}`, {
    headers: configParams,
  });
};

// Get all pervious schedules
export const GET_PREVIOUS_ALL_SCHEDULES = mentorId => {
  return axios.get(`${api.mentor.getAllschedules}/${mentorId}`, {
    headers: configParams,
  });
};

//Post new schedules
export const POST_NEW_SCHEDULE_APPONTMENT = data => {
  return axios.post(`${api.mentor.scheduleAppointment}`, data, {
    headers: configParams,
  });
};

// Get all approved appointments
export const GET_ALL_APPROVED_APPOINTMENTS = mentorId => {
  return axios.get(`${api.mentor.getAllApprovedAppointments}/${mentorId}`, {
    headers: configParams,
  });
};

//Accept or deny Appointment
export const ACCEPT_OR_DENY_APPOINTMENT = data => {
  return axios.post(`${api.mentor.acceptOrDenyAppointment}`, data, {
    headers: configParams,
  });
};

//Appointment done
export const APPOINTMENT_DONE = data => {
  return axios.post(`${api.mentor.appointmentDone}`, data, {
    headers: configParams,
  });
};

// Get All Appointment Requests for Mentor
export const GET_ALL_APPOINTMENT_REQUESTS = mentorId => {
  return axios.get(`${api.mentor.getAllAppointmentRequest}/${mentorId}`, {
    headers: configParams,
  });
};
