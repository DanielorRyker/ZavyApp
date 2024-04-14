import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getApps, initializeApp } from '@react-native-firebase/app';
import PhoneInput from "react-native-international-phone-number";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../status/AuthContext'; // Đường dẫn tới file AuthContext của bạn

if (getApps().length === 0) {
  initializeApp();
}

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { logIn } = useContext(AuthContext); // Sử dụng AuthContext

  const handleInputValue = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  }

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
  }

  const handleLogin = async () => {
    if (phoneNumber !== '' && password !== '') {
      const usersRef = database().ref('users');
  
      usersRef.orderByChild('phoneNumber').equalTo(phoneNumber).once('value')
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const uid = Object.keys(userData)[0]; 
         
            if (userData[uid].password === password) {
              Alert.alert('Thông báo', 'Đăng nhập thành công!');          
              logIn(); // Cập nhật trạng thái đăng nhập
              navigation.navigate('Home');
            } else {
              Alert.alert('Thông báo', 'Mật khẩu không đúng.');
            }
          } else {
            Alert.alert('Thông báo', 'Số điện thoại không tồn tại trong hệ thống.');
          }
        })
        .catch((error) => {
          Alert.alert('Thông báo', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
        });
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại và mật khẩu.');
    }
  };
  

  const backHome = () => {
    navigation.navigate('HomeOut');
  };

  return (
    <View style={styles.container}>

    <View style={styles.backHome}>
            <TouchableOpacity onPress={backHome}>
                <Image style={styles.iconBack} source={require("../icon/back.png")}></Image>
                
            </TouchableOpacity>
        <Text style={styles.title}>Đăng nhập</Text>
    </View>
    <View style={styles.noTification}>
        <Text style={{color: 'white'}} >Vui lòng nhập số điện thoại và mật khẩu để đăng nhập </Text>
    </View>

   <View style={{paddingHorizontal:15, marginTop: 20}}>
      <View>
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
      height: 45,
      width: "100%",
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderColor: '#747780',
      marginBottom: 10,
      border : 'none',
    },
    input: {
      color: "white",
      fontSize: 18,
      fontWeight: '500',
      backgroundColor: "#1a1a1a",
    },
    placeholder: {
      color: "#747780",
    },
    callingCode: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#747780",
    },
    flagContainer: {
      backgroundColor: "#1a1a1a",
    },
    
  }}
  allowEmpty
  allowZeroPrefix
/>

      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Mật khẩu"
        placeholderTextColor={'gray'}
        
      />
      <TouchableOpacity style={styles.recover}>
            <Text style = {{color : '#0286ff'}}>Lấy lại mật khẩu </Text>
      </TouchableOpacity>
      </View>

    
       
    <View style={{marginTop: 430, flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
      <TouchableOpacity style={styles.question}>
            <Text style = {{color : '#747780'}}>Câu hỏi thường gặp  </Text>
            <Image style={{width: 15, height : 15, marginTop: 4, tintColor:"#747780"}} source={require("../icon/right-arrow.png")}/>
            
      </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: '#1a1a1a', borderRadius:60, width:50, height:50, justifyContent:'center', alignItems: 'center'}}
        onPress={() => handleLogin()}
        >
      <Image style={{width: 50, height : 50, alignItems:'flex-end', tintColor:"#0286ff"}} source={require("../icon/circle_arrow.png")}/>
      </TouchableOpacity>      
     </View>

     </View>
    </View>
        
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#1a1a1a"
  },
  title: {
    color : '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20

    
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth:1,
    marginBottom: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  noTification:{
    height:50,
    backgroundColor: "black",
    justifyContent:'center',
    alignItems:'center',
  },

  backHome:{
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 5,
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 5
  },

  recover:{
    paddingBottom:10,
    paddingTop:20,
    
  },
  question:{
    flexDirection: 'row',
  },

  iconBack:{
    width: 27,
    height: 27,
  }
  });

