import React from 'react';
import {View, Text, Linking} from 'react-native';
import {Button} from 'react-native-paper';
import HeaderWithLogo from './../components/HeaderWithLogo';
import ScreenLabel from './../components/ScreenLabel';

const ApplyAbroad = ({navigation}) => {
  return (
    <>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="Apply Abroad" />
      <View style={{padding: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Fill up the form to Apply Abroad :{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{marginRight: 10}}>Form in Bangla</Text>
          <Button
            mode="contained"
            onPress={() =>
              Linking.openURL(
                'https://docs.google.com/forms/d/1lXa295FQqlyjrS8uZcw82DIN_0WEeUeVs0pOXwkrZRA/edit',
              )
            }>
            Form / Bn
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{marginRight: 10}}>Form in English</Text>
          <Button
            mode="contained"
            onPress={() =>
              Linking.openURL(
                'https://docs.google.com/forms/d/1eZJHsWKv1PPn4AcFQeOvd_ckYxmiXUl1fZjPzQ2PtiU/edit',
              )
            }>
            Form / En
          </Button>
        </View>
      </View>
    </>
  );
};

export default ApplyAbroad;
