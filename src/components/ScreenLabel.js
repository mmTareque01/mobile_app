import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../theme/theme';

const ScreenLabel = ({title = ''}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  text: {
    color: '#FFFF',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },
});

export default ScreenLabel;
