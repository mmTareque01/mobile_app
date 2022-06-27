import React from 'react';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {Text, List, ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import MentorCardSecondary from '../../components/MentorCardSecondary';
import ScreenLabel from '../../components/ScreenLabel';
import {BASE_URL} from '../../services/apis';
import theme from '../../theme/theme';
import {
  GET_ONE_COUNTRY_DETAILS,
  GET_MENTOR_ACCORDING_TO_COUNTRY,
} from '../../services/countryRequests';

const CountryInfo = ({navigation, route}) => {
  const [expanded, setExpanded] = React.useState(true);

  const {countries} = route.params;
  const [availableMentors, setAvailableMentors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [countryInfoKeys, setCountryInfoKeys] = React.useState([]);
  const [countryDetails, setCountryDetails] = React.useState({});

  const handlePress = () => setExpanded(!expanded);

  React.useEffect(() => {
    setLoading(true);
    GET_ONE_COUNTRY_DETAILS(countries?.country_id)
      .then(result => {
        setCountryDetails(result.data);
        setCountryInfoKeys(Object.keys(result.data));
        GET_MENTOR_ACCORDING_TO_COUNTRY(countries?.country_id).then(res => {
          setLoading(false);
          setAvailableMentors(res.data);
        });
      })
      .catch(error => {
        console.log(error.data);
      });

    return () => {
      setCountryDetails({});
      setCountryInfoKeys([]);
      setAvailableMentors([]);
    };
  }, []);

  return (
    <View>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title={countries.country_name} />
      {loading ? (
        <ActivityIndicator
          size={40}
          animating={true}
          style={{marginTop: '10%'}}
          color={theme.colors.primary}
        />
      ) : (
        <ScrollView>
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={{
                uri: `${BASE_URL}/${countries.country_img}`,
              }}
            />
            <List.Section title="Country Informations" style={{width: '100%'}}>
              {countryInfoKeys.length
                ? countryInfoKeys.map((detail, idx) => (
                    <List.Accordion key={idx} title={detail}>
                      <Text style={{paddingLeft: 15, paddingRight: 15}}>
                        {typeof countryDetails[detail] !== 'string'
                          ? countryDetails[detail].map((item, idx) => (
                              <Text key={idx}>
                                <Icon name="dot-single" size={12} />{' '}
                                <Text style={{fontWeight: 'bold'}}>
                                  {Object.keys(item)}
                                </Text>{' '}
                                {item[Object.keys(item)]}
                                {'\n \n'}
                              </Text>
                            ))
                          : countryDetails[detail]}
                      </Text>
                    </List.Accordion>
                  ))
                : null}
            </List.Section>

            <Text style={{fontWeight: 'bold', padding: 10}}>
              Available Mentors
            </Text>
            <View style={styles.mentorWrapper}>
              {availableMentors.length ? (
                availableMentors.map((mentor, idx) => (
                  <MentorCardSecondary
                    key={idx}
                    mentor={mentor}
                    navigation={navigation}
                  />
                ))
              ) : (
                <Text>No Mentors Available.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {alignItems: 'center', paddingBottom: 130},
  mentorWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  image: {
    marginTop: 20,
    width: '86%',
    height: 220,
    borderRadius: 15,
  },
});

export default CountryInfo;
