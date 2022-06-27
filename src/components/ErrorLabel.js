import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorLabel = ({title = 'Error occured!'}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8D7DA',
    width: '76%',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: '#842029',
  },
});

export default ErrorLabel;
