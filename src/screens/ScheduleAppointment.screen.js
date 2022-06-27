import React from 'react';
import { View, Text, Platform, StyleSheet, TextInput, Alert } from 'react-native';
import HeaderWithLogo from '../components/HeaderWithLogo';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton, Button } from 'react-native-paper';
import theme from '../theme/theme';
import AppointmentCard from '../components/AppointmentCard';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../App';
import {
  GET_PREVIOUS_ALL_SCHEDULES,
  POST_NEW_SCHEDULE_APPONTMENT,
} from '../services/mentorRequests';
import manageTime from '../utils/manageTime';
import { useIsFocused } from '@react-navigation/core';

const ScheduleAppointment = ({ navigation }) => {
  const { user } = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTimeStamp, setSelectedTimeStamp] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [from, setFrom] = React.useState(new Date());
  const [to, setTo] = React.useState(new Date());
  const [timeInput, setTimeInput] = React.useState('from');
  const [appointment, setAppointment] = React.useState([]);
  let todaysDate = new Date().toISOString().split('T')[0];
  const isFocused = useIsFocused();

  const onFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setFrom(currentDate);
  };
  const onToChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTo(currentDate);
  };
  const handleData = (data) => {
    let data_len = Object.keys(data).length;
    let final_data = [];
    for (let i = 0; i < data_len; i++) {
      let processed_data = {
        Schedule_id: data[i].Schedule_id,
        mentor_id: data[i].mentor_id,
        start_time: manageTime.getLocalTime(data[i].start_time),
        end_time: manageTime.getLocalTime(data[i].end_time),
        appointment_date: manageTime.getLocalDate(data[i].start_time),
      }
      final_data.push(processed_data);
    }
    return final_data;
  }

  React.useEffect(() => {
    // GET_PREVIOUS_ALL_SCHEDULES(loggedInUser.id)
    //   .then(res => {
    //     setAppointment(handleData(res.data));
    //   })
    //   .catch(err => console.log(err));
  }, []);


  const handleAddAppointment = () => {


  






    try {
      let from_date = manageTime.getScheduleTimeStamp(selectedTimeStamp.timestamp, from);
      let to_date = manageTime.getScheduleTimeStamp(selectedTimeStamp.timestamp, to);

      const data = {
        mentor_id: loggedInUser.id,
        appointment_starting_date: manageTime.getUTCDate(from_date),
        appointment_ending_date: manageTime.getUTCDate(to_date),
        start_time: from_date.toUTCString(),
        end_time: to_date.toUTCString(),
      };


      POST_NEW_SCHEDULE_APPONTMENT(data)
        .then(res => {
          let new_data = {
            mentor_id: loggedInUser.id,
            appointment_date: manageTime.getLocalDatefromLocalTimeStamp(from_date),
            start_time: manageTime.getLocalTimefromLocalTimeStamp(from_date),
            end_time: manageTime.getLocalTimefromLocalTimeStamp(to_date),
          }
          const newAppointments = [...appointment, new_data];
          setAppointment(newAppointments);
       

        })
        .catch(err => console.log(err.data));


    }
    catch (error) {
      console.log(error)
    }




 


  

  };

  const removeAppointment = appointmentId => {
    const filteredAppointments = appointment.filter(
      item => item.Schedule_id !== appointmentId,
    );
    setAppointment(filteredAppointments);
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      'SET APPOINTMENT AVAILABLITY',
      `You have selected ${selectedDate} from ${from.getHours() + ':' + from.getMinutes()
      } to ${to.getHours() + ':' + to.getMinutes()}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleAddAppointment() },
      ],
    );

  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScrollView>
        <Calendar
          // Enable the option to swipe between months. Default = false
          // minDate={todaysDate}
          minDate={todaysDate}
          current
          enableSwipeMonths={true}
          onDayPress={day => {
            setSelectedDate(day.dateString);
            setSelectedTimeStamp(day)
            
           
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: theme.colors.primary,
            },
          }}
        />

        <View style={styles.wrapper}>
          <View style={styles.timePickerWrapper}>
            <Text style={styles.timePickerText}>From</Text>
            <TextInput
              style={styles.input}
              defaultValue={
                ('0' + from.getHours()).slice(-2) +
                ':' +
                ('0' + from.getMinutes()).slice(-2)
              }
            />
            <IconButton
              icon="plus"
              size={26}
              disabled={selectedDate ? false : true}
              onPress={() => {
                setTimeInput('from');
                setShow(true);
              }}
              animated={true}
              color={'#FFF'}
              style={{
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>

          <View style={styles.timePickerWrapper}>
            <Text style={styles.timePickerText}>To</Text>
            <TextInput
              style={styles.input}
              defaultValue={
                ('0' + to.getHours()).slice(-2) +
                ':' +
                ('0' + to.getMinutes()).slice(-2)
              }
            />
            <IconButton
              icon="plus"
              size={26}
              disabled={selectedDate ? false : true}
              onPress={() => {
                setTimeInput('to');
                setShow(true);
              }}
              animated={true}
              color={'#FFF'}
              style={{
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>

          {/* {selectedDate && (
            <Text style={{marginTop: 5}}>
              You have selected{' '}
              <Text style={{fontWeight: 'bold'}}>{selectedDate}</Text> from{' '}
              <Text style={{fontWeight: 'bold'}}>
                {from.getHours() + ':' + from.getMinutes()}
              </Text>{' '}
              to{' '}
              <Text style={{fontWeight: 'bold'}}>
                {to.getHours() + ':' + to.getMinutes()}
              </Text>{' '}
              as you appointment availablility.
            </Text>
          )} */}

          <Button
            mode="outlined"
            disabled={selectedDate ? false : true}
            style={{ marginTop: 15, marginBottom: 15 }}
            onPress={createTwoButtonAlert}>
            Schedule Appointment
          </Button>

          {appointment.length ? (
            <>
              <Text style={{ marginBottom: 15, fontWeight: 'bold' }}>
                Available Appointments:
              </Text>
              {appointment.map((item, idx) => (
                <AppointmentCard
                  item={item}
                  key={idx}
                  removeAppointment={removeAppointment}
                />
              ))}
            </>
          ) : null}
        </View>
      </ScrollView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="clock"
          minimumDate={todaysDate}
          onChange={
            timeInput === 'from'
              ? onFromChange
              : timeInput === 'to' && onToChange
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { padding: 25 },
  timePickerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    // padding: 20,
  },
  input: {
    backgroundColor: '#FFFF',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  timePickerText: {
    width: 40,
  },
});

export default ScheduleAppointment;