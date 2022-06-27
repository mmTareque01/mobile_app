export const mentorSignupInputData = [
  {
    label: 'Full Name *',
    name: 'full_name',
    placeholder: 'Ex: Abu Musa',
  },
  {
    label: 'Email Address *',
    name: 'email',
    placeholder: 'Ex: abu_musa@gmail.com',
  },
  {
    label: 'Phone Number *',
    name: 'phone_number',
    placeholder: '+8801XXXXXXXXXXX',
  },
  {
    label: 'Password *',
    name: 'password',
    placeholder: 'Ex: At least 6 charecters',
    secured: true,
  },
  {
    label: 'Confirm Password *',
    name: 'confirm_password',
    placeholder: 'Ex: At least 6 charecters',
    secured: true,
  },
];

export const basicInfoInputData = [
  {
    type: 'radioButton',
    options: ['Male', 'Female', 'Other'],
    label: 'Select a Gender *',
    name: 'gender',
  },
  {
    type: 'imageUpload',
    label: 'Upload your Picture *',
    name: 'profile_pic',
  },
  {
    label: 'Your Present Address *',
    name: 'present_address',
    placeholder: '',
  },
  {
    label: 'City *',
    name: 'city',
    placeholder: '',
  },
  {
    label: 'Country *',
    name: 'country',
    placeholder: '',
  },
  {
    label: 'Your permanent Address *',
    name: 'permanent_address',
    placeholder: '',
  },
  {
    label: 'Student or Employee Email Id*',
    name: 'student_email',
    placeholder: 'Ex: a.musa@student.hhs.nl *',
  },
  {
    label: 'Bangladeshi bank account details',
    name: 'bank_account',
    placeholder:
      'Ex: Bank Name, Branch Name, Routing Number, A/C Name, A/C Number etc.',
  },
  {
    label: 'Whats app number with dial code *',
    name: 'whatsapp_number',
    placeholder: '',
  },
  {
    label: 'Facebook Profile Links *',
    name: 'facebook_url',
    placeholder: 'http://facebook.com/abu.musa',
  },
  {
    label: 'Linkedin Profile Links *',
    name: 'linkedIn_url',
    placeholder: 'http://linkedin.com/abu.musa',
  },
  {
    label: 'Instagram Username ',
    name: 'instagram_url',
    placeholder: '@abu_musa',
  },
];

export const mentorProfessionalInputData = [
  {
    type: 'dropdown',
    options: [],
    label: 'Available For *',
    name: 'responsible_for',
    placeholder: '',
  },
  {
    label: 'Country Studying or Working *',
    name: 'country_studying_working',
    placeholder: '',
  },
  {
    label: 'Previous Completed Education',
    name: 'previous_education',
    placeholder: '',
  },
  {
    label: 'Awarded any Scholarship ?',
    name: 'awarded_scholarship',
    placeholder: 'If yes, then which scholarship ?',
  },
  {
    label: 'Extracurricular Activities',
    name: 'extracurricular_activities',
    placeholder:
      'If yes, please tell us the name of ECA and activities in short? Perhaps you are involved with any student association or NGO. If so, then please describe your responsibility details in short?',
  },
  {
    label: 'Involved with Any Community Group ?',
    name: 'community_group',
    placeholder:
      'Involved with any community group for helping students for free or are you a higher study blogger? If yes, then write about it in short with possible links and proof.',
  },
  {
    type: 'radioButton',
    options: ['Yes', 'No'],
    label: 'Working with any student consultancy firm currently? *',
    name: 'working_consultancy_currently',
  },
  {
    type: 'radioButton',
    options: ['Yes', 'No'],
    label:
      'Intention to work with any other student consultancy firm in the future while working with Abroad Inquiry? *',
    name: 'intention_working_other_firm',
  },
  {
    label: 'Know about Abroad Inquiry ? *',
    name: 'know_abroad_inquiry',
    placeholder: 'Short answer',
  },
  {
    label: 'Any Comment About Abroad Inquiry ? ',
    name: 'comments',
    placeholder: 'Short answer',
  },
  {
    label: 'About Yourself *',
    name: 'about_yourself',
    placeholder: 'We would like to show this information to our aspirants',
  },
];

export const studentProfessionInputData = [
  {
    label: 'Institution Studying or Studied *',
    name: 'study_institution',
    placeholder: '',
  },
  {
    label: 'Program Studying/Studied *',
    name: 'study_program',
    placeholder: '',
  },
];
export const serviceProfessionInputData = [
  {
    label: 'Company Working for *',
    name: 'company_working',
    placeholder: '',
  },
  {
    label: 'Position of working in your company *',
    name: 'company_working_position',
    placeholder: '',
  },
];
