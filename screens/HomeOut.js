
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function HomeOut() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('SignIn_InputPhoneNumber');
  };

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" style={styles.page}>
          <Image source={require('../image/chuzavy.png')} style={styles.img_home}/>
        </View>

        <View key="2" style={styles.page}>
          <Image source={require('../image/chuzavy.png')} style={styles.img_home}/>
        </View>

        <View key="3" style={styles.page}>
          <Image source={require('../image/chuzavy.png')} style={styles.img_home}/>
        </View>
      </PagerView>
      <View>
        <TouchableOpacity style={styles.buttonLogin} onPress={handleLoginPress}>
          <Text style={{color: 'white', fontSize: 16}}> Đăng nhập </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}
         onPress={handleRegisterPress}>
          <Text style={{color: 'white', fontSize: 16}}> Tạo tài khoản mới </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  img_home: {
    width: width,
    height: height,
  },

  scrollHomeOut: {
    flex: 1,
    width: '100%',
    padding: 20,
  },

  buttonLogin: {
    width: 300,
    height: 50,
    backgroundColor: '#0068ff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },

  buttonRegister: {
    width: 300,
    height: 50,
    backgroundColor: '#3d3d3d',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  pagerView: {
    width: '100%',
    height: '50%',
  },

  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
