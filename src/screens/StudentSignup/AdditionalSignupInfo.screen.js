import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import mime from 'mime';
import ImageUploadButtonSheet from '../../components/ImageUploadButtonSheet';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Text,
  Button,
  TextInput,
  IconButton,
  Avatar,
  RadioButton,
} from 'react-native-paper';
import AuthHeader from '../../components/AuthHeader';
import {additionalInfoInputData} from './StudentSignup.data';
import theme from '../../theme/theme';
import {
  UPDATE_ALL_STUDENT_DATA_CALL,
  UPDATE_STUDENT_PROFILE_PIC,
} from '../../services/studentRequests';
import {UserContext} from '../../App';

let additionalInfoValidationschema = yup.object().shape({
  want_to_go: yup.string().required('This field is required'),
  want_to_study: yup.string().required('This field is required'),
  last_academic_qualification: yup.string().required('This field is required'),
  institution_name: yup.string().required('This field is required'),
  currently_live_in: yup.string().required('This field is required'),
  country_of_origin: yup.string().required('This field is required'),
});

const AdditionalSignupInfo = ({navigation, route}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [gender, setGender] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const bottomSheet = React.createRef();

  const handleFormSubmit = userData => {
    let data = {
      last_academic_qualification: userData.last_academic_qualification,
      last_academic_result: userData.last_academic_result,
      institution_name: userData.institution_name,
      want_to_go: userData.want_to_go,
      want_to_study: userData.want_to_study,
      english_proficiency: userData.english_proficiency,
      working_experience: userData.working_experience,
      extracurricular_activities: userData.extracurricular_activities,
      publications: userData.publications,
      currently_live_in: userData.currently_live_in,
      country_of_origin: userData.country_of_origin,
      community_work: userData.community_work,
      about_yourself: userData.about_yourself,
      gender: gender,
    };

    UPDATE_ALL_STUDENT_DATA_CALL(route.params.id, data)
      .then(res => {
        const userInfo = {...res.data[0], userStatus: 'student'};
        setLoggedInUser(userInfo);
      })
      .catch(err => {
        console.log(err, 68);
      });
  };

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

        handleImageUpload(route.params?.id, formData);
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
        handleImageUpload(route.params?.id, formData);
      })
      .catch(err => console.log(err));
  };

  const handleImageUpload = (id, formData) => {
    UPDATE_STUDENT_PROFILE_PIC(id, formData)
      .then(res => {})
      .catch(err => console.log(err.response));
  };

  return (
    <>
      <ImageUploadButtonSheet
        bottomSheet={bottomSheet}
        choosePhotoFromLibrary={choosePhotoFromLibrary}
        takePhotoFromCamera={takePhotoFromCamera}
      />
      <ScrollView>
        <View style={styles.wrapper}>
          <AuthHeader disableOptions />

          <Text
            style={{
              textAlign: 'justify',
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 15,
            }}>
            Dear aspirant, you can update your profile here so that Abroad
            Inquiry can easily guide you to apply for study abroad and Abroad
            Inquiry will notify you of the current offer & promotions related to
            your interest.
          </Text>

          <Formik
            validationSchema={additionalInfoValidationschema}
            initialValues={{
              last_academic_qualification: '',
              last_academic_result: '',
              institution_name: '',
              want_to_go: '',
              want_to_study: '',
              english_proficiency: '',
              working_experience: '',
              extracurricular_activities: '',
              publications: '',
              currently_live_in: '',
              country_of_origin: '',
              community_work: '',
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
                {additionalInfoInputData.map((data, idx) => (
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
                          <Text style={styles.radioButtonsLabel}>
                            {data.label}
                          </Text>

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
                          mode="outlined"
                          label={data.label}
                          value={values[data.name]}
                          onChangeText={handleChange(data.name)}
                          onBlur={handleBlur(data.name)}
                          style={styles.input}
                          error={errors[data.name] && touched[data.name]}
                          placeholder={data.placeHolder}
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
  wrapper: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
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
    paddingBottom: 10,
  },
  imageUpWrapper: {
    marginBottom: 20,
    marginTop: 10,
    position: 'relative',
    width: Dimensions.get('window').width / 1.2,
  },
  imageUpButton: {
    position: 'absolute',
    bottom: 0,
    left: 70,
    backgroundColor: theme.colors.primary,
  },
});

export default AdditionalSignupInfo;
