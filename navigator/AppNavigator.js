import React from 'react';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ChatList from '../screens/chat/ChatList';
import { View, TextInput, TouchableOpacity, Image,StyleSheet } from 'react-native';

const AppStack = createStackNavigator();

function AppNavigator() {
  const [search, setSearch] = useState(''); 
  return (
<View style= {styles.container}>
        <View style= {styles.header}> 
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity>
                    <Image style={styles.iconHeader} source={require('../icon/search.png')}></Image>
                </TouchableOpacity>
                        
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    onChangeText={setSearch} 
                    placeholder="Tìm kiếm"
                    placeholderTextColor={'gray'}
                />  
            </View>
                             
            <TouchableOpacity>
                <Image style={styles.iconHeader} source={require('../icon/plus.png')}></Image>
            </TouchableOpacity>    
        </View>

    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <AppStack.Screen name="ChatList" component={ChatList} options={{headerShown: false}}/>
    </AppStack.Navigator>

<View style={styles.footer}>
    <TouchableOpacity >
        <Image style={styles.iconFooter} source={require('../icon/message.png')} />
    </TouchableOpacity>
    <TouchableOpacity >
        <Image style={styles.iconFooter} source={require('../icon/contact.png')} />
    </TouchableOpacity>
    <TouchableOpacity >
        <Image style={styles.iconFooter} source={require('../icon/user.png')} />
    </TouchableOpacity>
    </View>
</View>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
  },
  header:{
      flexDirection: "row",
      justifyContent:"space-around",
      alignItems:"center",
      marginTop: 40,
      paddingVertical: 5,
      paddingHorizontal: 30,
      backgroundColor: '#222222',
  },
  input:{
      width: "100%",
      textAlign: "left",
      height: 40,
      

  },
 body:{
      backgroundColor : 'black',
      flex:1
  },


  
  footer:{
      flex:0.08,
      alignItems: "center",
      flexDirection: "row",
      justifyContent:"space-around",
      backgroundColor: '#222222',
      
  },

  iconFooter:{
      width: 30,
      height: 30,
      tintColor: '#0067fd'
  },

  iconHeader:{
      width: 25,
      height: 25,
      tintColor: '#0067fd'
  }

});
