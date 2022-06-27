import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import theme from '../theme/theme';

const HeaderWithLogo = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <View />
      <Image
        style={{marginLeft: 35, height: 40, width: 160}}
        source={require('../assets/images/logo.jpg')}
      />

      <IconButton
        icon={() => <Icon name="menu" size={30} />}
        color={theme.colors.primary}
        size={30}
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFF',
    padding: 5,
  },
});
export default HeaderWithLogo;
