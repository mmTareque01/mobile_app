import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Button,
  Text,
  TextInput,
  IconButton,
  Portal,
  Modal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import mime from 'mime';
import ImageUploadButtonSheet from '../components/ImageUploadButtonSheet';
import PasswordValidation from '../components/PasswordValidation';
import {BASE_URL} from '../services/apis';
import {UserContext} from '../App';
import HeaderWithLogo from '../components/HeaderWithLogo';
import theme from '../theme/theme';
import {
  UPDATE_ALL_STUDENT_DATA_CALL,
  UPDATE_STUDENT_PROFILE_PIC,
} from '../services/studentRequests';

const StudentAbout = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [userData, setUserData] = React.useState({
    last_academic_result: loggedInUser.last_academic_result,
    last_academic_qualification: loggedInUser.last_academic_qualification,
    english_proficiency: loggedInUser.english_proficiency,
    institution_name: loggedInUser.institution_name,
    want_to_study: loggedInUser.want_to_study,
    want_to_go: loggedInUser.want_to_go,
    working_experience: loggedInUser.working_experience,
    extracurricular_activities: loggedInUser.extracurricular_activities,
    publications: loggedInUser.publications,
    currently_live_in: loggedInUser.currently_live_in,
    country_of_origin: loggedInUser.country_of_origin,
    community_work: loggedInUser.community_work,
    about_yourself: loggedInUser.about_yourself,
    gender: loggedInUser.gender,
  });
  const [edit, setEdit] = React.useState(false);

  const [image, setImage] = React.useState(
    `${BASE_URL}/${loggedInUser.profilePic}`,
  );
  const [modal, setModal] = React.useState(false);
  const [passwordValidationModal, setPasswordValidationModal] =
    React.useState(false);

  const bottomSheet = React.createRef();

  const inputData = [
    {
      title: 'Last Academic Qualification',
      defalutValue: loggedInUser.last_academic_qualification,
      name: 'last_academic_qualification',
    },
    {
      title: 'Last Academic Result',
      defalutValue: loggedInUser.last_academic_result,
      name: 'last_academic_result',
    },
    {
      title: 'Institution Name',
      defalutValue: loggedInUser.institution_name,
      name: 'institution_name',
    },
    {
      title: 'Where do you want to study abroad?',
      defalutValue: loggedInUser.want_to_go,
      name: 'want_to_go',
    },
    {
      title: 'Which program do you want to apply to?',
      defalutValue: loggedInUser.want_to_study,
      name: 'want_to_study',
    },
    {
      title:
        'IELTS/TOEFL/SAT/GRE/GMAT/Other with Result?If no, write your plan about it.',
      defalutValue: loggedInUser.english_proficiency,
      name: 'english_proficiency',
    },
    {
      title: 'Any job experience? if yes, write something about it.',
      defalutValue: loggedInUser.working_experience,
      name: 'working_experience',
    },
    {
      title:
        'Any extracurricular activities? if yes, write a little bit about it.',
      defalutValue: loggedInUser.extracurricular_activitiese,
      name: 'extracurricular_activities',
    },
    {
      title: 'Any publication? if yes, write something.',
      defalutValue: loggedInUser.publications,
      name: 'publications',
    },
    {
      title: 'Currently live in?',
      defalutValue: loggedInUser.currently_live_in,
      name: 'currently_live_in',
    },
    {
      title: 'Country of origin?',
      defalutValue: loggedInUser.country_of_origin,
      name: 'country_of_origin',
    },
    {
      title:
        'Involved with any community to help others? if yes, write about the community.',
      defalutValue: loggedInUser.community_work,
      name: 'community_work',
    },
    {
      title: 'About yourself.',
      defalutValue: loggedInUser.about_yourself,
      name: 'about_yourself',
    },
  ];

  const handleData = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => setModal(false);

  const handleSubmit = () => {
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
      gender: userData.gender,
    };
    // console.log({data});
    UPDATE_ALL_STUDENT_DATA_CALL(loggedInUser.id, data)
      .then(res => {
        // setError('');
        console.log('working');
        // console.log(res.data);
        setLoggedInUser(res.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      bottomSheet.current.snapTo(1);
      setImage(image.path);
      const formData = new FormData();
      formData.append('profile', {
        name: new Date() + '_profile',
        uri: image.path,
        type: mime.getType(image.path),
      });

      UPDATE_PROFILE_PIC(loggedInUser.id, formData)
        .then(res => {
          const updatedUser = {...loggedInUser};
          updatedUser.profilePic = res.data.path;
          setLoggedInUser(updatedUser);
        })
        .catch(err => console.log(err.response.data.message));
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      bottomSheet.current.snapTo(1);
      console.log(image);
      setImage(image.path);
      const formData = new FormData();
      formData.append('profile', {
        name: new Date() + '_profile',
        uri: image.path,
        type: mime.getType(image.path),
      });
      UPDATE_STUDENT_PROFILE_PIC(loggedInUser.id, formData)
        .then(res => {
          const updatedUser = {...loggedInUser};
          updatedUser.profilePic = res.data.path;
          setLoggedInUser(updatedUser);
        })
        .catch(err => console.log(err.response.data.message));
    });
  };

  return (
    <>
      <ImageUploadButtonSheet
        bottomSheet={bottomSheet}
        choosePhotoFromLibrary={choosePhotoFromLibrary}
        takePhotoFromCamera={takePhotoFromCamera}
      />
      <HeaderWithLogo navigation={navigation} />
      <ScrollView>
        <View style={styles.topSection}>
          {edit ? (
            <Button
              icon={({size, color}) => (
                <Icon name="cancel" size={25} color="#FFF" />
              )}
              mode="contained"
              style={styles.editButton}
              onPress={() => {
                setEdit(false);
              }}>
              Cancel
            </Button>
          ) : (
            <Button
              icon={({size, color}) => (
                <Icon name="edit" size={25} color="#FFF" />
              )}
              mode="contained"
              style={styles.editButton}
              onPress={() => setPasswordValidationModal(true)}>
              {/* onPress={() => setEdit(true)}> */}
              Edit
            </Button>
          )}

          <View style={{position: 'relative'}}>
            {loggedInUser.profilePic ? (
              <Avatar.Image size={100} source={{uri: image}} />
            ) : (
              <Avatar.Text
                size={100}
                label={loggedInUser.name[0]}
                color={theme.colors.primary}
                style={{backgroundColor: '#F8F8F8'}}
              />
            )}

            <IconButton
              icon="camera"
              color={'#FFF'}
              size={25}
              onPress={() => bottomSheet.current.snapTo(0)}
              style={{position: 'absolute', right: -20, bottom: -15}}
            />
          </View>
          <Text style={{color: '#FFFF', fontSize: 23, fontWeight: 'bold'}}>
            {loggedInUser.name}
          </Text>
          <Text style={{color: '#FFFF', fontSize: 15}}>
            {loggedInUser.phone}
          </Text>
        </View>

        <View style={styles.formWrapper}>
          {inputData.map((data, idx) => (
            <TextInput
              label={data.title}
              value={userData[data.name]}
              onChangeText={text => handleData(data.name, text)}
              editable={edit ? true : false}
              style={{
                backgroundColor: `${edit ? '#FFFF' : '#F2F2F2'}`,
                marginBottom: 6,
              }}
              underlineColor={`${edit ? '' : '#F2F2F2'}`}
              key={idx}
            />
          ))}
          {edit ? (
            <Button
              mode="contained"
              onPress={() => showModal()}
              style={{marginTop: 10}}>
              Save
            </Button>
          ) : null}
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
                hideModal();
              }}>
              No
            </Button>
            <Button
              mode="contained"
              style={{width: 110}}
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
  wrapper: {},
  topSection: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 22,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  formWrapper: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },

  modal: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
  },
});

export default StudentAbout;
