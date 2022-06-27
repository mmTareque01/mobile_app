import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {UserContext} from '../App';
import {BASE_URL} from '../services/apis';
import {CREATE_NEW_CHAT} from '../services/ChatRequests';

const MentorCardSecondary = ({navigation, mentor}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  const creatingNewChat = () => {
    let newChatId = Date.now() + Math.random() + mentor.id;
    let data = {
      student_id: loggedInUser.id,
      mentor_id: mentor.id,
      chat_id: newChatId.toString().replace('.', '_'),
    };

    CREATE_NEW_CHAT(data)
      .then(response => {
        navigation.navigate('Chat', {
          room: response.data[0].chat_event_id,
          id: response.data[0].mentor_id,
          name: mentor.full_name,
          profilePic: mentor.profile_pic,
          mentorId: response.data[0].mentor_id,
          studentId: response.data[0].student_id,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MentorProfile', {mentorId: mentor.id})
        }>
        {mentor.profile_pic ? (
          <Avatar.Image
            size={85}
            source={{uri: `${BASE_URL}/${mentor.profile_pic}`}}
          />
        ) : (
          <Avatar.Text size={85} label={mentor.full_name[0]} />
        )}
      </TouchableOpacity>
      <Text style={{fontSize: 18, paddingBottom: 5}}>{mentor.full_name}</Text>
      <Text style={{paddingTop: 5, paddingBottom: 5, fontSize: 10}}>
        Available - Monday (10.00-12.00)
      </Text>

      <Button
        mode="outlined"
        labelStyle={{fontSize: 10}}
        contentStyle={{height: 35, width: '100%'}}
        style={{marginBottom: 6, padding: 0, borderRadius: 30}}
        onPress={creatingNewChat}>
        Message
      </Button>
      <Button
        mode="contained"
        labelStyle={{fontSize: 10}}
        contentStyle={{height: 35, width: '100%', padding: 0}}
        style={{borderRadius: 30}}
        onPress={() =>
          navigation.navigate('BookAppointment', {
            id: mentor.id,
            profilePic: mentor.profile_pic,
            country: mentor.country,
            name: mentor.full_name,
          })
        }>
        Book appointment
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d8d8d8',
    borderWidth: 1,
    padding: 15,
    backgroundColor: '#FFFF',
    width: '48%',
    marginBottom: 5,
  },
  button: {
    width: 140,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default MentorCardSecondary;
