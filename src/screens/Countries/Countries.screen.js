import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {GET_ALL_COUNTRY} from '../../services/countryRequests';
import {useIsFocused} from '@react-navigation/core';
import HeaderWithLogo from '../../components/HeaderWithLogo';
import theme from '../../theme/theme';
import {BASE_URL} from '../../services/apis';
import ScreenLabel from '../../components/ScreenLabel';

const Countries = ({navigation}) => {
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    GET_ALL_COUNTRY()
      .then(res => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch(errror => {
        console.log(errror);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <View style={styles.wrapper}>
        <ScreenLabel title="Popular Places to Study Abroad" />
        <ScrollView>
          <View style={{paddingBottom: 130, alignItems: 'center'}}>
            <View style={styles.countryWrapper}>
              {loading ? (
                <ActivityIndicator
                  size={30}
                  animating={true}
                  style={{marginTop: '10%'}}
                  color={theme.colors.primary}
                />
              ) : countries.length ? (
                countries.map(data => (
                  <TouchableOpacity
                    style={styles.countryInnerWrapper}
                    key={data.country_id}
                    onPress={() =>
                      navigation.navigate('CountryInfo', {countries: data})
                    }>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${BASE_URL}/${data.country_img}`,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>
                      {data.country_name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No Countries Found.</Text>
              )}
            </View>
            {/* <Button mode="contained" style={{width: 200, marginTop: 10}}>
              Show More
            </Button> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  countryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingBottom: 5,
    paddingTop: 15,
  },
  countryInnerWrapper: {
    height: 100,
    width: '50%',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 15,
  },
});

export default Countries;
