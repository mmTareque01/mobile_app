import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  List,
  Portal,
  Provider,
  Button,
  Modal,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from '../services/apis';
import {UserContext} from '../App';
import theme from '../theme/theme';

const routes = [
  {name: 'About', path: 'StudentAbout', icon: 'person', user: 'student'},
  {name: 'About', path: 'MentorAbout', icon: 'person', user: 'mentor'},
  // {
  //   name: 'Find Mentor',
  //   path: 'FindMentor',
  //   icon: 'person-add-alt-1',
  //   user: 'mentor',
  // },
  {
    name: 'Apply Abroad',
    path: 'ApplyAbroad',
    icon: 'airplanemode-active',
    user: 'student',
  },
  {name: 'About Us', path: 'Aboutus', icon: 'info'},
  {name: 'Contact Us', path: 'Contactus', icon: 'contact-support'},
  {name: 'Privacy Policy', path: 'PrivacyPolicy', icon: 'privacy-tip'},
  {name: 'Settings', path: 'Settings', icon: 'settings'},
];

const DrawerContent = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const {user} = React.useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const userStatus = loggedInUser.userStatus;
  const showModal = () => {
    navigation.closeDrawer();
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  console.log(loggedInUser.userStatus);

  return (
    <View>
      <View style={styles.drawerHeader}>
        {loggedInUser.profilePic ? (
          <Avatar.Image
            size={130}
            source={{uri: `${BASE_URL}/${loggedInUser.profilePic}`}}
          />
        ) : (
          <Avatar.Text
            size={130}
            label={loggedInUser.name[0]}
            color={theme.colors.primary}
            style={{backgroundColor: '#F8F8F8'}}
          />
        )}
        <Text
          style={{
            color: '#FFFF',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 5,
          }}>
          {loggedInUser.name}
        </Text>
        <Text style={{color: '#FFFF', fontSize: 14}}>{loggedInUser.phone}</Text>
      </View>

      <ScrollView>
        {routes.map(
          (route, idx) =>
            (route.user === userStatus || !route.user) && (
              <TouchableOpacity
                key={idx}
                onPress={() => navigation.navigate(route.path)}>
                <List.Item
                  title={route.name}
                  left={props => (
                    <MaterialIcon {...props} size={30} name={route.icon} />
                  )}
                />
              </TouchableOpacity>
            ),
        )}
        <List.Item
          onPress={showModal}
          title="Logout"
          left={props => <MaterialIcon {...props} size={30} name="logout" />}
        />
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Text style={{fontSize: 22, paddingBottom: 10}}>Are you sure ? </Text>
          <Text style={{textAlign: 'justify', paddingBottom: 20}}>
            Are you sure you want to log out from this account. You have to
            login again to use your account.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <Button mode="outlined" onPress={hideModal}>
              Cancel
            </Button>
            <Button mode="contained" onPress={() => setLoggedInUser(null)}>
              Yes, Logout
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: theme.colors.primary,
    margin: 0,
    paddingTop: 30,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginLeft: 30,
    marginRight: 30,
    padding: 30,
  },
});

export default DrawerContent;
