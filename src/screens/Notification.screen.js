import {useIsFocused} from '@react-navigation/core';
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import {UserContext} from '../App';
import AppointmentReqCard from '../components/AppointmentReqCard';
import {GET_ALL_APPOINTMENT_REQUESTS} from '../services/mentorRequests';
import {GET_ALL_STUDENT_APPOINTMENTS} from '../services/studentRequests';
import theme from '../theme/theme';
import HeaderWithLogo from './../components/HeaderWithLogo';
import ScreenLabel from './../components/ScreenLabel';
import manageTime from '../utils/manageTime';

const Notification = ({navigation}) => {
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const {userStatus} = loggedInUser;
  const [appointmentReqs, setAppointmentReqs] = React.useState([]);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState('');
  const isFocused = useIsFocused();
  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);

  const onDismissSnackBar = () => setSnackbarVisible(false);


  const handleData = data => {
    let data_len = Object.keys(data).length;
    let final_data = [];
    for (let i = 0; i < data_len; i++) {
      let processed_data = {
        appointment_id: data[i].appointment_id,
        mentor_id: data[i].mentor_id,
        student_id: data[i].student_id,
        start_time: manageTime.getLocalTime(data[i].start_time),
        end_time: manageTime.getLocalTime(data[i].end_time),
        appointment_date: manageTime.getLocalDate(data[i].start_time),
        status: data[i].status
      }

      if(processed_data.status == "denied"){
        processed_data.reason = data[i].reason;
      }

      final_data.push(processed_data)
    }
    return final_data;
  }




  React.useEffect(() => {
    setLoading(true);
    if (userStatus === 'mentor') {
      GET_ALL_APPOINTMENT_REQUESTS(loggedInUser.id)
        .then(res => {
          setLoading(false);
          setAppointmentReqs(handleData(res.data));
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else if (userStatus === 'student') {
      GET_ALL_STUDENT_APPOINTMENTS(loggedInUser.id)
        .then(res => {
          setLoading(false);
          setAppointmentReqs(handleData(res.data));
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [isFocused]);

  const removeItem = data => {
    let filteredReq = appointmentReqs.filter(
      (item, idx) => item.appointment_id !== data.appointment_id,
    );
    setAppointmentReqs(filteredReq);
  };

  return (
    <View style={{flex: 1}}>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="Notifications" />
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size={30}
            animating={true}
            style={{marginTop: '10%'}}
            color={theme.colors.primary}
          />
        ) : (
          <View style={styles.wrapper}>
            {appointmentReqs.length ? (
              appointmentReqs.map((appointment, idx) => (
                <AppointmentReqCard
                  removeItem={removeItem}
                  navigation={navigation}
                  appointment={appointment}
                  setSnackbarVisible={setSnackbarVisible}
                  setSnackbarData={setSnackbarData}
                  key={idx}
                  student={userStatus === 'student' && true}
                />
              ))
            ) : (
              <Text style={{marginTop: 10}}>Empty</Text>
            )}
          </View>
        )}
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {snackbarData}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
});

export default Notification;
