import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { getApps, initializeApp } from "@react-native-firebase/app";
import database from "@react-native-firebase/database";

if (getApps().length === 0) {
  initializeApp();
}

export default function SignIn_InputPassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRoute();

  const handlePasswordInput = (field, text) => {
    if (field === "password") {
      setPassword(text);
      validatePasswordCheck(text);
    } else if (field === "confirmPassword") {
      setConfirmPassword(text);
      if (text !== password) {
        setErrorMessage("Mật khẩu xác nhận không khớp");
      } else {
        setErrorMessage("");
      }
    }
  };

  const validatePasswordInput = (password) => {
    if (password.length < 8) {
      return "Mật khẩu phải chứa ít nhất 8 ký tự";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
    }

    if (!/[A-Z]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa";
    }

    if (!/[0-9]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất 1 chữ số";
    }

    return null;
  };

  const handleContinue = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage("Vui lòng không để trống mật khẩu hoặc mật khẩu xác nhận");
    } else if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp");
    } else {
      const validationResult = validatePasswordInput(password);
      if (validationResult === null) {
        try {
          const user = auth().currentUser;
          if (user && user.uid) {
            // Lưu mật khẩu vào cơ sở dữ liệu Firebase
            const userRef = database().ref("users/" + user.uid);
            await userRef.update({
              password: password,
            });
            navigation.navigate("SignIn_InputDisplayName");
          }
        } catch (error) {
          setErrorMessage("Đã xảy ra lỗi khi cập nhật mật khẩu");
        }
      } else {
        setErrorMessage(validationResult);
      }
    }
  };

  const [lengthCheck, setLengthCheck] = useState(false);
  const [specialCharCheck, setSpecialCharCheck] = useState(false);
  const [uppercaseCheck, setUppercaseCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);

  const validatePasswordCheck = (password) => {
    setLengthCheck(password.length >= 8);
    setSpecialCharCheck(/[!@#$%^&*]/.test(password));
    setUppercaseCheck(/[A-Z]/.test(password));
    setNumberCheck(/[0-9]/.test(password));
  };
  
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                    Nhập mật khẩu mới
                </Text>
            </View>

            <View style={styles.inputPassword}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handlePasswordInput('password', text)}
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor={'gray'}
                    underlineColorAndroid='transparent'
                    passwordRules={'required: lower; required: upper; required: digit; required: length(8,); required: special;'}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handlePasswordInput('confirmPassword', text)}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor={'gray'}
                    underlineColorAndroid='transparent'
                    passwordRules={'required: lower; required: upper; required: digit; required: length(8,); required: special;'}
                    secureTextEntry={true}
                />

               
            </View> 
            {errorMessage ? <Text style={{color: 'red', marginLeft: 30, marginTop:10}}>* {errorMessage}</Text> : null}
            <View style={styles.validateTextGroup}>
                <Text style={styles.validateText}>
                    {lengthCheck ? '✅' : '❌'} • Mật khẩu chứa ít nhất 8 kí tự
                </Text>
                <Text style={styles.validateText}>
                    {specialCharCheck ? '✅' : '❌'} • Có ít nhất 1 ký tự đặt biệt
                </Text>
                <Text style={styles.validateText}>
                    {uppercaseCheck ? '✅' : '❌'} • Có ít nhất 1 chữ cái viết hoa
                </Text>
                <Text style={styles.validateText}>
                    {numberCheck ? '✅' : '❌'} • Có ít nhất 1 chữ số
                </Text>
            </View>

            <View style={{marginTop:40, alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleContinue()}
                >
                    <Text style={{color:'white', fontSize: 15}}> Tiếp tục </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },

    inputPassword: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    validateText:{
        color: '#727881',
        fontSize: 15,
    },

    input: {
        width: 325,
        height: 60,
        borderRadius: 10,
        color: 'white',
        paddingLeft: 20,
        borderColor: '#0067fd',
        marginTop: 20,
        borderWidth: 1,
    },

    validateTextGroup: {
        justifyContent: 'center',

        marginTop: 20,
        marginLeft: 40,
    },

    button: {
        backgroundColor: '#1a1a1a',
        backgroundColor: '#0067fd',
        borderRadius: 50,
        width: 325,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});