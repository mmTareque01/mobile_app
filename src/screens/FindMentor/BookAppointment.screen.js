import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Avatar, Button, Chip, Snackbar} from 'react-native-paper';
import {UserContext} from '../../App';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import {BASE_URL} from '../../services/apis';
import {
  GET_MENTOR_AVAILABLE_SLOTS,
  REQUEST_APPOINTMENT,
} from '../../services/studentRequests';
import theme from '../../theme/theme';
import makingTimeSlot from '../../utils/makingTimeSlot';
import manageTime from '../../utils/manageTime';


const BookAppointment = ({navigation, route}) => {
  let todaysDate = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = React.useState(null);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [selectedSlot, setSelectedSlot] = React.useState({});
  const [availableSlots, setAvailableSlots] = React.useState([]);
  const {id, profilePic, name, country} = route.params;
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  let formatedGMT = new Date()
    .toTimeString()
    .split(' ')[1]
    .slice(3, 8)
    .replace(/(\d{2})/, '$1:');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setSelectedSlot({});
    setVisible(false);
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      'SET APPOINTMENT AVAILABLITY',
      `You have selected ${selectedDate} from ${
        from.getHours() + ':' + from.getMinutes()
      } to ${to.getHours() + ':' + to.getMinutes()}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => 5},
      ],
    );

  const handleAppointmentSlots = date => {
    setLoading(true);
    let selectedDate = `${date.day}.${date.month}.${date.year}`;
    let currentTime = new Date()
      .toLocaleTimeString()
      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
    let currentDate = new Date().toISOString().split('T')[0];

    let data = {
      mentor_id: id,
      dates: manageTime.getUTCDate(new Date(manageTime.makeGMTFormatTime(date))),
    };


    // console.log(manageTime.isTodaysDate(date))


    GET_MENTOR_AVAILABLE_SLOTS(data)
      .then(res => {
   
        let time_slot = makingTimeSlot(res.data, date)

        // console.log(time_slot)
        // makingTimeSlot(res.data, date)
     

        let datas = time_slot.map((item, idx) => {
          return {
            ...item,
            id: idx,
          };
        });
     
        setAvailableSlots(datas);
        setSelectedDate(date.dateString);
        setLoading(false);



      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });



  };

  const bookAppointmentReq = () => {
    let bookingData = {
      mentor_id: id,
      student_id: loggedInUser.id,
      start_time: manageTime.toUTC(selectedSlot.start_time),
      end_time: manageTime.toUTC(selectedSlot.end_time),
      appointment_date: manageTime.getUTCDate(new Date(selectedSlot.start_time))
    };


    REQUEST_APPOINTMENT(bookingData)
      .then(res => {
        let remainingSlots = availableSlots.filter(
          item => item.id !== selectedSlot.id,
        );
        setAvailableSlots(remainingSlots);

        setVisible(true);
      })
      .catch(err => {
        console.log(err);
      });
  };



  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScrollView>
        <View style={styles.headerWrapper}>
          <>
            {profilePic ? (
              <Avatar.Image
                size={100}
                source={{uri: `${BASE_URL}/${profilePic}`}}
                style={{marginTop: 20, marginBottom: 10}}
              />
            ) : (
              <Avatar.Text
                size={100}
                label={mentorData.name[0]}
                style={{marginTop: 20, marginBottom: 10}}
              />
            )}
          </>

          <Text style={{paddingBottom: 5, fontSize: 16, fontWeight: 'bold'}}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 5,
            }}>
            {/* <Image
              style={{width: 26, height: 14}}
              source={require('../assets/images/nl-flag.png')}
            /> */}
            <Text style={{fontSize: 12, marginLeft: 5}}>{country}</Text>
          </View>
          {/* <Text style={{paddingBottom: 5}}>University of Hague</Text> */}
        </View>
        <Calendar
          minDate={todaysDate}
          current
          enableSwipeMonths={true}
          onDayPress={day => {
            // console.log('selected day', day);
            setAvailableSlots([]);
            setSelectedSlot({});
            handleAppointmentSlots(day);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: theme.colors.primary,
            },
          }}
        />

        {selectedDate &&
          (availableSlots.length ? (
            <>
              <Text style={{paddingLeft: 20, paddingTop: 15}}>
                Available Slots:
              </Text>
              <View style={styles.slotWrapper}>
                {availableSlots.map((slot, idx) => (
                  <Chip
                    mode="flat"
                    key={idx}
                    style={{width: '33.33%', marginBottom: 5}}
                    // textStyle={{fontSize: 12}}
                    icon="clock"
                    selected={slot.id === selectedSlot.id}
                    selectedColor={theme.colors.primary}
                    onPress={() => setSelectedSlot(slot)}>
                    {manageTime.getLocalTime(slot.start_time)}-{manageTime.getLocalTime(slot.end_time)}
                  </Chip>
                ))}
              </View>
            </>
          ) : (
            <Text style={{paddingLeft: 20, paddingTop: 15}}>
              No Slots Available for {selectedDate}
            </Text>
          ))}

        <Button
          mode="outlined"
          disabled={Object.keys(selectedSlot).length === 0}
          onPress={bookAppointmentReq}
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 15,
            marginBottom: 20,
          }}>
          Book an Appointment
        </Button>
      </ScrollView>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
          color: 'green',
        }}>
        An appointment request is given on {selectedSlot.date} from{' '}
        {selectedSlot.start_time} to {selectedSlot.end_time}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  slotWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 13,
  },
});

export default BookAppointment;

//Calendar package - https://www.npmjs.com/package/react-native-calendars




// [{
//   "Schedule_id": 1, 
//   "appointment_ending_date": "03 Nov, 2021", 
//   "appointment_starting_date": "02 Nov, 2021",
//   "mentor_id": 1, 
//   "start_time": "Sat, 02 Nov 2021 20:49:02 GMT",
//   "end_time": "Sun, 03 Nov 2021 17:59:02 GMT", 
// }]
