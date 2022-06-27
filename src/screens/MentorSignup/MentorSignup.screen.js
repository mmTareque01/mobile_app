import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, TextInput} from 'react-native-paper';
import {mentorSignupInputData} from './MentorSignup.data';
import theme from '../../theme/theme';
import AuthHeader from '../../components/AuthHeader';
import ErrorLabel from '../../components/ErrorLabel';
import {MENTOR_SIGNUP_1} from '../../services/mentorRequests';

let signupValidationschema = yup.object().shape({
  full_name: yup.string().required('Name is required'),
  phone_number: yup.string().required('Phone is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be ${min} characters`)
    .required('Password is required'),
  confirm_password: yup
    .string()
    .min(6)
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Confirm Password Required'),
});

const MentorSignup = ({navigation, route}) => {
  const [text, setText] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = formData => {
    let data = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone_number,
      password: formData.password,
    };
    console.log(data);

    setLoading(true);
    MENTOR_SIGNUP_1(data)
      .then(res => {
        setLoading(false);
        navigation.navigate('MentorSignupBasicInfo', {
          mentor_id: res.data?.id,
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
          <AuthHeader navigation={navigation} route={route} />
          <Text
            style={{
              textAlign: 'justify',
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 15,
            }}>
            Dear applicant, we will review your application. If we think, you
            are qualified to work with us, then you will be selected as a
            mentor.
          </Text>

          {error ? <ErrorLabel title={error} /> : null}
          <Formik
            validationSchema={signupValidationschema}
            initialValues={{
              full_name: '',
              email: '',
              phone_number: '',
              password: '',
              confirm_password: '',
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
                {mentorSignupInputData.map((data, idx) => (
                  <View key={idx}>
                    <TextInput
                      name={data.name}
                      label={data.label}
                      style={styles.input}
                      onChangeText={handleChange(data.name)}
                      mode="outlined"
                      onBlur={handleBlur(data.name)}
                      error={errors[data.name] && touched[data.name]}
                      value={values[data.name]}
                      secureTextEntry={data.secured}
                    />
                    {errors[data.name] && touched[data.name] && (
                      <Text style={styles.errorText}>{errors[data.name]}</Text>
                    )}
                  </View>
                ))}
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid}
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
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    width: Dimensions.get('window').width / 1.2,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
    width: Dimensions.get('window').width / 1.2,
  },
  errorText: {
    color: theme.colors.error,
    marginRight: 'auto',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default MentorSignup;
