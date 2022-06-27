import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import MentorProfile from '../screens/FindMentor/MentorProfile.screen';
import Notification from '../screens/Notification.screen';
import StudentProfile from '../screens/StudentProfile.screen';

const Stack = createNativeStackNavigator();

const NotificationNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="NotificationScreen">
        <Stack.Screen
          name="NotificationScreen"
          component={Notification}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="MentorProfile"
          component={MentorProfile}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="StudentProfile"
          component={StudentProfile}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default NotificationNavigator;
