import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Countries from '../screens/Countries/Countries.screen';
import CountryInfo from '../screens/Countries/CountryInfo.screen';

const Stack = createNativeStackNavigator();

const CountriesNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="CountriesScreen"
          component={Countries}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CountryInfo"
          component={CountryInfo}
          options={{
            header: () => null,
          }}
        />
        {/*
      <Stack.Screen
        name="MentorProfile"
        component={MentorProfile}
        options={{
          header: () => null,
        }}
      />
    */}
      </Stack.Navigator>
    </>
  );
};

export default CountriesNavigator;
