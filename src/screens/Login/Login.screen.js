import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, TextInput } from 'react-native-paper';
import { loginInputData } from './Login.data';
import theme from '../../theme/theme';
import AuthHeader from '../../components/AuthHeader';
import ErrorLabel from '../../components/ErrorLabel';
import DeveloperLabel from '../../components/DeveloperLabel';
import OtherAuthButtons from '../../components/OtherAuthButtons';
import { UserContext } from '../../App';
import { LOGIN_CALL } from '../../services/AuthRequests';
import { GET_STUDENT_INFO_CALL } from '../../services/studentRequests';
import { GET_MENTOR_INFO_CALL } from '../../services/mentorRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

let loginValidationschema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be ${min} characters`)
    .required('Password is required'),
});

const Login = ({ navigation }) => {
  const { user } = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleFormSubmit = formData => {
    setError('');
    setLoading(true);
    let data = {
      email: formData.email,
      password: formData.password,
    };

    LOGIN_CALL(data)
      .then(res => {
        let token = res.data.token;
        let userId = res.data.userId;
        let userStatus = res.data.userStatus;
        setLoading(false);
        setError('');
        AsyncStorage.setItem('@userToken', token);

        if (userStatus === 'student') {
          GET_STUDENT_INFO_CALL(token, userId)
            .then(result => {
              let userData = result.data[0];
              let userInfo = { ...userData, userStatus };

              setLoggedInUser(userInfo);
            })
            .catch(err => console.log(err.response));
        } else if (userStatus === 'mentor') {
          GET_MENTOR_INFO_CALL(userId)
            .then(result => {
              let userData = result.data;
              let userInfo = { ...userData, userStatus };
              setLoggedInUser(userInfo);
            })
            .catch(err => console.log(err.response));
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.wrapper}>
          <AuthHeader disableOptions={true} />
          {error ? <ErrorLabel title={error} /> : null}
          <Formik
            validationSchema={loginValidationschema}
            initialValues={{
              email: '',
              password: '',
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
                {loginInputData.map((data, idx) => (
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
                <Text>Forget Password?</Text>

                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  loading={loading}>
                  Login
                </Button>
              </>
            )}
          </Formik>

          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate('StudentSignupNavigator')}>
            Signup
          </Button>

          <Text
            style={{
              color: '#636E72',
              marginBottom: 15,
              marginTop: 20,
              fontSize: 12,
            }}>
            Continue with
          </Text>

          <OtherAuthButtons />
        </View>
      </ScrollView>
      {!keyboardStatus && <DeveloperLabel />}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '20%',
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
  errorText: {
    color: theme.colors.error,
    marginRight: 'auto',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default Login;
