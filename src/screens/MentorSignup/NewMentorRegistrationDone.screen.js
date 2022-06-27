import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AuthHeader from '../../components/AuthHeader';

const NewMentorRegistrationDone = ({navigation}) => {
  return (
    <View style={{marginTop: 40}}>
      <AuthHeader disableOptions />
      <View style={styles.wrapper}>
        <Image
          style={styles.img}
          source={require('../../assets/images/check.png')}
        />
        <Text style={styles.text}>
          Further Abroad Inquiry will send the confirmation email to your domain
          email.
        </Text>
        <Text style={styles.text}>
          Next Abroad Inquiry will ask for a short interview through email.
        </Text>
        <Text style={styles.text}>Thank you.</Text>

        <Button mode="outlined" onPress={() => navigation.navigate('Login')}>
          BACK TO LOGIN
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 50,
  },
  text: {
    marginBottom: 10,
    width: 320,
    textAlign: 'center',
  },
});

export default NewMentorRegistrationDone;
