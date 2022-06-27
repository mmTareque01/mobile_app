import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {UserContext} from '../App';
import {BASE_URL} from '../services/apis';

const ChatTab = ({navigation, name, profilePic, chatRoom, lastMessage, id}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate('Chat', {
          room: chatRoom,
          name: name,
          profilePic: profilePic,
          mentorId: loggedInUser.userStatus !== 'mentor' ? id : null,
          studentId: loggedInUser.userStatus !== 'student' ? id : null,
        })
      }>
      <View style={styles.innerWrapper}>
        {loggedInUser.profilePic ? (
          <Avatar.Image
            size={65}
            source={{uri: `${BASE_URL}/${profilePic}`}}
            style={{marginRight: 20}}
          />
        ) : (
          <Avatar.Text size={65} label={name[0]} style={{marginRight: 20}} />
        )}

        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
          <Text style={{fontSize: 14, marginTop: 5}}>{lastMessage}.</Text>
        </View>
      </View>
      {/* <Text style={{textAlign: 'right'}}>11.10 AM</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  },
  innerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ChatTab;
