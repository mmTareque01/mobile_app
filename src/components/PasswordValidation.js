import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {LOGIN_CALL} from '../services/AuthRequests';
import {UserContext} from '../App';

let loginValidationschema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be ${min} characters`)
    .required('Password is required'),
});

const PasswordValidation = ({passwordValidationState, editState}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [passwordValidationModal, setPasswordValidationModal] =
    passwordValidationState;

  const [edit, setEdit] = editState;
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const showModal = () => setPasswordValidationModal(true);
  const hideModal = () => setPasswordValidationModal(false);

  const handleFormSubmit = formData => {
    setError('');
    setLoading(true);
    let data = {
      email: formData.email,
      password: formData.password,
    };
    LOGIN_CALL(data)
      .then(res => {
        setLoading(false);
        setError('');
        setEdit(true);
        setPasswordValidationModal(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={passwordValidationModal}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Text style={{marginBottom: 10}}>
            Please Enter you password to edit profile:
          </Text>
          <Formik
            validationSchema={loginValidationschema}
            initialValues={{
              email: loggedInUser.email,
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
                <TextInput
                  label="Password"
                  name="password"
                  value={values.password}
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  mode="outlined"
                  secureTextEntry={true}
                  error={errors.password && touched.password}
                  //   right={
                  //     <TextInput.Icon
                  //       name={showPassword ? 'eye-off' : 'eye'}
                  //       onPress={() => setShowPassword(!showPassword)}
                  //     />
                  //   }
                />

                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  loading={loading}>
                  Login
                </Button>
                <Text style={styles.errorText}>{error}</Text>
              </>
            )}
          </Formik>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFF',
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginTop: 5,
    fontSize: 12,
  },
});

export default PasswordValidation;
