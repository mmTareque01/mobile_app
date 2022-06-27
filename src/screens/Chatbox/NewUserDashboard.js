import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {UserContext} from '../../App';

const NewUserDashboard = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  const userStatus = loggedInUser.userStatus;

  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.welcomeText}>WELCOME </Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/welcome-img.png')}
        />
        <View style={{marginBottom: 20}} />

        {userStatus === 'student' ? (
          <>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('FindMentor')}
              dark={false}
              icon="chevron-right"
              style={styles.button}
              contentStyle={{flexDirection: 'row-reverse', padding: 8}}>
              Find Mentor
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('CountriesNavigator')}
              dark={false}
              icon="chevron-right"
              style={styles.button}
              contentStyle={{flexDirection: 'row-reverse', padding: 8}}>
              Available Countries
            </Button>
            <Button
              mode="outlined"
              dark={false}
              icon="chevron-right"
              style={styles.button}
              onPress={() => navigation.navigate('ApplyAbroad')}
              contentStyle={{flexDirection: 'row-reverse', padding: 8}}>
              Apply Abroad
            </Button>
          </>
        ) : (
          userStatus === 'mentor' && (
            <>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('ScheduleAppointment')}
                dark={false}
                icon="chevron-right"
                style={styles.button}
                contentStyle={{flexDirection: 'row-reverse', padding: 8}}>
                Schedule Appointment
              </Button>
              <Button
                mode="outlined"
                // onPress={() => navigation.navigate('About')}
                dark={false}
                icon="chevron-right"
                style={styles.button}
                contentStyle={{flexDirection: 'row-reverse', padding: 8}}>
                Learn More
              </Button>
            </>
          )
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 80,
  },
  image: {
    width: '50%',
    height: '30%',
  },
  button: {
    marginBottom: 15,
    width: '80%',
  },
  welcomeText: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: 'bold',
  },
});

export default NewUserDashboard;
