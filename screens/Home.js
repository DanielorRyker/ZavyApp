import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const navigation = useNavigation();
    const [inputSearch, setSearch] = useState('');

    
      
    return(
        <View style={styles.container}>


            <SafeAreaView style= {styles.header}>
                <View style={styles.groupSearch}>
                    <Image style={styles.iconSearch} source={require('../icon/search.png')}></Image>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        onChangeText={setSearch}
                        secureTextEntry={true}
                        placeholder="Tìm kiếm"
                        placeholderTextColor={'gray'}
                    />
                </View>
                    <Image style={styles.iconPlus} source={require('../icon/plus.png')}></Image>
            </SafeAreaView>
            
            <SafeAreaView style={styles.betWeen}>
                
            </SafeAreaView>
            
        
            <SafeAreaView style={styles.Under}>
                <TouchableOpacity >
                    <Image style={styles.iconMessega} source={require('../icon/message.png')} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image style={styles.iconContact} source={require('../icon/contact.png')} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image style={styles.iconUser} source={require('../icon/user.png')} />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    groupSearch:{
        flexDirection: "row"
    },
    header:{
        flexDirection: "row",
        justifyContent:"space-between",
        borderWidth : 1,
        padding : 13
        
    },
    input:{
        width: 70,
        height: 20,
        paddingRight : 10
        

    },
    iconPlus :{
        height:20,
        width : 20,
        tintColor : '#a5a5a5'
    },
    iconSearch:{
        marginRight:20,
        height:20,
        width : 20,
        justifyContent:'flex-end',
        tintColor : '#a5a5a5'
    },
    betWeen:{
        backgroundColor : 'black',
        paddingTop : 650,
    },
  

    
    Under:{
        flexDirection: "row",
        justifyContent:"space-between",
        flex:0.2,
        alignItems:'center',
        paddingHorizontal: 30
        
    },
    iconContact:{
        tintColor : '#a5a5a5'
    },
    iconUser:{
        tintColor : '#a5a5a5',
        
    },
    iconMessega:{
        tintColor : '#a5a5a5'
    },
});
