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
import PasswordValidation from '../components/PasswordValidation';
import {BASE_URL} from '../services/apis';
import ImageUploadButtonSheet from '../components/ImageUploadButtonSheet';
import {UserContext} from '../App';
import HeaderWithLogo from '../components/HeaderWithLogo';
import theme from '../theme/theme';
import {UPDATE_MENTOR_PROFILE_PIC} from '../services/mentorRequests';

const MentorAbout = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [userData, setUserData] = React.useState({
    full_name: loggedInUser.name,
    phone_number: loggedInUser.phone,
    present_address: loggedInUser.present_address,
    city: loggedInUser.city,
    country: loggedInUser.country,
    permanent_address: loggedInUser.permanent_address,
    student_email: loggedInUser.student_email,
    bank_account: loggedInUser.bank_account,
    whatsapp_number: loggedInUser.whatsapp,
    facebook_url: loggedInUser.facebook,
    linkedIn_url: loggedInUser.linkedIn,
    instagram_url: loggedInUser.instagram,
    country_studying_working: loggedInUser.working_or_studying,
    study_institution: loggedInUser.institution_name,
    study_program: loggedInUser.studying_in,
    company_working: loggedInUser.working_for,
    company_working_position: loggedInUser.position_at_company,
    previous_education: loggedInUser.latest_certificate,
    awarded_scholarship: loggedInUser.pre_scholarship_info,
    extracurricular_activities: loggedInUser.extra_activities,
    community_group: loggedInUser.experience_with_students,
    know_abroad_inquiry: loggedInUser.about_us,
    comments: loggedInUser.comments,
    about_yourself: loggedInUser.about_yourself,
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
    {title: 'Full Name', name: 'full_name', defalutValue: loggedInUser.name},
    {
      title: 'Phone Number',
      name: 'phone_number',
      defalutValue: loggedInUser.phone,
    },
    {
      title: 'Your Present Address ',
      name: 'present_address',
      defalutValue: loggedInUser.present_address,
    },
    {
      title: 'City ',
      name: 'city',
      defalutValue: loggedInUser.city,
    },
    {
      title: 'Country ',
      name: 'country',
      defalutValue: loggedInUser.country,
    },
    {
      title: 'Your permanent Address ',
      name: 'permanent_address',
      defalutValue: loggedInUser.permanent_address,
    },
    {
      title: 'Student or Employee Email Id',
      name: 'student_email',
      defalutValue: loggedInUser.student_email,
    },
    {
      title: 'Bangladeshi bank account details',
      name: 'bank_account',
      defalutValue: loggedInUser.bank_account,
    },
    {
      title: 'Whats app number with dial code *',
      name: 'whatsapp_number',
      defalutValue: loggedInUser.whatsapp,
    },
    {
      title: 'Facebook Profile Links',
      name: 'facebook_url',
      defalutValue: loggedInUser.facebook,
    },
    {
      title: 'Linkedin Profile Links *',
      name: 'linkedIn_url',
      defalutValue: loggedInUser.linkedIn,
    },
    {
      title: 'Instagram Username *',
      name: 'instagram_url',
      defalutValue: loggedInUser.instagram,
    },
    {
      title: 'Country Studying or Working *',
      name: 'country_studying_working',
      defalutValue: loggedInUser.working_or_studying,
    },
    {
      title: 'Institution Studying or Studied ',
      name: 'study_institution',
      defalutValue: loggedInUser.institution_name,
    },
    {
      title: 'Program Studying/Studied ',
      name: 'study_program',
      defalutValue: loggedInUser.studying_in,
    },
    {
      title: 'Company Working for',
      name: 'company_working',
      defalutValue: loggedInUser.working_for,
    },
    {
      title: 'Position of working in your company',
      name: 'company_working_position',
      defalutValue: loggedInUser.position_at_company,
    },
    {
      title: 'Previous Completed Education',
      name: 'previous_education',
      defalutValue: loggedInUser.latest_certificate,
    },
    {
      title: 'Awarded any Scholarship ?',
      name: 'awarded_scholarship',
      defalutValue: loggedInUser.pre_scholarship_info,
    },
    {
      title: 'Extracurricular Activities',
      name: 'extracurricular_activities',
      defalutValue: loggedInUser.extra_activities,
    },
    {
      title: 'Involved with Any Community Group ?',
      name: 'community_group',
      defalutValue: loggedInUser.experience_with_students,
    },
    {
      title: 'Know about Abroad Inquiry ? *',
      name: 'know_abroad_inquiry',
      defalutValue: loggedInUser.about_us,
    },
    {
      title: 'Any Comment About Abroad Inquiry ? ',
      name: 'comments',
      defalutValue: loggedInUser.comments,
    },
    {
      title: 'About Yourself *',
      name: 'about_yourself',
      defalutValue: loggedInUser.about_yourself,
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
      console.log(formData);
      handleImageUpload(loggedInUser.id, formData);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
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
      handleImageUpload(loggedInUser.id, formData);
    });
  };

  const handleImageUpload = (mentorId, formData) => {
    UPDATE_MENTOR_PROFILE_PIC(mentorId, formData)
      .then(res => {
        const updatedUser = {...loggedInUser};
        updatedUser.profilePic = res.data.path;
        setLoggedInUser(updatedUser);
      })
      .catch(err => console.log(err.response.data.message));
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

export default MentorAbout;
