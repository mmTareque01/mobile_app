import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';

const DeveloperLabel = () => {
  return (
    <View>
      <View style={styles.developerSection}>
        <Text style={{fontSize: 10}}>Developed & Maintained by</Text>
        <Text
          style={{fontWeight: 'bold', fontSize: 15}}
          onPress={() => Linking.openURL('https://www.orangeprogramming.nl/')}>
          Orange Programming
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  developerSection: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default DeveloperLabel;
