import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme/theme';
import {UserContext} from '../App';
import ChatboxNavigator from './ChatboxNavigator';
import CountriesNavigator from './CountriesNavigator';
import FindMentorNavigator from './FindMentorNavigator';
import ScheduleAppointment from '../screens/ScheduleAppointment.screen';
import Appointments from '../screens/Appointments';
import NotificationNavigator from './NotificationNavigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Messages: 'message',
  Notification: 'notifications',
  Countries: 'flag',
  Mentors: 'person-search',
  Schedule: 'more-time',
  Appointments: 'date-range',
};

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({size, color}) => (
      <MaterialIcons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: '#FFFF',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {backgroundColor: theme.colors.primary},
    header: () => null,
  };
};

const TabNavigator = () => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  const userStatus = loggedInUser.userStatus;

  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Messages" component={ChatboxNavigator} />
      <Tab.Screen name="Notification" component={NotificationNavigator} />
      {userStatus === 'student' ? (
        <>
          <Tab.Screen name="Countries" component={CountriesNavigator} />
          <Tab.Screen name="Mentors" component={FindMentorNavigator} />
        </>
      ) : (
        userStatus === 'mentor' && (
          <>
            <Tab.Screen name="Schedule" component={ScheduleAppointment} />
            <Tab.Screen name="Appointments" component={Appointments} />
          </>
        )
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
