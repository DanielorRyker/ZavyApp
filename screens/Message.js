// import React, { Component } from 'react';
// import { View, Text, TextInput, Button, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// class Message extends Component {
//   state = {
//     message: '',
//     messages: [],
//     avatar: null,
//     image: null,
//   };

//   sendMessage = () => {
//     this.setState(prevState => ({
//       messages: [...prevState.messages, { text: prevState.message, image: prevState.image }],
//       message: '',
//       image: null,
//     }));
//   };

//   chooseImage = () => {
//     ImagePicker.showImagePicker({}, response => {
//       if (!response.didCancel && !response.error) {
//         this.setState({ image: response.uri });
//       }
//     });
//   };

//   render() {
//     return (
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
//         <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
//           <Image source={{ uri: this.state.avatar }} style={{ width: 50, height: 50, borderRadius: 25 }} />
//           <Text style={{ marginLeft: 10 }}>Tên người dùng</Text>
//         </View>
//         <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
//           {this.state.messages.map((message, index) => (
//             <View key={index}>
//               {message.image ? <Image source={{ uri: message.image }} style={{ width: 200, height: 200 }} /> : null}
//               <Text>{message.text}</Text>
//             </View>
//           ))}
//         </ScrollView>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TouchableOpacity onPress={this.chooseImage}>
//             <Text>Chọn hình ảnh</Text>
//           </TouchableOpacity>
//           <TextInput
//             value={this.state.message}
//             onChangeText={message => this.setState({ message })}
//             placeholder="Nhập tin nhắn của bạn..."
//             style={{ flex: 1 }}
//           />
//           <Button title="Gửi" onPress={this.sendMessage} />
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// export default Message;
