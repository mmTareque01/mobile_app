import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import theme from '../theme/theme';

const renderInner = (
  choosePhotoFromLibrary,
  takePhotoFromCamera,
  bottomSheet,
) => {
  return (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bottomSheet.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
const renderHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
};

const ImageUploadButtonSheet = ({
  bottomSheet,
  choosePhotoFromLibrary,
  takePhotoFromCamera,
}) => {
  const fall = new Animated.Value(1);
  return (
    <>
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[320, 0]}
        renderContent={() =>
          renderInner(choosePhotoFromLibrary, takePhotoFromCamera, bottomSheet)
        }
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  topSection: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 22,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  formWrapper: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
  },
});

export default ImageUploadButtonSheet;
