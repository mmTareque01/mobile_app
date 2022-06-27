import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import AuthHeader from '../../components/AuthHeader';
import DocumentPicker from 'react-native-document-picker';
import mime from 'mime';
import {MENTOR_SIGNUP_4} from '../../services/mentorRequests';

const data = [
  {
    title:
      'A valid color copy of your current resident permit & passport (both side). *',
    name: 'resident_permit_passport',
  },
  {
    title: 'A campus card/employee card copy. *',
    name: 'campus_or_employee_card',
  },
  {
    title:
      'Mentor has to provide his/her signature according to the Passport or ID card. *',
    name: 'signature',
  },
];

const MentorSignupRequiredDocs = ({navigation, route}) => {
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = React.useState({
    resident_permit_passport: null,
    campus_or_employee_card: null,
    signature: null,
  });

  const filePicker = async key => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setFiles({
        ...files,
        [key]: res[0],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const uploadFiles = () => {
    const formData = new FormData();
    formData.append('resident_permit_passport', {
      name: new Date() + '_resident_permit_passport',
      uri: files['resident_permit_passport'].uri,
      type: files['resident_permit_passport'].type,
    });
    formData.append('campus_or_employee_card', {
      name: new Date() + '_campus_or_employee_card',
      uri: files['campus_or_employee_card'].uri,
      type: files['campus_or_employee_card'].type,
    });
    formData.append('signature', {
      name: new Date() + '_signature',
      uri: files['signature'].uri,
      type: files['signature'].type,
    });
    MENTOR_SIGNUP_4(route.params?.mentor_id, formData)
      .then(res => {
        setLoading(false);
        navigation.navigate('NewMentorRegistrationDone');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.wrapperr}>
          <AuthHeader navigation={navigation} route={route} disableOptions />
          <Title style={{marginBottom: 10}}>
            Additional, Required Documents :
          </Title>

          {data.map((data, idx) => (
            <View key={idx} style={{marginBottom: 20}}>
              <Text style={{width: 330, marginBottom: 10}}>{data.title}</Text>
              {files[data.name] && (
                <Text style={styles.fileName}>{files[data.name].name}</Text>
              )}

              <Button
                icon="cloud-upload"
                mode="outlined"
                style={{width: 130}}
                onPress={() => filePicker(data.name)}>
                Upload
              </Button>
            </View>
          ))}

          <Button
            mode="contained"
            style={styles.button}
            onPress={uploadFiles}
            disabled={
              ((files['resident_permit_passport'] === null,
              files['campus_or_employee_card'] === null),
              files['campus_or_employee_card'] === null)
            }
            loading={loading}>
            Continue
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperr: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fileName: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  button: {
    width: 330,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginRight: 'auto',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
});

export default MentorSignupRequiredDocs;
