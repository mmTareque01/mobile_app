import axios from 'axios';
import {api} from './apis';

const configParams = {
  'Content-Type': 'application/json',
};

// Get user chat history
export const GET_USER_CHAT_HISTORY = data => {
  return axios.post(`${api.chat.getChatHistory}`, data, {
    headers: configParams,
  });
};

//Save chatting data
export const SAVE_CHATTING_DATA_CALL = data => {
  return axios.post(`${api.chat.saveChattingData}`, data, {
    headers: configParams,
  });
};

// Get chatting data
export const GET_CHATTING_DATA_CALL = chatId => {
  return axios.get(`${api.chat.getChattingData}/${chatId}`, {
    headers: configParams,
  });
};

// Create New Chat
export const CREATE_NEW_CHAT = data => {
  return axios.post(`${api.chat.createNewChat}`, data, {
    headers: configParams,
  });
};
