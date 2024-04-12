import React, {useState} from "react";
import {StyleSheet,Text,View,Image,TouchableOpacity,Alert, TextInput} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";

export default function SignIn_InputDisplayName() {
    return(

        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                    Nhập tên Zavy
                </Text>
                <Text style={{ color: "#727881", fontSize: 15, marginTop: 10 }}> Hãy dùng tên thật để mọi người nhận ra bạn d</Text>
            </View>

            <View style={styles.inputName}>
                <TextInput
                    style={styles.input}
                    onChangeText={''}
                    placeholder="Nguyễn Văn A"
                    placeholderTextColor={'gray'}
                    underlineColorAndroid='transparent'
                />
            </View> 
            <View style={styles.validateTextGroup}>
                <Text style={styles.validateText}>• Dài từ 2 đến 40 ký tự</Text>
                <Text style={styles.validateText}>• Không chứa số</Text>
                <Text style={styles.validateText}>
    {'• Cần tuân thủ'} 

    <Text style={{color: '#0067fd'}}> quy tắc đặt tên của Zavy</Text>
</Text>
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

    inputName: {
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