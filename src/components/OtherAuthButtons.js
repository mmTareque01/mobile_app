import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const OtherAuthButtons = () => {
  return (
    <View style={styles.wrapper}>
      <Button
        icon={() => <Icon name="facebook" color="#FFFF" size={20} />}
        color="#FFFF"
        style={styles.facebookButton}>
        Facebook
      </Button>
      <Button
        icon={() => <Icon name="google" color="#FFFF" size={20} />}
        color="#FFF"
        style={styles.googleButton}>
        Google
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  googleButton: {
    backgroundColor: '#F14336',
    width: '46%',
  },
  facebookButton: {backgroundColor: '#385C8E', width: '46%'},
});

export default OtherAuthButtons;
