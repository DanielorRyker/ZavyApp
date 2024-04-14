// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import AppNavigator from './navigator/AppNavigator';
import { AuthProvider } from './status/AuthProvider';
import { AuthContext } from './status/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ isLoggedIn }) => (isLoggedIn ? <AppNavigator /> : <AuthNavigator />)}
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider> 
  );
}

export default App;
