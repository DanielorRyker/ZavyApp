import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

 


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
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Số điện thoại"
        placeholderTextColor={'gray'}
        underlineColorAndroid='transparent'
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

        <TouchableOpacity style={{backgroundColor: '#1a1a1a', borderRadius:60, width:50, height:50, justifyContent:'center', alignItems: 'center'}}>
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

