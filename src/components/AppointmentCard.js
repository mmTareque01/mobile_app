import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme/theme';

const AppointmentCard = ({item, removeAppointment}) => {
  console.log(item);
  const {Schedule_id, appointment_date, start_time, end_time} = item;

  return (
    <View style={styles.wrapper}>
      <Icon name="calendar-check" size={30} color={theme.colors.primary} />
      <Text style={styles.text}>{appointment_date?.substr(0, 10)}</Text>
      <Text>
        From <Text style={styles.text}>{start_time?.substr(0, 5)}</Text> to{' '}
        <Text style={styles.text}>{end_time?.substr(0, 5)}</Text>
      </Text>
      <Icon
        name="delete-outline"
        size={30}
        color="#F03A17"
        onPress={() => removeAppointment(Schedule_id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F1F8FF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AppointmentCard;
