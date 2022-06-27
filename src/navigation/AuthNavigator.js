import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login.screen';
import StudentSignupNavigator from './StudentSignupNavigator';
import MentorSignupNavigator from './MentorSignupNavigator';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="StudentSignupNavigator"
          component={StudentSignupNavigator}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="MentorSignupNavigator"
          component={MentorSignupNavigator}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
