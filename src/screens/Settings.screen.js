import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput, Portal, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
// import {
//   UPDATE_ALL_STUDENT_DATA_CALL,
//   UPDATE_PASSWORD_CALL,
// } from '../services/requests.service';
import * as yup from 'yup';
import {Formik} from 'formik';
import PasswordValidation from '../components/PasswordValidation';
import ErrorLabel from '../components/ErrorLabel';
import {UserContext} from '../App';
import HeaderWithLogo from '../components/HeaderWithLogo';
import ScreenLabel from '../components/ScreenLabel';
import {
  UPDATE_ALL_STUDENT_DATA_CALL,
  UPDATE_STUDENT_PASSWORD_CALL,
} from '../services/studentRequests';

const inputData = [
  {
    title: 'Email',
    // defalutValue: loggedInUser.email,
    name: 'email',
  },
  {
    title: 'Phone',
    // defalutValue: loggedInUser.phone,
    name: 'phone',
  },
  {
    title: 'Password',
    // defalutValue: loggedInUser.password,
    name: 'password',
    secureTextEntry: true,
  },
];

let settingValidationschema = yup.object().shape({
  phone: yup.number(),
  email: yup.string().email('Please enter a valid email'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be ${min} characters`),

  confirmPassword: yup
    .string()
    .min(6)
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both password need to be the same')
        .required(),
    }),
});

const Settings = ({navigation}) => {
  const [edit, setEdit] = React.useState(false);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const {email, phone, password} = loggedInUser;
  const [userData, setUserData] = React.useState({
    email: email,
    phone: phone,
    password: password,
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [passwordValidationModal, setPasswordValidationModal] =
    React.useState(false);

  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => setModal(false);

  const handleData = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handleFormSubmit = formData => {
    setError('');
    setLoading(true);
    let data = {
      email: formData.email ? formData.email : loggedInUser.email,
      phone: formData.phone ? formData.phone : loggedInUser.phone,
    };
    UPDATE_ALL_STUDENT_DATA_CALL(loggedInUser.id, data)
      .then(res => {
        setLoading(false);
        setError('');
        // console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        setError(err.response.data.message);
      });

    if (formData.password) {
      let passwordData = {password: formData.password};
      UPDATE_PASSWORD_CALL(loggedInUser.id, passwordData)
        .then(res => {
          setLoading(false);
          setError('');
          console.log(res);
        })
        .catch(err => {
          setLoading(false);
          setError(err.response.data.message);
        });
    }
  };

  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="Settings" />

      <Formik
        validationSchema={settingValidationschema}
        initialValues={{
          email: email,
          phone: phone,
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
            <ScrollView>
              <View style={styles.wrapper}>
                <View style={styles.innerWrapper}>
                  <View style={styles.formWrapper}>
                    {!edit && (
                      <Button
                        icon={({size, color}) => (
                          <Icon name="edit" size={18} color="#04223F" />
                        )}
                        style={styles.editButton}
                        onPress={() => setPasswordValidationModal(true)}>
                        Edit
                      </Button>
                    )}

                    {inputData.map((data, idx) => (
                      <View key={idx}>
                        <TextInput
                          key={idx}
                          label={data.title}
                          value={values[data.name]}
                          // value={values[data.name]}
                          name={data.name}
                          secureTextEntry={data.secureTextEntry}
                          onBlur={handleBlur(data.name)}
                          editable={edit ? true : false}
                          onChangeText={handleChange(data.name)}
                          error={errors[data.name] && touched[data.name]}
                          style={{
                            backgroundColor: `${edit ? '#FFFF' : '#F8F9FA'}`,
                            marginBottom: 6,
                            width: 300,
                          }}
                          underlineColor={`${edit ? '' : '#F8F9FA'}`}
                        />

                        {errors[data.name] && touched[data.name] && (
                          <Text style={styles.errorText}>
                            {errors[data.name]}
                          </Text>
                        )}
                      </View>
                    ))}

                    {edit ? (
                      <>
                        <TextInput
                          label="Confirm Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onBlur={handleBlur('confirmPassword')}
                          onChangeText={handleChange('confirmPassword')}
                          secureTextEntry={true}
                          editable={edit ? true : false}
                          // secureTextEntry={true}
                          style={{
                            backgroundColor: `${edit ? '#FFFF' : '#F8F9FA'}`,
                            marginBottom: 6,
                            width: 300,
                          }}
                          underlineColor={`${edit ? '' : '#F8F9FA'}`}
                        />

                        {errors.confirmPassword && touched.confirmPassword && (
                          <Text style={styles.errorText}>
                            {errors.confirmPassword}
                          </Text>
                        )}

                        <Button
                          mode="contained"
                          onPress={showModal}
                          style={{marginTop: 10}}
                          disabled={!isValid}
                          loading={loading}>
                          Save
                        </Button>
                      </>
                    ) : null}
                  </View>
                </View>
              </View>
            </ScrollView>

            <Portal>
              <Modal
                visible={modal}
                onDismiss={hideModal}
                contentContainerStyle={styles.modal}>
                <Text>Are you sure you want to change your profile?</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 20,
                    width: '90%',
                  }}>
                  <Button
                    mode="outlined"
                    style={{width: 110}}
                    onPress={() => {
                      // setEdit(false);
                      hideModal();
                    }}>
                    No
                  </Button>
                  <Button
                    mode="contained"
                    style={{width: 110}}
                    disabled={!isValid}
                    loading={loading}
                    onPress={() => {
                      handleSubmit();
                      setEdit(false);
                      hideModal();
                    }}>
                    Yes
                  </Button>
                </View>
              </Modal>
            </Portal>
          </>
        )}
      </Formik>
      <PasswordValidation
        passwordValidationState={[
          passwordValidationModal,
          setPasswordValidationModal,
        ]}
        editState={[edit, setEdit]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 20},
  innerWrapper: {
    alignItems: 'center',
  },
  editButton: {
    marginBottom: 15,
    marginLeft: 'auto',
    width: 120,
  },
  formWrapper: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginRight: 'auto',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
  },
});

export default Settings;
