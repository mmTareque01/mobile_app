import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BookAppointment from '../screens/FindMentor/BookAppointment.screen';
import FindMentor from '../screens/FindMentor/FindMentor.screen';
import MentorProfile from '../screens/FindMentor/MentorProfile.screen';

const Stack = createNativeStackNavigator();

const FindMentorNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="FindMentor">
        <Stack.Screen
          name="FindMentor"
          component={FindMentor}
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
          name="BookAppointment"
          component={BookAppointment}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default FindMentorNavigator;
