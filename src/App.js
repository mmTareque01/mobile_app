import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Provider as ThemeProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import theme from './theme/theme';
import AppNavigator from './navigation/AppNavigator';

export const UserContext = React.createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.primary} />
        <UserContext.Provider
          value={{
            user: [loggedInUser, setLoggedInUser],
          }}>
          <NavigationContainer>
            {loggedInUser ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
