import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MentorSignup from '../screens/MentorSignup/MentorSignup.screen';
import MentorSignupBasicInfo from '../screens/MentorSignup/MentorSignupBasicInfo.screen';
import MentorSignupProfessionalInfo from '../screens/MentorSignup/MentorSignupProfessionalInfo.screen';
import MentorSignupRequiredDocs from '../screens/MentorSignup/MentorSignupRequiredDocs.screen';
import NewMentorRegistrationDone from '../screens/MentorSignup/NewMentorRegistrationDone.screen';

const Stack = createNativeStackNavigator();

const MentorSignupNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MentorSignUp"
          component={MentorSignup}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="MentorSignupBasicInfo"
          component={MentorSignupBasicInfo}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="MentorSignupProfessionalInfo"
          component={MentorSignupProfessionalInfo}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="MentorSignupRequiredDocs"
          component={MentorSignupRequiredDocs}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="NewMentorRegistrationDone"
          component={NewMentorRegistrationDone}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MentorSignupNavigator;
