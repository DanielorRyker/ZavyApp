import React, {useState} from "react";
import {StyleSheet,Text,View,Image,TouchableOpacity,Alert, TextInput} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";

export default function SignIn_InputPassword() {
    return(

        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                    Nhập mật khẩu mới
                </Text>
            </View>

            <View style={styles.inputPassword}>
                <TextInput
                    style={styles.input}
                    onChangeText={''}
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor={'gray'}
                    underlineColorAndroid='transparent'
                    passwordRules={'required: lower; required: upper; required: digit; required: [-]; required: length(8,);'}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={''}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor={'gray'}
                    underlineColorAndroid='transparent'
                    passwordRules={'required: lower; required: upper; required: digit; required: [-]; required: length(8,);'}
                    secureTextEntry={true}
               />
            </View> 
            <View style={styles.validateTextGroup}>
                <Text style={styles.validateText}>• Mật khẩu chứa ít nhất 8 kí tự</Text>
            </View>

            <View style={{marginTop:40, alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={() => {
                    //     navigation.navigate('SignIn_InputDetail');
                    // }}
                >
                    <Text style={{color:'white', fontSize: 15}}> Tiếp tục </Text>
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

    inputPassword: {
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
        marginTop: 20,
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