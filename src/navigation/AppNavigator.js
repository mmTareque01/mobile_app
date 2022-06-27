import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent';
import Aboutus from '../screens/Aboutus.screen';
import ApplyAbroad from '../screens/ApplyAbroad.screen';
import Contactus from '../screens/Contactus.screen';
import MentorAbout from '../screens/MentorAbout.screen';
import PrivacyPolicy from '../screens/PrivacyPolicy.screen';
import Settings from '../screens/Settings.screen';
import StudentAbout from '../screens/StudentAbout.screen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            header: () => null,
          }}
        />
        <Drawer.Screen
          name="StudentAbout"
          component={StudentAbout}
          options={{
            header: () => null,
          }}
        />
        <Drawer.Screen
          name="MentorAbout"
          component={MentorAbout}
          options={{
            header: () => null,
          }}
        />

        <Drawer.Screen
          name="ApplyAbroad"
          component={ApplyAbroad}
          options={{
            header: () => null,
          }}
        />

        <Drawer.Screen
          name="Contactus"
          component={Contactus}
          options={{
            header: () => null,
          }}
        />
        <Drawer.Screen
          name="Aboutus"
          component={Aboutus}
          options={{
            header: () => null,
          }}
        />

        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            header: () => null,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            header: () => null,
          }}
        />

        {/* 
    
        <Drawer.Screen
          name="FindMentor"
          component={FindMentor}
          options={{
            header: () => null,
          }}
        />
        <Drawer.Screen
          name="MentorProfile"
          component={MentorProfile}
          options={{
            header: () => null,
          }}
        /> */}
      </Drawer.Navigator>
    </>
  );
};

export default AppNavigator;
