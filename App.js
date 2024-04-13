// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import HomeOut from './screens/HomeOut';
import SignIn_InputPhoneNumber from './screens/signin/SignIn_InputPhoneNumber';
import SignIn_AuthOTP from './screens/signin/SignIn_AuthOTP';
import SignIn_InputDisplayName from './screens/signin/SignIn_InputDisplayName';
import SignIn_InputDetail from './screens/signin/SignIn_InputDetail';
import SignIn_InputPassword from './screens/signin/SignIn_InputPassword'; 
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn_InputDetail" >
        <Stack.Screen name="HomeOut" component={HomeOut} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn_InputPhoneNumber" component={SignIn_InputPhoneNumber} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn_AuthOTP" component={SignIn_AuthOTP} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn_InputDisplayName" component={SignIn_InputDisplayName} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn_InputDetail" component={SignIn_InputDetail} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn_InputPassword" component={SignIn_InputPassword} options={{headerShown: false}}/>
        <Stack.Screen name="Message" component={Message} options={{headerShown: false}}/>
        <Stack.Screen name="MessageGr" component={MessageGr} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
