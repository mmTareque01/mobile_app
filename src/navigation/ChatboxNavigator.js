import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Chat from '../screens/Chatbox/Chat.screen';
import Chatbox from '../screens/Chatbox/Chatbox.screen';
import MentorProfile from '../screens/FindMentor/MentorProfile.screen';
import StudentProfile from '../screens/StudentProfile.screen';

const Stack = createNativeStackNavigator();

const ChatboxNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Chatbox"
          component={Chatbox}
          options={() => ({
            header: () => null,
          })}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={() => ({
            header: () => null,
          })}
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

export default ChatboxNavigator;
