import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeOut from '../screens/HomeOut';
import SignIn_InputPhoneNumber from '../screens/signup/SignUp_InputPhoneNumber';
import SignIn_AuthOTP from '../screens/signup/SignUp_AuthOTP';
import SignIn_InputDisplayName from '../screens/signup/SignUp_InputDisplayName';
import SignIn_InputDetail from '../screens/signup/SignUp_InputDetail';
import SignIn_InputPassword from '../screens/signup/SignUp_InputPassword'; 
import Login from '../screens/Login';

const AuthStack = createStackNavigator();

function AuthNavigator() {

  return (
        <AuthStack.Navigator initialRouteName="HomeOut">
            <AuthStack.Screen name="HomeOut" component={HomeOut} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn_InputPhoneNumber" component={SignIn_InputPhoneNumber} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn_AuthOTP" component={SignIn_AuthOTP} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn_InputPassword" component={SignIn_InputPassword} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn_InputDisplayName" component={SignIn_InputDisplayName} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn_InputDetail" component={SignIn_InputDetail} options={{headerShown: false}}/>
            <AuthStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        </AuthStack.Navigator>
  );
}

export default AuthNavigator;


