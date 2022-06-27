import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ActivityIndicator, Avatar, Button, Text} from 'react-native-paper';
import HeaderWithLogo from '../components/HeaderWithLogo';
import ScreenLabel from '../components/ScreenLabel';
import {BASE_URL} from '../services/apis';
import {GET_STUDENT_INFO_CALL} from '../services/studentRequests';
import theme from '../theme/theme';

const StudentProfile = ({navigation, route}) => {
  const [studentInfo, setStudentInfo] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    GET_STUDENT_INFO_CALL('token', route.params.studentId)
      .then(res => {
        setStudentInfo(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });

    return () => {
      setStudentInfo({});
    };
  }, []);

  console.log(studentInfo);

  try {
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
            <ScreenLabel title={'Profile of ' + studentInfo.name} />
            <ScrollView>
              <View style={styles.headerWrapper}>
                <Avatar.Image
                  size={100}
                  source={{uri: `${BASE_URL}/${studentInfo.profilePic}`}}
                  style={{marginTop: 20, marginBottom: 10}}
                />
              </View>

              <View style={styles.mainWrapper}>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Gender : </Text>
                  <Text>{studentInfo.gender}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Country Origin : </Text>
                  <Text>{studentInfo.country_of_origin}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Country Living: </Text>
                  <Text>{studentInfo.currently_live_in}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Country Living: </Text>
                  <Text>{studentInfo.currently_live_in}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Institution: </Text>
                  <Text>{studentInfo.institution_name}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Last Academic Qualification:{' '}
                  </Text>
                  <Text>{studentInfo.last_academic_qualification}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Last Academic Result:{' '}
                  </Text>
                  <Text>{studentInfo.last_academic_result}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Country Want To Go: </Text>
                  <Text>{studentInfo.want_to_go}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Want To Study: </Text>
                  <Text>{studentInfo.want_to_study}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>
                    English Proficiency:{' '}
                  </Text>
                  <Text>{studentInfo.english_proficiency}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Publications: </Text>
                  <Text>{studentInfo.publications}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Working Experience: </Text>
                  <Text>{studentInfo.working_experience}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Extracurricular Activities:{' '}
                  </Text>
                  <Text>{studentInfo.extracurricular_activities}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Community Work: </Text>
                  <Text>{studentInfo.community_work}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginTop: 30,
                  }}>
                  {/* <Button
                    icon="message"
                    mode="contained"
                    onPress={() => {
                      creatingNewChat();
                    }}>
                    Message
                  </Button> */}
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
  },
  mainWrapper: {
    padding: 20,
  },
});

export default StudentProfile;
