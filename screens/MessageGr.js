import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, Platform, StyleSheet, Keyboard } from 'react-native';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { color } from 'react-native-elements/dist/helpers';
import EmojiSelector from 'react-native-emoji-selector';
import ImagePicker from 'react-native-image-picker';

const images = {
  microphone: require('../icon/microphone.png'),
  microphoneActive: require('../icon/microphone-active.png'),
  emoji: require('../icon/emoji.png'),
  image: require('../icon/images.png'),
  searchWhite: require('../icon/searchWhite.png'),
  videocall: require('../icon/videocall.png'),
  menu: require('../icon/menu.png'),
  backHome :require('../icon/back.png'),
};

export default function MessageGr() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, image: image, audio: audioFile} 
    ]);
    setMessage('');
    setImage(null);
    setAudioFile(null);
  };

  const startRecording = async () => {
    const path = Platform.OS === 'android' ? 'hello.m4a' : 'sdcard/hello.mp4';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(() => {
      return;
    });
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioFile(result);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
    setIsRecording(prevIsRecording => !prevIsRecording);
  };

  const chooseImage = () => {
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response);
      }
    });
  };

  const uploadImage = () => {
    if (image) {
      const data = new FormData();
      data.append('name', 'avatar');
      data.append('fileData', {
        uri: image.uri,
        type: image.type,
        name: image.fileName
      });

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
        body: data,
      };

      fetch("YOUR_SERVER_URL", config)
        .then((checkStatusAndGetJSONResponse) => { /*...*/ })
        .then((json) => { /*...*/ });
    }
  };

  const handleEmojiSelected = emoji => {
    setMessage(prevMessage => prevMessage + emoji);
  };

  const changeKeyboardColor = () => {
    const color = keyboardColor === 'gray' ? 'white' : 'gray';
    setKeyboardColor(color);
    Keyboard.setBackgroundColor(color);
  };
  const backHome = () => {
    navigation.navigate('Home');
  };

  return (
    
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container ]}>
      <View style={styles.userContainer}>
      <TouchableOpacity onPress={backHome}>
                <Image source={images.backHome} style ={styles.iconback} ></Image>   
            </TouchableOpacity>
        <Text style={styles.username}>Tên người dùng</Text>
        
        <View style = {styles.taskbar}>
            <Image source={images.videocall} style={styles.videocall}/>
            <Image source={images.searchWhite} style={styles.searchWhite}/>
            <Image source={images.menu} style={styles.menu}/>
            
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index}>
            {message.image && <Image source={{ uri: message.image }} style={styles.image} />}
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chat}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={chooseImage} style={styles.iconButton}>
          <Image source={images.image} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleRecording} style={styles.iconButton}>
          <Image source={isRecording ? images.microphoneActive : images.microphone} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)} style={styles.emoji}>
      <Image source={images.emoji} style={styles.icon} />
    </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Tin nhắn..."
          style={{...styles.input, color: '#747682'}}
        />
        <Button title="Gửi" onPress={sendMessage} />
        {showEmojiPicker && (
      <EmojiSelector
        onEmojiSelected={handleEmojiSelected}
      />
    )}
      </View>
      </View>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#1a1a1a"
    
  },
  

  userContainer: {
    height : 90,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222222',

  },
  
  
  username: {
    marginTop : 15,
    color : '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 8,
    
  },
  icon: {
    width: 24,
    height: 24,
  },
 
  input: {
    flex: 1,
    color : 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,

  },
  taskbar:{
    
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems : 'center',
    flex:1,
    
    marginTop: 50,
    marginLeft: 5,
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 5
    
    
  },
  searchWhite:{
    width: 25,
    height: 25,
  },
  menu:{
    width: 20,
    height: 20,
  },
  videocall:{
    width: 25,
    height: 25,
  },
  backHome:{
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 5,
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 5
  },
  iconback:{
    width: 30,
    height: 30,
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 5,
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 5
  },
chat:{
    backgroundColor: '#222222',
    height: 50,
    alignItems : 'center',
},
});