import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';

const AuthHeader = ({disableOptions = false, navigation, route}) => {
  return (
    <>
      <View style={styles.logo}>
        <Image source={require('../assets/images/logo.jpg')} />
        <Text>We work on behalf of students</Text>
      </View>
      {disableOptions ? null : (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Button
            mode={route.name === 'StudentSignup' ? 'contained' : 'outlined'}
            style={{
              width: Dimensions.get('window').width / 2.6,
            }}
            onPress={() => navigation.navigate('StudentSignup')}>
            Student
          </Button>
          <Button
            mode={route.name === 'MentorSignUp' ? 'contained' : 'outlined'}
            style={{
              width: Dimensions.get('window').width / 2.6,
            }}
            onPress={() => navigation.navigate('MentorSignupNavigator')}>
            Mentor
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logo: {marginBottom: 20, alignItems: 'center'},
});

export default AuthHeader;
