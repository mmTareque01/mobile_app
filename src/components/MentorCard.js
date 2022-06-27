import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import MessageIcon from 'react-native-vector-icons/MaterialIcons';
import CalanderIcon from 'react-native-vector-icons/FontAwesome';
import {BASE_URL} from '../services/apis';
import {UserContext} from '../App';
import {CREATE_NEW_CHAT} from '../services/ChatRequests';

const MentorCard = ({navigation, data}) => {
  const [mentorData, setMentorData] = React.useState(data);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  const creatingNewChat = () => {
    let newChatId = Date.now() + Math.random() + mentorData.id;
    let data = {
      student_id: loggedInUser.id,
      mentor_id: mentorData.id,
      chat_id: newChatId.toString().replace('.', '_'),
    };

    CREATE_NEW_CHAT(data)
      .then(response => {
        navigation.navigate('Chat', {
          room: response.data[0].chat_event_id,
          id: response.data[0].mentor_id,
          name: mentorData.full_name,
          profilePic: mentorData.profile_pic,
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          key={mentorData.id}
          onPress={() =>
            navigation.navigate('MentorProfile', {mentorId: data.id})
          }>
          {mentorData.profile_pic ? (
            <Avatar.Image
              size={70}
              source={{uri: `${BASE_URL}/${mentorData.profile_pic}`}}
              style={{marginRight: 20}}
            />
          ) : (
            <Avatar.Text
              size={65}
              label={mentorData.full_name[0]}
              style={{marginRight: 20}}
            />
          )}
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 18, paddingBottom: 5}}>
            {mentorData.full_name}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              style={{width: 26, height: 14}}
              source={require('../assets/images/nl-flag.png')}
            /> */}
            <Text style={{fontSize: 12, marginLeft: 5}}>
              {mentorData.country}
            </Text>
          </View>
        </View>
      </View>

      <View style={{justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            creatingNewChat();
          }}>
          <MessageIcon name="message" size={18} color="#272727" />
          <Text style={{fontSize: 8, color: '#272727'}}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('BookAppointment', {
              id: mentorData.id,
              profilePic: mentorData.profile_pic,
              country: mentorData.country,
              name: mentorData.full_name,
            })
          }>
          <CalanderIcon name="calendar" size={18} color="#272727" />
          <Text style={{fontSize: 8, color: '#272727'}}>Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#d8d8d8',
    backgroundColor: '#FFF',
  },
  image: {
    width: 105,
    height: 105,
  },
  button: {
    width: 150,
    fontSize: 30,
  },
});

export default MentorCard;
