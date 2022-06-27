import {useIsFocused} from '@react-navigation/core';
import React from 'react';
import {View, ScrollView} from 'react-native';
import {ActivityIndicator, Snackbar, Text} from 'react-native-paper';
import {UserContext} from '../App';
import AppointmentReqCard from '../components/AppointmentReqCard';
import HeaderWithLogo from '../components/HeaderWithLogo';
import {GET_ALL_APPROVED_APPOINTMENTS} from '../services/mentorRequests';
import theme from '../theme/theme';
import manageTime from '../utils/manageTime';

const Appointments = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState('');
  const isFocused = useIsFocused();

  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const handleData = (data) =>{
    let data_len = Object.keys(data).length;
    let final_data = [];
    for(let i = 0; i < data_len; i++){
      let processed_data = {
        appointment_id: data[i].appointment_id,
        mentor_id: data[i].mentor_id,
        student_id: data[i].student_id,
        start_time: manageTime.getLocalTime(data[i].start_time),
        end_time: manageTime.getLocalTime(data[i].end_time),
        appointment_date: manageTime.getLocalDate(data[i].start_time),
        status: data[i].status
      }
      final_data.push(processed_data)
    }
 
    return final_data;
  }







  React.useEffect(() => {
    setLoading(true);
    if (loggedInUser.userStatus === 'mentor') {
      GET_ALL_APPROVED_APPOINTMENTS(loggedInUser.id)
        .then(res => {

          setAppointments(handleData(res.data));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [isFocused]);

  const removeItem = data => {
    let filteredReq = appointments.filter(
      (item, idx) => item.appointment_id !== data.appointment_id,
    );
    setAppointments(filteredReq);
  };
  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScrollView>
        <Text style={{padding: 20, fontSize: 16, fontWeight: 'bold'}}>
          Appointments :
        </Text>
        {loading ? (
          <ActivityIndicator
            size={30}
            animating={true}
            style={{marginTop: '10%'}}
            color={theme.colors.primary}
          />
        ) : appointments.length ? (
          appointments.map((appointment, idx) => (
            <AppointmentReqCard
              booked={true}
              navigation={navigation}
              key={idx}
              appointment={appointment}
              removeItem={removeItem}
              setSnackbarVisible={setSnackbarVisible}
              setSnackbarData={setSnackbarData}
            />
          ))
        ) : (
          <Text style={{marginLeft: 20}}>No Appointments Available.</Text>
        )}
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        {snackbarData}
      </Snackbar>
    </>
  );
};

export default Appointments;