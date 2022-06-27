import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import ChatHeader from '../../components/ChatHeader';
import {io} from 'socket.io-client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useIsFocused} from '@react-navigation/core';
import {BASE_URL} from '../../services/apis';
import {UserContext} from '../../App';
import theme from '../../theme/theme';
import {
  GET_CHATTING_DATA_CALL,
  SAVE_CHATTING_DATA_CALL,
} from '../../services/ChatRequests';

const ChatUi = () => {
  return <></>;
};

const Chat = ({navigation, route}) => {
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const isFocused = useIsFocused();

  const [userData, setUserData] = React.useState({
    name: loggedInUser.name,
    last_academic_result: loggedInUser.last_academic_result,
    last_academic_qualification: loggedInUser.last_academic_qualification,
    english_proficiency: loggedInUser.english_proficiency,
    institution_name: loggedInUser.institution_name,
    want_to_study: loggedInUser.want_to_study,
    want_to_go: loggedInUser.want_to_go,
    working_experience: loggedInUser.working_experience,
    extracurricular_activities: loggedInUser.extracurricular_activities,
    publications: loggedInUser.publications,
    currently_live_in: loggedInUser.currently_live_in,
    country_of_origin: loggedInUser.country_of_origin,
    community_work: loggedInUser.community_work,
    about_yourself: loggedInUser.about_yourself,
    gender: loggedInUser.gender,
  });

  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [typedMessage, setTypedMessage] = React.useState('');
  const [incomingData, setincomingData] = React.useState('');
  const [outGoingData, setOutGoingData] = React.useState('');
  const scrollViewRef = React.useRef();
  const socket = io(BASE_URL);
  const chatId = route.params;
  const createRoom = () => {
    socket.emit('create', {
      room: chatId.room,
      userId: loggedInUser.id,
      userStatus: loggedInUser.userStatus,
      withUserId: chatId.id,
    });
  };

  const chattingEvent = () => {
    socket.on('invite', data => {
      socket.emit('joinRoom', data);
    });
  };

  const sendDataToDB = data => {
    // console.log('my data =>>>>>>' + data.chatId);
    SAVE_CHATTING_DATA_CALL(data)
      .then(data => {
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllChattingData = chatId => {
    GET_CHATTING_DATA_CALL(chatId)
      .then(data => {
        // console.log("data=>>>"     +data.data)
        if (data.data.error) {
          setMessages();
        } else {
          setMessages(data.data);
          // console.log(messages[0])
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  createRoom();

  React.useEffect(() => {
    socket.on('message', data => {
      setincomingData(data.message);
      // console.log(data);
    });
  }, []);

  React.useEffect(() => {
    socket.emit('message', outGoingData);
    sendDataToDB(outGoingData);
    console.log('outGoingData');
  }, [outGoingData]);

  React.useEffect(() => {
    getAllChattingData(chatId.room);
    console.log(messages);
    setLoading(true);
  }, [isFocused]);

  const handleSendMessage = () => {
    if (typedMessage) {
      const outGoingMsg = {
        message: typedMessage,
        // time_stamp: new Date(),
        user_status: loggedInUser.userStatus,
        user_id: loggedInUser.id,
        chatId: chatId.room,
      };
      console.log('outGoingMsg');
      const newMessage = [...messages, outGoingMsg];

      setTypedMessage('');
      setMessages(newMessage);
      setOutGoingData(outGoingMsg);
    }
  };

  const checkSender = (userStatus, userId) => {
    if (userStatus === loggedInUser.userStatus && userId === loggedInUser.id)
      return true;
    else return false;
  };

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return (
    <>
      <ChatHeader
        name={chatId.name}
        profilePic={chatId.profilePic}
        navigation={navigation}
        userId={
          loggedInUser.userStatus === 'mentor'
            ? chatId.studentId
            : loggedInUser.userStatus === 'student' && chatId.mentorId
        }
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <View style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Hi I'm your mentor {chatId.name}.</Text>
            <Text style={{textAlign: 'right', fontSize: 10}}>11.00PM</Text>
          </View>

          <View style={[styles.textWrapper, styles.rightTextWrapper]}>
            <Text style={[styles.text, styles.textRight]}>
              Name : {userData.name + '\n'}
              Gender: {userData.gender + '\n'}
              Last Accademic Certificate:{' '}
              {userData.last_academic_qualification +
                ', CGPA: ' +
                userData.last_academic_result +
                ' from: ' +
                userData.institution_name +
                '\n'}
              Future Plan:{' '}
              {userData.want_to_study + ' in ' + userData.want_to_go + '\n'}
              English Proficiency: {userData.english_proficiency + '\n'}
              Working Experience: {userData.working_experience + '\n'}
              Extracurricular Activities:{' '}
              {userData.extracurricular_activities + '\n'}
              Publications: {userData.publications + '\n'}
              Currently Live In: {userData.currently_live_in + '\n'}
              Country of Origin: {userData.country_of_origin + '\n'}
              About Yourself: {userData.about_yourself + '\n'}
            </Text>
            <Text style={{textAlign: 'right', fontSize: 10}}>11.00PM</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.text}>{incomingData}</Text>
            <Text style={{textAlign: 'right', fontSize: 10}}>11.00PM</Text>
          </View>

          {loading
            ? messages.map((message, idx) => (
                <View
                  style={[
                    styles.textWrapper,
                    checkSender(message.user_status, message.user_id) &&
                      styles.rightTextWrapper,
                  ]}
                  key={idx}>
                  <Text
                    style={[
                      styles.text,
                      checkSender(message.userStatus, message.userId) &&
                        styles.textRight,
                    ]}>
                    {message.message}
                  </Text>
                  <Text style={styles.timeStampText}>
                    {/* {message.timeStamp} */}
                    <MaterialCommunityIcons
                      name="check-all"
                      style={{padding: 30}}
                      size={13}
                    />
                  </Text>
                </View>
              ))
            : null}
        </View>
      </ScrollView>

      <View style={styles.messageBox}>
        <TextInput
          style={styles.messageInput}
          value={typedMessage}
          onChangeText={value => setTypedMessage(value)}
        />
        <IconButton
          icon={() => (
            <Icon name="send" size={35} color={theme.colors.primary} />
          )}
          size={32}
          onPress={handleSendMessage}
          style={styles.sendButton}
        />
        <EntypoIcon name="attachment" size={20} style={styles.attachmentIcon} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    position: 'relative',
  },
  textWrapper: {
    width: 300,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  text: {
    textAlign: 'justify',
    color: '#858585',
    paddingBottom: 5,
  },
  rightTextWrapper: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(4, 34, 63, 0.2)',
  },
  textRight: {
    color: 'black',
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 10,
  },
  messageInput: {
    backgroundColor: '#FFFF',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    paddingLeft: 40,
  },
  sendButton: {
    // backgroundColor: theme.colors.primary,
  },
  attachmentIcon: {
    position: 'absolute',
    left: 30,
  },
  timeStampText: {
    textAlign: 'right',
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chat;
