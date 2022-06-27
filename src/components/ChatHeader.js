import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  IconButton,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Button,
  List,
} from 'react-native-paper';
import BackIcon from 'react-native-vector-icons/Ionicons';
import DotIcon from 'react-native-vector-icons/Entypo';
import {UserContext} from '../App';
import {BASE_URL} from '../services/apis';
import theme from '../theme/theme';

const ChatHeader = ({navigation, name, profilePic, userId}) => {
  const [visible, setVisible] = React.useState(false);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  const userStatus = loggedInUser.userStatus;
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleDialogItem = routeName => {
    navigation.navigate(routeName);
    setVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.wrapper, {padding: 5}]}>
        <IconButton
          icon={() => <BackIcon name="arrow-back" size={30} color="#FFFF" />}
          color="#FFFF"
          size={30}
          onPress={() => navigation.goBack()}
        />

        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            if (userStatus === 'mentor') {
              navigation.navigate('StudentProfile', {studentId: userId});
            } else if (userStatus === 'student') {
              navigation.navigate('MentorProfile', {mentorId: userId});
            }
          }}>
          {profilePic ? (
            <Avatar.Image
              size={50}
              source={{uri: `${BASE_URL}/${profilePic}`}}
              style={{marginRight: 20}}
            />
          ) : (
            <Avatar.Text size={50} label={name[0]} style={{marginRight: 20}} />
          )}
          <View style={{paddingLeft: 15}}>
            <Text style={{color: '#FFFF', fontSize: 18, fontWeight: 'bold'}}>
              {name}
            </Text>
            {/* <Text style={{color: '#FFFF', fontSize: 10}}>
              Last seen 11.00 PM
            </Text> */}
          </View>
        </TouchableOpacity>
      </View>

      <IconButton
        icon={() => (
          <DotIcon name="dots-three-vertical" size={30} color="#FFFF" />
        )}
        color="#FFFF"
        size={30}
        onPress={showDialog}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          {userStatus === 'mentor' && <List.Item title="View Profile" />}
          <List.Item title="Contact Info" />
          {userStatus === 'student' && (
            <>
              <List.Item title="Book an Appointment" />
              <List.Item title="Apply Abroad" />
            </>
          )}

          <List.Item title="Delete Chat" />
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialog: {
    backgroundColor: '#FFFF',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    padding: 5,
  },
});

export default ChatHeader;
