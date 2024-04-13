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
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { getApps, initializeApp } from "@react-native-firebase/app";
import database from "@react-native-firebase/database";

if (getApps().length === 0) {
  initializeApp();
}

export default function SignIn_InputDisplayName() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [lengthCheck, setLengthCheck] = useState(false);
  const [specialCharCheck, setSpecialCharCheck] = useState(false);
  const [uppercaseCheck, setUppercaseCheck] = useState(false);
  const [wordCheck, setWordCheck] = useState(false);

  const validateNameCheck = (name) => {
    const words = name.split(' ');
    setLengthCheck(name.length >= 2 && name.length <= 40);
    setSpecialCharCheck(!/\d/.test(name) && !/[!@#$%^&*]/.test(name));
    setUppercaseCheck(/(\p{Lu}\p{Ll}*)(\s\p{Lu}\p{Ll}*)*$/gu.test(name));
    setWordCheck(words.length >= 2);
  };
  
  const handleNameInput = (text) => {
    text = text.trim();
    setName(text);
    validateNameCheck(text);
  };

  const handleContinue = async () => {
    if (lengthCheck && specialCharCheck && uppercaseCheck && wordCheck) {
      try {
        const user = auth().currentUser;
        if (user && user.uid) {
          // Lưu tên người dùng vào cơ sở dữ liệu Firebase
          const userRef = database().ref("users/" + user.uid);
          await userRef.update({
            name: name,
          });
          navigation.navigate("SignIn_InputDetail");
        }
      } catch (error) {
        Alert.alert("Thông báo", "Đã xảy ra lỗi khi cập nhật tên");
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng kiểm tra lại thông tin");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          Nhập tên Zavy
        </Text>
        <Text style={{ color: "#727881", fontSize: 15, marginTop: 10 }}>
          Hãy dùng tên thật để mọi người nhận ra bạn
        </Text>
      </View>

      <View style={styles.inputName}>
        <TextInput
          style={styles.input}
          placeholder="Nguyễn Văn A"
          placeholderTextColor={"gray"}
          onChangeText={handleNameInput}
        />
      </View>
      <View style={styles.validateTextGroup}>
        <Text style={styles.validateText}>
          {lengthCheck ? "✅" : "❌"} Tên từ 2 đến 40 ký tự
        </Text>
        <Text style={styles.validateText}>
          {specialCharCheck ? "✅" : "❌"} Không chứa số và ký tự đặt biệt
        </Text>
        <Text style={styles.validateText}>
          {uppercaseCheck ? "✅" : "❌"} Chữ cái đầu trong từ phải viết hoa
        </Text>
        <Text style={styles.validateText}>
          {wordCheck ? "✅" : "❌"} Tên phải chứa ít nhất hai từ
        </Text>
      </View>

      <View style={{ marginTop: 40, alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={{ color: "white", fontSize: 15 }}> Tiếp tục </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

    inputName: {
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