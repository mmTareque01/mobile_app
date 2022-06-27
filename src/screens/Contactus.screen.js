import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import HeaderWithLogo from './../components/HeaderWithLogo';
import {List, Text} from 'react-native-paper';
import ScreenLabel from '../components/ScreenLabel';
import theme from '../theme/theme';

const Contactus = ({navigation}) => {
  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="Contact us" />
      <View style={styles.wrapper}>
        <Text style={{textAlign: 'justify'}}>
          Abroad Inquiry was born in 2017 from an altruist Facebook group which
          has helped hundreds of international students to pursue higher study
          from all around the world.
        </Text>
        <List.Item
          title="Block# A, Road no.# 1, House no.#53 (Ground floor), Niketon, Gulshan 1, Dhaka - 1212"
          titleNumberOfLines={4}
          left={props => (
            <List.Icon {...props} icon="home" color={theme.colors.primary} />
          )}
        />
        <List.Item
          title="+8801718-665274"
          left={props => (
            <List.Icon {...props} icon="phone" color={theme.colors.primary} />
          )}
        />
        <List.Item
          title="info@abroadinquiry.com"
          left={props => (
            <List.Icon {...props} icon="email" color={theme.colors.primary} />
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 30,
  },
});

export default Contactus;
