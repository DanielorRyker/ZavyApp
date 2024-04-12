import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {initializeApp} from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

initializeApp();
export default function SignIn_AuthOTP() {
  const navigation = useNavigation();
  const route = useRoute();
  const [timer, setTimer] = useState(0);
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    sendOTP();
  }, []);

  const createUserCollection = (uid, phoneNumber) => {
    const userRef = database().ref('users/' + uid);
    userRef.set({
      phoneNumber,
    });
  };

  const sendOTP = async () => {
    const { phoneNumber } = route.params;
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi mã OTP. Vui lòng thử lại.');
    }
    setTimer(60);
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    if (timer === 0) {
      sendOTP();
    }
  };

  const confirmCode = async () => {
    if (!confirmation) {
      Alert.alert('Lỗi', 'Xác thực không khả dụng. Vui lòng gửi lại mã OTP.');
      return;
    }
    try {
      const userCredential = await confirmation.confirm(code);
      if (userCredential) {
        const user = userCredential.user;
        if (user) {
          createUserCollection(user.uid, route.params.phoneNumber);
          Alert.alert('Thông báo', 'Xác thực thành công');
          navigation.navigate('SignIn_InputPassword');
        } else {
          Alert.alert('Lỗi', 'Người dùng không tồn tại');
        }
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Mã xác thực không chính xác');
    }
  };

  const phoneNumber = route.params.phoneNumber;
  const countryCodeLength = phoneNumber.indexOf('0');
  const number = phoneNumber.substring(countryCodeLength);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backHome}>
        <TouchableOpacity onPress={handleBack}>
          <Image style={styles.iconBack} source={require('../../icon/back.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.title}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Nhập mã xác thực</Text>
        <Text style={{ color: "#6c737a", fontSize: 15, marginTop: 10, textAlign: 'center' }}>Nhập dãy số được gửi đến số điện thoại</Text>
        <Text style={{ color: "white", fontSize: 15 }}>{number}</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <OTPTextView
          inputCount={6}
          handleTextChange={(code) => setCode(code)}
          containerStyle={{ marginTop: 20 }}
          textInputStyle={styles.underlineStyleBase}
          testIDPrefix='otp'
        />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TouchableOpacity
          style={{ backgroundColor: '#0068ff', borderRadius: 50, height: 50, width: 300, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
          onPress={confirmCode}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>

<View style={{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  marginLeft: 70,
}}>
  <Text style={{ color: 'white' }}>
    Bạn không nhận được mã? </Text>
  <TouchableOpacity
    style={styles.resendButton}
    onPress={handleResendOTP}
    disabled={timer > 0}
  >
    <Text style={{ color: timer > 0 ? 'gray' : 'blue' }}>
      Gửi lại {timer > 0 ? `(${timer}s)` : ''}
    </Text>
  </TouchableOpacity>
</View>

<TouchableOpacity style={styles.questionIcon}>
  <Image style={{ width: 20, height: 20 }} source={require('../../icon/question.png')} />
  <Text style={{ color: '#0068ff' }}> Tôi cần hỗ trợ thêm về mã xác thực </Text>
</TouchableOpacity>

</View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#1a1a1a',
  color: 'white',
},
backHome: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 15,
  marginTop: 50,
},
iconBack: {
  width: 20,
  height: 20,
},
title: {
  alignItems: 'center',
  marginTop: 30,
},
underlineStyleBase: {
  color: 'white',
  borderBottomWidth: 2,
  borderBottomColor: '#0068ff',
  fontSize: 20,
  fontWeight: 'bold',
},
resendButton: {
  marginLeft: 5,
},
questionIcon: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},
});