import axios from 'axios';
import {api} from './apis';

const configParams = {
  'Content-Type': 'application/json',
};

//Get all country name
export const GET_ALL_COUNTRY_NAME = mentorId => {
  return axios.get(`${api.countries.getCountryName}`, {
    headers: configParams,
  });
};

//Student get all appointments
export const GET_ALL_COUNTRY = () => {
  return axios.get(`${api.countries.getCountryDetails}`, {
    headers: configParams,
  });
};

//Get country info by giving an id
export const GET_ONE_COUNTRY_DETAILS = countryId => {
  return axios.get(`${api.countries.getContryInfo}/${countryId}`, {
    headers: configParams,
  });
};

// get all  mentor according to countirs
export const GET_MENTOR_ACCORDING_TO_COUNTRY = country_id => {
  return axios.get(
    `${api.countries.getMentorAccordingToCountry}/${country_id}`,
    {
      headers: configParams,
    },
  );
};
