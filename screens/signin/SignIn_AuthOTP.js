import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput'; // Thay đổi ở đây
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function SignIn_AuthOTP() {
  const navigation = useNavigation();
  const route = useRoute();
  const [timer, setTimer] = useState(0);

  function createUserCollection(uid, phoneNumber) {
    const userRef = database().ref('users/' + uid);
    userRef.set({
      phoneNumber,
    });
  }

  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    sendOTP();
  }, []);

  const sendOTP = async () => {
    const { phoneNumber } = route.params;
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmation);
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
      if (confirmation && typeof confirmation.confirm === 'function') {
        await confirmation.confirm(code);
        const uid = confirmation.user.uid;
        const phoneNumber = confirmation.user.phoneNumber;
        createUserCollection(uid, phoneNumber);
        navigation.replace('Home');
      } else {
        Alert.alert('Lỗi', 'Đối tượng xác thực không hợp lệ.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Mã OTP không hợp lệ. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác thực OTP</Text>
      
      <OTPTextInput // Thay đổi ở đây
        inputCount={6} // Số lượng ô nhập OTP
        handleTextChange={setCode} // Hàm xử lý khi text thay đổi
        tintColor="blue"
        offTintColor="gray"
        containerStyle={styles.otpInput}
        textInputStyle={styles.otpInputBox}
      />
  
      <TouchableOpacity
        style={styles.resendButton}
        onPress={handleResendOTP}
        disabled={timer !== 0}
      >
        <Text style={styles.resendButtonText}>
          {timer === 0 ? 'Gửi lại mã OTP' : `Gửi lại sau ${timer}s`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={confirmCode}>
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resendButton: {
    marginBottom: 20,
  },
  resendButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});