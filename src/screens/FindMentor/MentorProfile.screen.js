import React from 'react';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {ActivityIndicator, Text, Avatar, Button} from 'react-native-paper';
import {UserContext} from '../../App';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import ScreenLabel from '../../components/ScreenLabel';
import {BASE_URL} from '../../services/apis';
import {CREATE_NEW_CHAT} from '../../services/ChatRequests';
import {GET_MENTOR_INFO_CALL} from '../../services/mentorRequests';
import theme from '../../theme/theme';

const MentorProfile = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(true);
  const [mentorInfo, setMentorInfo] = React.useState({});
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;

  React.useEffect(() => {
    setLoading(true);
    GET_MENTOR_INFO_CALL(route.params.mentorId)
      .then(res => {
        setMentorInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });

    return () => {
      setMentorInfo({});
    };
  }, []);

  const creatingNewChat = () => {
    let newChatId = Date.now() + Math.random() + mentorInfo.id;
    let data = {
      student_id: loggedInUser.id,
      mentor_id: route.params.mentorId,
      chat_id: newChatId.toString().replace('.', '_'),
    };

    CREATE_NEW_CHAT(data)
      .then(response => {
        navigation.navigate('Chat', {
          room: response.data[0].chat_event_id,
          id: response.data[0].mentor_id,
          name: mentorInfo.name,
          profilePic: mentorInfo.profilePic,
          mentorId: response.data[0].mentor_id,
          studentId: response.data[0].student_id,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

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
      ) : (
        <>
          <ScreenLabel title={'Profile of ' + mentorInfo.name} />
          <ScrollView>
            <View style={styles.headerWrapper}>
              <Avatar.Image
                size={100}
                source={{uri: `${BASE_URL}/${mentorInfo.profilePic}`}}
                style={{marginTop: 20, marginBottom: 10}}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 5,
                }}></View>
            </View>

            <View style={styles.mainWrapper}>
              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Country : </Text>
                <Text>{mentorInfo.country}</Text>
              </View>

              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>City : </Text>
                <Text>{mentorInfo.city}</Text>
              </View>

              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Gender : </Text>
                <Text>{mentorInfo.gender}</Text>
              </View>

              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Profession : </Text>
                <Text>{mentorInfo.profession}</Text>
              </View>

              {mentorInfo.profession === 'Student' ? (
                <>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <Text style={{fontWeight: 'bold'}}>
                      Institution Name :{' '}
                    </Text>
                    <Text>{mentorInfo.institution_name}</Text>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Studying in : </Text>
                    <Text>{mentorInfo.studying_in}</Text>
                  </View>
                </>
              ) : (
                mentorInfo.profession === 'Service' && (
                  <>
                    <View style={{flexDirection: 'row', paddingBottom: 10}}>
                      <Text style={{fontWeight: 'bold'}}>
                        Company Working For :{' '}
                      </Text>
                      <Text>{mentorInfo.working_for}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingBottom: 10}}>
                      <Text style={{fontWeight: 'bold'}}>Studying in : </Text>
                      <Text>{mentorInfo.position_at_company}</Text>
                    </View>
                  </>
                )
              )}
              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>About : </Text>
                <Text style={{paddingRight: 50, textAlign: 'justify'}}>
                  {mentorInfo.about_yourself}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginTop: 30,
                }}>
                <Button
                  icon="message"
                  mode="contained"
                  onPress={() => {
                    creatingNewChat();
                  }}>
                  Message
                </Button>

                <Button
                  icon="calendar"
                  mode="contained"
                  onPress={() =>
                    navigation.navigate('BookAppointment', {
                      id: mentorInfo.id,
                      profilePic: mentorInfo.profilePic,
                      country: mentorInfo.country,
                      name: mentorInfo.name,
                    })
                  }>
                  Appointment
                </Button>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
  },
  mainWrapper: {
    padding: 20,
  },
});

export default MentorProfile;
