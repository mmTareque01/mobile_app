import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import ScreenLabel from '../../components/ScreenLabel';
import MentorCard from '../../components/MentorCard';
import {GET_ALL_MENTORS_CALL} from '../../services/studentRequests';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../../theme/theme';

const FindMentor = ({navigation}) => {
  const [mentors, setMentors] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setLoading(true);
    GET_ALL_MENTORS_CALL()
      .then(res => {
        setMentors(res.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [isFocused]);

  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="Our Mentors" />
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size={30}
            animating={true}
            style={{marginTop: '10%'}}
            color={theme.colors.primary}
          />
        ) : mentors.length ? (
          mentors.map(data => (
            <MentorCard key={data.id} data={data} navigation={navigation} />
          ))
        ) : null}
      </ScrollView>
    </>
  );
};

export default FindMentor;
