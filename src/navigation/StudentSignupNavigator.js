import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AdditionalSignupInfo from '../screens/StudentSignup/AdditionalSignupInfo.screen';
import StudentSignup from '../screens/StudentSignup/StudentSignup.screen';

const Stack = createNativeStackNavigator();

const StudentSignupNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="StudentSignup"
          component={StudentSignup}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="AdditionalSignupInfo"
          component={AdditionalSignupInfo}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StudentSignupNavigator;
