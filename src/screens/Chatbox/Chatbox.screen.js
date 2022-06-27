import React from 'react';
import {useIsFocused} from '@react-navigation/core';
import ChatTab from '../../components/ChatTab';
import NewUserDashboard from './NewUserDashboard';
import {UserContext} from '../../App';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import {GET_USER_CHAT_HISTORY} from '../../services/ChatRequests';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../../theme/theme';

const Chatbox = ({navigation}) => {
  const [chatHistory, setChatHistory] = React.useState([]);
  // const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  // const socket = socketIOClient(BASE_URL);
  const isFocused = useIsFocused();

  const loggedInDataForScoket = {
    userStatus: loggedInUser.userStatus,
    userId: loggedInUser.id,
  };

  React.useEffect(() => {
    setLoading(true);
    let data = {
      userStatus: loggedInUser.userStatus,
      id: loggedInUser.id,
    };
    GET_USER_CHAT_HISTORY(data)
      .then(res => {
        setChatHistory(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [isFocused]);

  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      {loading ? (
        <ActivityIndicator
          size={30}
          animating={true}
          style={{marginTop: '10%'}}
          color={theme.colors.primary}
        />
      ) : chatHistory.length ? (
        chatHistory.map(item => (
          <ChatTab
            key={item.id}
            name={item.name}
            chatRoom={item.chat_id}
            profilePic={item.profilePic}
            lastMessage={item.last_msg}
            navigation={navigation}
            id={item.id}
          />
        ))
      ) : (
        <NewUserDashboard navigation={navigation} />
      )}
    </>
  );
};

export default Chatbox;
