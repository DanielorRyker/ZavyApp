import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";
import { getApps, initializeApp } from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";


if (getApps().length === 0) {
  initializeApp();
}

export default function SignIn_InputDetail() {
  const navigation = useNavigation();

  //Date modal
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [birthDate, setBirthDate] = useState("Ngày sinh ");

  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    const now = new Date();
    const fourteenYearsAgo = new Date(
      now.getFullYear() - 14,
      now.getMonth(),
      now.getDate()
    );

    if (currentDate <= fourteenYearsAgo) {
      setDate(currentDate);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const dateString = `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year} `;
      setBirthDate(dateString);
    } else {
      Alert.alert("Thông báo", "Bạn phải đủ 14 tuổi để sử dụng Zavy.");
    }
    setShow(false);
  };
  const [gender, setGender] = useState("Giới tính");


  const handleContinue = () => {
    if (birthDate === "Ngày sinh " || gender === "Giới tính") {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
  
    const user = auth().currentUser;
    if (user && user.uid) {
      const userRef = database().ref("users/" + user.uid);
      userRef.update({
        birthDate: birthDate,
        gender: gender,
      })
      .then(() => {
        Alert.alert("Thông báo", "Đăng ký tài khoản thành công!");
        navigation.navigate("HomeOut");
      })
      .catch((error) => {
        console.error("Lỗi khi lưu thông tin người dùng: ", error);
        Alert.alert("Thông báo", "Đã xảy ra lỗi. Vui lòng thử lại sau.");
      });
    } else {
      Alert.alert("Thông báo", "Không tìm thấy người dùng hiện tại.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          Thêm thông tin cá nhân
        </Text>
      </View>

            <View style={styles.inputDetail}>
                
                <TouchableOpacity
                    style={styles.selected}
                    onPress={showDatePicker}
                >
                    <Text style={styles.textBirthDate}>Ngày sinh </Text>
                    <Image style={styles.iconSelected} source={require('../../icon/icon-calendar.png')}/>
                </TouchableOpacity>
 
      

                <TouchableOpacity
                    style={styles.selected}

                >
                    <Text style={styles.textBirthDate}>Giới tính </Text>
                    <Image style={styles.iconSelected} source={require('../../icon/icon-drop-down.png')} />
                </TouchableOpacity>
                
            <Picker
                selectedValue={selectedValue}
                style={styles.inputGender}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
            </Picker>
            </View> 

      <View style={{ marginTop: 40, alignItems: "center" }}>
        <TouchableOpacity style={styles.button}
            onPress={handleContinue}
        >
          <Text style={{ color: "white", fontSize: 15 }}> Tiếp tục </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },

  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  button: {
    backgroundColor: "#0067fd",
    borderRadius: 50,
    width: 325,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  inputDetail: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  selected: {
    width: 325,
    height: 50,
    borderRadius: 10,
    color: "white",
    paddingLeft: 20,
    borderColor: "#727881",
    marginTop: 20,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconSelected: {
    width: 25,
    height: 25,
    marginRight: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.9,
  },
});
