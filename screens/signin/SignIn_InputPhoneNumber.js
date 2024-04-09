import React, {useState} from "react";
import {StyleSheet,Text,View,Image,TouchableOpacity,Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import PhoneInput from "react-native-international-phone-number";
import {CheckBox} from "react-native-elements";

export default function SignIn_InputPhoneNumber() {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [isSelected_2, setSelection_2] = useState(false);

  const handleInputValue = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleContinue = () => {
    if (!isSelected || !isSelected_2) {
      Alert.alert('Thông báo', 'Vui lòng đồng ý với tất cả điều khoản của Zavy');
    } else if (!phoneNumber) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
    } else {
      
      const fullPhoneNumber = phoneNumber.startsWith('0')
        ?
      `${selectedCountry.callingCode}${phoneNumber}`
        :
      `${selectedCountry.callingCode}0${phoneNumber}`;
      
      navigation.navigate('SignIn_AuthOTP', { phoneNumber: fullPhoneNumber });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backHome}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            style={styles.iconBack}
            source={require("../../icon/back.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.title}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          Nhập số điện thoại
        </Text>
      <View style={{ width: "100%", padding: 30 }}>
      <PhoneInput
        value={phoneNumber}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        defaultCountry="VN"
        placeholder="Nhập số điện thoại"
        theme="dark"
        phoneInputStyles={{
          container: {
            backgroundColor: "#1a1a1a",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#256ad3",
            height: 50
          },
          input: {
            color: "white",
          },
          placeholder: {
            color: "#4d4d4d",
          },
          callingCode: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#F3F3F3",
          },
          flagContainer: {
            backgroundColor: "#001029",
          },
        }}
        allowEmpty
        allowZeroPrefix
      />
      </View>
      <View style={{width:'auto'}}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            textStyle={styles.checkboxText}
            containerStyle={styles.checkbox}
          />
        <View style= {{paddingLeft: -30, flexDirection: 'row', marginTop: -5}}>
          <Text style={styles.checkboxLabel}>
            Tôi đồng ý với các{' '}
          </Text>
          <TouchableOpacity>
              <Text style={styles.checkboxLink}> điều khoản sử dụng Zavy </Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isSelected_2}
            onPress={() => setSelection_2(!isSelected_2)}
            textStyle={styles.checkboxText}
            containerStyle={styles.checkbox}
          />
          <View style= {{paddingLeft: -30, flexDirection: 'row', marginTop: -5}}>
            <Text style={styles.checkboxLabel}>
            Tôi đồng ý với{' '}
          </Text><TouchableOpacity>
              <Text style={styles.checkboxLink}> điều khoản Mạng xã hội của Zavy </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
        style={styles.continueButton(phoneNumber, isSelected, isSelected_2)}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 120,
        }}
      >
        <Text style={{ color: "white" }}>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "blue" }}> Đăng nhập ngay </Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    color: "white",
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
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#000",
  },
  checkboxTick: {
    color: "#fff",
    fontWeight: "bold",
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  checkbox: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  checkboxText: {
    color: 'white',
  },
  checkboxLabel: {
    color: 'white',
    flexDirection: 'row',
  },

  checkboxLabel1: {
    color: 'white',
    flexDirection: 'row',

  }, 
  checkboxLink: {
    color: 'blue',
  },

  continueButton: (phoneNumber, isSelected, isSelected_2) => ({
    backgroundColor: phoneNumber && isSelected && isSelected_2 ? '#0068ff' : '#4d4d4d',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  }),

  continueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
