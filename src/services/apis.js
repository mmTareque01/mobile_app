export const BASE_URL = `http://192.168.0.100:4000`;

export const api = {
  //Auth
  auth: {
    login: `${BASE_URL}/login`,
  },

  student: {
    signup: `${BASE_URL}/auth/signup`,
    getInfo: `${BASE_URL}/student/get_all_data`,
    updateStudentInfo: `${BASE_URL}/student/update_all_data`,
    showAllMentors: `${BASE_URL}/student/get_all_mentors`,

    updateProfilePic: `${BASE_URL}/student/profile`,

    updatePassword: `${BASE_URL}/student/update_password`,

    getMentorAppointmentSlots: `${BASE_URL}/student/get_appointment_time_slot`,
    requestAppointment: `${BASE_URL}/student/apply_for_appointment`,
    getAllApprovedAppointments: `${BASE_URL}/student/get_all_approved_appointments`,
    getAllAppointments: `${BASE_URL}/student/get_all_appointments`,
  },
  mentor: {
    signup1: `${BASE_URL}/mentor/signup_page1`,
    signup2: `${BASE_URL}/mentor/signup_page2`,
    signup3: `${BASE_URL}/mentor/signup_page3`,
    signup4: `${BASE_URL}/mentor/signup_page4`,
    uploadProfilePic: `${BASE_URL}/mentor/upload_profile_pic`,
    getInfo: `${BASE_URL}/mentor/get_all_data`,
    createTempMentorData: `${BASE_URL}/mentor/create_mentor`,
    updateMentorTemp: `${BASE_URL}/mentor/temp_update_mentor`,
    scheduleAppointment: `${BASE_URL}/mentor/schedule_appointment`,
    getAllschedules: `${BASE_URL}/mentor/get_all_schedules`,

    getAllAppointmentRequest: `${BASE_URL}/mentor/get_all_pending_appointments`,

    acceptOrDenyAppointment: `${BASE_URL}/mentor/accept_or_deny_appointment`,

    getAllApprovedAppointments: `${BASE_URL}/mentor/get_all_approved_appointments`,

    appointmentDone: `${BASE_URL}/mentor/complete_appointment`,
  },
  chat: {
    getChatHistory: `${BASE_URL}/chat/get_chat_history`,
    saveChattingData: `${BASE_URL}/chat/save_chating_data`,
    getChattingData: `${BASE_URL}/chat/get_chatting_data`,
    createNewChat: `${BASE_URL}/chat/check_chat_history`,
  },

  countries: {
    getCountryName: `${BASE_URL}/country/get_country_name`,
    getCountryDetails: `${BASE_URL}/country/get_all_countries`,
    getContryInfo: `${BASE_URL}/country/get_country_info`,
    getMentorAccordingToCountry: `${BASE_URL}/country/get_mentor_from_country`,
  },
};
