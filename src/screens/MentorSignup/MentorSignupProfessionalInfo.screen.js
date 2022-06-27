import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  TextInput,
  Text,
  Button,
  Title,
  RadioButton,
  Checkbox,
} from 'react-native-paper';
import theme from '../../theme/theme';
import AuthHeader from '../../components/AuthHeader';
import ErrorLabel from '../../components/ErrorLabel';
import DropDown from 'react-native-paper-dropdown';
import {
  mentorProfessionalInputData,
  serviceProfessionInputData,
  studentProfessionInputData,
} from './MentorSignup.data';
import {GET_ALL_COUNTRY_NAME} from '../../services/countryRequests';
import {MENTOR_SIGNUP_3} from '../../services/mentorRequests';

let professionalInfoValidationschema = yup.object().shape({
  // study_institution: yup.string().required('This is required'),
  // study_program: yup.string().required('This is required'),
  // company_working: yup.string().required('This is required'),
  // company_working_position: yup.string().required('This is required'),
  country_studying_working: yup
    .string()
    .required('Country Studying or Working is required'),
  know_abroad_inquiry: yup
    .string()
    .required('Know about Abroad Inquiry is required'),
  about_yourself: yup.string().required('About Yourself is required'),
});

const MentorSignupProfessionalInfo = ({navigation, route}) => {
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] =
    React.useState(false);
  const [countryData, setCountryData] = React.useState('');
  const [countries, setCountries] = React.useState([]);
  const [radioButton, setRadioButton] = React.useState({
    profession: null,
    intention_working_other_firm: null,
    working_consultancy_currently: null,
  });
  const [checked, setChecked] = React.useState({
    privacy_policy: false,
    conditions: false,
  });

  React.useEffect(() => {
    GET_ALL_COUNTRY_NAME()
      .then(res => {
        let data = res.data.map((item, idx) => {
          return {
            label: item.country_name,
            value: item.country_id,
          };
        });
        setCountries(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleFormSubmit = formData => {
    const data = {
      ...formData,
      intention_working_other_firm: radioButton['intention_working_other_firm'],
      working_consultancy_currently:
        radioButton['working_consultancy_currently'],
      profession: radioButton['profession'],
      mentor_id: route.params?.mentor_id,
      responsible_for: countryData
        .split('')
        .filter(i => i !== ',')
        .map(x => parseInt(x, 10)),
    };

    setLoading(true);

    MENTOR_SIGNUP_3(data)
      .then(res => {
        setLoading(false);
        navigation.navigate('MentorSignupRequiredDocs', {
          mentor_id: res.data.mentor_id,
        });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.wrapperr}>
          <AuthHeader navigation={navigation} route={route} disableOptions />
          <Title style={{marginBottom: 10}}>Professional Info : </Title>
          {error ? <ErrorLabel title={error} /> : null}

          <Formik
            validationSchema={professionalInfoValidationschema}
            initialValues={{
              study_institution: '',
              study_program: '',
              company_working: '',
              company_working_position: '',
              country_studying_working: '',
              previous_education: '',
              awarded_scholarship: '',
              extracurricular_activities: '',
              community_group: '',
              working_consultancy_currently: '',
              intention_working_other_firm: '',
              know_abroad_inquiry: '',
              comments: '',
              about_yourself: '',
            }}
            validateOnMount={true}
            onSubmit={values => handleFormSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <>
                <Text style={styles.radioButtonsLabel}>Profession : * </Text>
                {['Student', 'Service'].map((item, idx) => (
                  <View key={idx} style={styles.radioButtonWrap}>
                    <RadioButton
                      color={theme.colors.primary}
                      value={item}
                      status={
                        radioButton['profession'] === item
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        setRadioButton({
                          ...radioButton,
                          profession: item,
                        })
                      }
                    />
                    <Text>{item}</Text>
                  </View>
                ))}
                <View style={{height: 10}} />
                {radioButton.profession === 'Service' ? (
                  <>
                    {serviceProfessionInputData.map((data, idx) => (
                      <View key={idx}>
                        <TextInput
                          mode="outlined"
                          label={data.label}
                          value={values[data.name]}
                          onChangeText={handleChange(data.name)}
                          onBlur={handleBlur(data.name)}
                          style={styles.input}
                          placeholder={data.placeholder}
                          multiline
                        />
                        {errors[data.name] && touched[data.name] && (
                          <Text style={styles.errorText}>
                            {errors[data.name]}
                          </Text>
                        )}
                      </View>
                    ))}
                  </>
                ) : (
                  radioButton.profession === 'Student' && (
                    <>
                      {studentProfessionInputData.map((data, idx) => (
                        <View key={idx}>
                          <TextInput
                            mode="outlined"
                            label={data.label}
                            value={values[data.name]}
                            onChangeText={handleChange(data.name)}
                            onBlur={handleBlur(data.name)}
                            style={styles.input}
                            placeholder={data.placeholder}
                            multiline
                          />
                          {errors[data.name] && touched[data.name] && (
                            <Text style={styles.errorText}>
                              {errors[data.name]}
                            </Text>
                          )}
                        </View>
                      ))}
                    </>
                  )
                )}

                {mentorProfessionalInputData.map((data, idx) => (
                  <View key={idx}>
                    {data.type === 'dropdown' ? (
                      <View style={{height: 85}}>
                        <DropDown
                          label={data.label}
                          mode={'outlined'}
                          visible={showMultiSelectDropDown}
                          showDropDown={() => setShowMultiSelectDropDown(true)}
                          onDismiss={() => setShowMultiSelectDropDown(false)}
                          value={countryData}
                          setValue={setCountryData}
                          list={countries.length ? countries : []}
                          multiSelect
                        />
                      </View>
                    ) : data.type === 'radioButton' ? (
                      <View style={styles.input}>
                        <Text style={styles.radioButtonsLabel}>
                          {data.label}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          {data.options.map((item, idx) => (
                            <View key={idx} style={styles.radioButtonWrap}>
                              <RadioButton
                                color={theme.colors.primary}
                                value={item}
                                status={
                                  radioButton[data.name] === item
                                    ? 'checked'
                                    : 'unchecked'
                                }
                                onPress={() =>
                                  setRadioButton({
                                    ...radioButton,
                                    [data.name]: item,
                                  })
                                }
                              />
                              <Text>{item}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ) : (
                      <>
                        <TextInput
                          mode="outlined"
                          label={data.label}
                          value={values[data.name]}
                          onChangeText={handleChange(data.name)}
                          onBlur={handleBlur(data.name)}
                          style={styles.input}
                          placeholder={data.placeholder}
                          multiline
                        />
                        {errors[data.name] && touched[data.name] && (
                          <Text style={styles.errorText}>
                            {errors[data.name]}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}

                {[
                  {
                    title:
                      'Are you aware of our terms of use and privacy policy? *',
                    name: 'privacy_policy',
                  },
                  {
                    title:
                      'Do you agree to work with our conditions and other working policies? *',
                    name: 'conditions',
                  },
                ].map((item, idx) => (
                  <View style={styles.checkbox} key={idx}>
                    <Checkbox
                      color="#5BC236"
                      status={checked[item.name] ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked({
                          ...checked,
                          [item.name]: !checked[item.name],
                        });
                      }}
                    />
                    <Text style={{width: 300}}>{item.title}</Text>
                  </View>
                ))}

                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={
                    !isValid ||
                    radioButton['intention_working_other_firm'] === null ||
                    radioButton['working_consultancy_currently'] === null ||
                    radioButton['profession'] === null ||
                    checked['privacy_policy'] === false ||
                    checked['conditions'] === false ||
                    !countryData.length
                  }
                  loading={loading}>
                  Continue
                </Button>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperr: {
    // alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    marginBottom: 20,
    width: 330,
    // fontSize: 15,
  },
  button: {
    width: 330,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginRight: 'auto',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
  radioButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonsLabel: {
    fontSize: 16,
    textAlign: 'left',
  },
  checkbox: {flexDirection: 'row', alignItems: 'center'},
});

export default MentorSignupProfessionalInfo;
