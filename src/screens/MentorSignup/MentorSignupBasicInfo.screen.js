import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  TextInput,
  Text,
  Button,
  Title,
  RadioButton,
  Avatar,
  IconButton,
} from 'react-native-paper';
import mime from 'mime';
import ImagePicker from 'react-native-image-crop-picker';
import {basicInfoInputData} from './MentorSignup.data';
import ImageUploadButtonSheet from '../../components/ImageUploadButtonSheet';
import theme from '../../theme/theme';
import ErrorLabel from '../../components/ErrorLabel';
import AuthHeader from '../../components/AuthHeader';
import {
  MENTOR_SIGNUP_2,
  UPDATE_MENTOR_PROFILE_PIC,
} from '../../services/mentorRequests';

let basicInfoValidationschema = yup.object().shape({
  present_address: yup.string().required('Present Address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  permanent_address: yup.string().required('Permanent Address is required'),
  student_email: yup
    .string()
    .required('Student or Employee Email Id is required'),
  whatsapp_number: yup.string().required('WhatsApp is required'),
  facebook_url: yup.string().required('Facebook Url required'),
  linkedIn_url: yup.string().required('LinkedIn Url required'),
});

const MentorSignupBasicInfo = ({navigation, route}) => {
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [gender, setGender] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const bottomSheet = React.createRef();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        bottomSheet.current.snapTo(1);
        setImage(image.path);
        const formData = new FormData();
        formData.append('profile', {
          name: new Date() + '_profile',
          uri: image.path,
          type: mime.getType(image.path),
        });
        console.log(formData);
        handleImageUpload(route.params?.mentor_id, formData);
      })
      .catch(err => console.log(err));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        bottomSheet.current.snapTo(1);
        setImage(image.path);
        const formData = new FormData();
        formData.append('profile', {
          name: new Date() + '_profile',
          uri: image.path,
          type: mime.getType(image.path),
        });
        handleImageUpload(route.params?.mentor_id, formData);
      })
      .catch(err => console.log(err));
  };

  const handleImageUpload = (mentorId, formData) => {
    UPDATE_MENTOR_PROFILE_PIC(mentorId, formData)
      .then(res => {})
      .catch(err => console.log(err));
  };

  const handleFormSubmit = formData => {
    const data = {
      ...formData,
      gender: gender,
      mentor_id: route.params?.mentor_id,
    };
    MENTOR_SIGNUP_2(data)
      .then(res => {
        setLoading(false);
        navigation.navigate('MentorSignupProfessionalInfo', {
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
      <ImageUploadButtonSheet
        bottomSheet={bottomSheet}
        choosePhotoFromLibrary={choosePhotoFromLibrary}
        takePhotoFromCamera={takePhotoFromCamera}
      />
      <ScrollView>
        <View style={styles.wrapperr}>
          <AuthHeader navigation={navigation} route={route} disableOptions />
          {error ? <ErrorLabel title={error} /> : null}
          <Title style={{marginBottom: 10}}>Basic Info : </Title>

          <Formik
            validationSchema={basicInfoValidationschema}
            initialValues={{
              present_address: '',
              city: '',
              country: '',
              permanent_address: '',
              student_email: '',
              bank_account: '',
              whatsapp_number: '',
              facebook_url: '',
              linkedIn_url: '',
              instagram_url: '',
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
                {basicInfoInputData.map((data, idx) => (
                  <View key={idx}>
                    {data.type === 'radioButton' ? (
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
                                  gender === item ? 'checked' : 'unchecked'
                                }
                                onPress={() => setGender(item)}
                              />
                              <Text>{item}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ) : data.type === 'imageUpload' ? (
                      <>
                        <View style={styles.imageUpWrapper}>
                          <Text style={{marginBottom: 15}}>{data.label}</Text>

                          <Avatar.Image
                            size={90}
                            source={{
                              uri: image
                                ? image
                                : `https://i.ibb.co/8YS9Cn6/img.jpg`,
                            }}
                          />
                          <IconButton
                            icon="plus"
                            color={'#FFFF'}
                            size={20}
                            style={styles.imageUpButton}
                            onPress={() => bottomSheet.current.snapTo(0)}
                          />
                        </View>
                      </>
                    ) : (
                      <>
                        <TextInput
                          name={data.name}
                          label={data.label}
                          style={styles.input}
                          onChangeText={handleChange(data.name)}
                          mode="outlined"
                          onBlur={handleBlur(data.name)}
                          error={errors[data.name] && touched[data.name]}
                          value={values[data.name]}
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

                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid || gender === null || image === null}
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
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
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
  radioButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonsLabel: {
    fontSize: 16,
    textAlign: 'left',
  },
  imageUpWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  imageUpButton: {
    position: 'absolute',
    bottom: 0,
    left: 70,
    backgroundColor: theme.colors.primary,
  },
});

export default MentorSignupBasicInfo;
