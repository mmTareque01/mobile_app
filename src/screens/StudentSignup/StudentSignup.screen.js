import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import AuthHeader from '../../components/AuthHeader';
import ErrorLabel from '../../components/ErrorLabel';
import {Button, TextInput, Text, Checkbox} from 'react-native-paper';
import {signupInputData} from './StudentSignup.data';
import theme from '../../theme/theme';
import {STUDENT_SIGNUP_CALL} from '../../services/studentRequests';

let signupValidationschema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.number().required('Phone is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
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

const StudentSignup = ({navigation, route}) => {
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = fromData => {
    let data = {
      email: fromData.email,
      name: fromData.name,
      phone: fromData.phone,
      password: fromData.password,
    };

    setLoading(true);
    setError('');
    STUDENT_SIGNUP_CALL(data)
      .then(res => {
        setLoading(false);
        setError('');
        navigation.navigate('AdditionalSignupInfo', {
          id: res.data?.userId,
        });
      })
      .catch(err => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.wrapper}>
          <AuthHeader navigation={navigation} route={route} />

          {error ? <ErrorLabel title={error} /> : null}
          <Formik
            validationSchema={signupValidationschema}
            initialValues={{
              email: '',
              phone: '',
              name: '',
              password: '',
              confirmPassword: '',
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
                {signupInputData.map((data, idx) => (
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
                <View style={styles.checkbox}>
                  <Checkbox
                    color="#5BC236"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                      handleChange('agree', !checked);
                    }}
                  />
                  <Text>
                    I have read the privacy policy and terms {'\n'}and
                    conditions.
                  </Text>
                </View>

                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid || !checked}
                  loading={loading}>
                  Signup
                </Button>
              </>
            )}
          </Formik>
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => navigation.navigate('Login')}>
            Already Have an account?
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
    width: Dimensions.get('window').width / 1.3,
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    width: Dimensions.get('window').width / 1.3,
  },
  checkbox: {flexDirection: 'row', alignItems: 'center'},
  errorText: {
    color: theme.colors.error,
    marginRight: 'auto',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default StudentSignup;
