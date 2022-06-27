import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Text,
  Button,
  Portal,
  Modal,
  TextInput,
  Snackbar,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../App';
import {BASE_URL} from '../services/apis';
import {
  ACCEPT_OR_DENY_APPOINTMENT,
  APPOINTMENT_DONE,
  GET_MENTOR_INFO_CALL,
} from '../services/mentorRequests';
import {GET_STUDENT_INFO_CALL} from '../services/studentRequests';

const AppointmentReqCard = ({
  navigation,
  appointment = appointment,
  booked = false,
  removeItem,
  setSnackbarVisible,
  setSnackbarData,
  student = false,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [modalInputText, setModalInputText] = React.useState('');
  const [userData, setUserData] = React.useState({});
  const [modalLabel, setModalLabel] = React.useState('');
  const [doneButton, setDoneButton] = React.useState(false);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  const showModal = (status, msg) => {
    if (status === 'done') {
      setDoneButton(true);
    } else {
      setDoneButton(false);
    }
    setModalLabel(msg);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
    setModalInputText('');
  };
  const {
    name = userData.name,
    id = 1,
    profilePic = `${BASE_URL}/${userData.profilePic}`,
  } = appointment;

  React.useEffect(() => {
    if (student) {
      GET_MENTOR_INFO_CALL(appointment.mentor_id)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => console.log(err));
    } else {
      GET_STUDENT_INFO_CALL('', appointment.student_id)
        .then(res => {
          setUserData(res.data[0]);
        })
        .catch(err => console.log(err));
    }
  }, []);

  // console.log(appointment);

  let handleAppointmentReq = data => {
    let bookingData = {
      appointment_id: data.appointment_id,
      confirm: true,
      reason: '',
    };

    ACCEPT_OR_DENY_APPOINTMENT(bookingData)
      .then(res => {
        removeItem(data);
        setSnackbarVisible(true);
        setSnackbarData(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  let handleCancelAppointment = data => {
    let cancelData = {
      appointment_id: data.appointment_id,
      confirm: false,
      reason: modalInputText,
    };

    console.log(cancelData);
    ACCEPT_OR_DENY_APPOINTMENT(cancelData)
      .then(res => {
        removeItem(data);
        setSnackbarVisible(true);
        setSnackbarData(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  let handleDoneAppointment = data => {
    let doneData = {
      feedback: modalInputText,
      appointment_id: data.appointment_id,
    };
    APPOINTMENT_DONE(doneData)
      .then(res => {
        console.log(res.data);
        removeItem(data);
        setSnackbarVisible(true);
        setSnackbarData(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // appointment_id: req.body.appointment_id,
  // confirm: req.body.confirm,

  return (
    <>
      {userData ? (
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => {
              student
                ? navigation.navigate('MentorProfile', {mentorId: userData.id})
                : navigation.navigate('StudentProfile', {
                    studentId: userData.id,
                  });
            }}>
            <Avatar.Image size={70} source={{uri: profilePic}} />
          </TouchableOpacity>

          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              {student
                ? `Appointment Request to ${name}`
                : booked
                ? `Appointment Booked with ${name}`
                : `${name} requested for an Appoinment`}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={styles.time}>
                <Icon name="calendar" size={25} style={{marginRight: 5}} />
                <Text>{appointment.appointment_date.replace('.', '-')}</Text>
              </View>
              <View style={styles.time}>
                <Icon name="clock-outline" size={25} style={{marginRight: 5}} />
                <Text>
                  {appointment.start_time.slice(0, 5)} -
                  {appointment.end_time.slice(0, 5)}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              {student ? (
                <View
                  style={{flexDirection: 'column', alignSelf: 'flex-start'}}>
                  {appointment.status === 'denied' && (
                    <Text style={{flex: 1}}>Reason: {appointment.reason}</Text>
                  )}
                  <Chip
                    mode="flat"
                    selectedColor={
                      appointment.status === 'denied'
                        ? 'red'
                        : appointment.status
                        ? 'green'
                        : '#F78C04'
                    }>
                    {appointment.status === 'denied'
                      ? 'Denied'
                      : appointment.status
                      ? 'Accepted'
                      : 'Pending'}
                  </Chip>
                </View>
              ) : booked ? (
                <>
                  <Button
                    mode="contained"
                    onPress={() => setVisible(true)}
                    contentStyle={{height: 30, backgroundColor: '#F53649'}}
                    labelStyle={{fontSize: 10}}
                    style={{marginRight: 10}}
                    onPress={() =>
                      showModal(
                        'cancel',
                        'Tell the reason behind your appointment cancelation.',
                      )
                    }>
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    contentStyle={{height: 30, backgroundColor: '#75B53C'}}
                    labelStyle={{fontSize: 10}}
                    style={{marginRight: 10}}
                    onPress={() => showModal('done', 'Share your feedback.')}>
                    Done
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    mode="contained"
                    onPress={() => handleAppointmentReq(appointment)}
                    contentStyle={{height: 30}}
                    labelStyle={{fontSize: 10}}
                    style={{marginRight: 10}}>
                    Accept
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() =>
                      showModal(
                        'cancel',
                        'Tell the reason behind your appointment cancelation.',
                      )
                    }
                    contentStyle={{height: 30}}
                    labelStyle={{fontSize: 10}}>
                    Decline
                  </Button>
                </>
              )}
            </View>
          </View>
        </View>
      ) : null}

      {/*-------------- Confirmation Modal --------------*/}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Text>{modalLabel}</Text>

          <TextInput
            multiline={true}
            value={modalInputText}
            mode="outlined"
            onChangeText={text => setModalInputText(text)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              width: '100%',
            }}>
            <Button mode="outlined" style={{width: '47%'}} onPress={hideModal}>
              Cancel
            </Button>
            {doneButton ? (
              <Button
                mode="contained"
                style={{width: '47%'}}
                disabled={!modalInputText}
                contentStyle={{backgroundColor: '#75B53C'}}
                onPress={() => {
                  handleDoneAppointment(appointment);
                  hideModal();
                }}>
                Confirm
              </Button>
            ) : (
              <Button
                mode="contained"
                style={{width: '47%'}}
                disabled={!modalInputText}
                contentStyle={{backgroundColor: '#F53649'}}
                onPress={() => {
                  handleCancelAppointment(appointment);
                  hideModal();
                }}>
                Confirm
              </Button>
            )}
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F9FA',
    marginBottom: 5,
  },
  flexRow: {},
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  modal: {
    backgroundColor: '#FFF',
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
  },
});

export default AppointmentReqCard;
