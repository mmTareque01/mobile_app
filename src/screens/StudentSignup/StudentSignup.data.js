export const signupInputData = [

  {
    label: 'Name',
    name: 'name',
    placeHolder: '',
  },
  {
    label: 'Email',
    name: 'email',
    placeHolder: '',
  },
  {
    label: 'Phone',
    name: 'phone',
    placeHolder: '',
  },
  {
    label: 'Password',
    name: 'password',
    placeHolder: '',
    secured: true,
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeHolder: '',
    secured: true,
  },
];

export const additionalInfoInputData = [
  {
    type: 'radioButton',
    options: ['Male', 'Female', 'Other'],
    label: 'Select a Gender *',
    name: 'gender',
    placeHolder: '',
  },
  {
    type: 'imageUpload',
    label: 'Upload your Picture *',
    name: 'profile_pic',
  },
  {
    label: 'Where you want to study abroad? *',
    name: 'want_to_go',
    placeHolder: 'Ex: Canada',
  },
  {
    label: 'Which program you want to apply? *',
    name: 'want_to_study',
    placeHolder: 'Ex: MBA',
  },
  {
    label: 'Last academic qualification and result *',
    name: 'last_academic_qualification',
    placeHolder: 'Ex: Bsc in Computer Science, CGPA:3.50',
  },
  {
    label: 'Institution Name *',
    name: 'institution_name',
    placeHolder: 'Ex: Dhaka University',
  },
  {
    label:
      'IELTS/TOEFL/SAT/GRE/GMAT/Other with Result?If no, write your plan about it.',
    name: 'english_proficiency',
    placeHolder: 'Ex: IELTS (7.5) / planning to take it next month',
  },
  {
    label: 'Any job experience? if yes, write something about it.',
    name: 'working_experience',
    placeHolder: 'Ex: Instructor at DU (2020-21) ',
  },
  {
    label:
      'Any extracurricular activities? if yes, write a little bit about it.',
    name: 'extracurricular_activities',
    placeHolder: 'Within 500 words',
  },
  {
    label: 'Any publication? if yes, write something.',
    name: 'publications',
    placeHolder: 'Within 500 words',
  },
  {
    label: 'Currently live in? *',
    name: 'currently_live_in',
    placeHolder: '',
  },
  {
    label: 'Country of origin? *',
    name: 'country_of_origin',
    placeHolder: '',
  },
  {
    label:
      'Involved with any community to help others? if yes, write about the community.',
    name: 'community_work',
    placeHolder: '',
  },
  {
    label: 'About yourself',
    name: 'about_yourself',
    placeHolder: 'Within 500 words',
  },
];
