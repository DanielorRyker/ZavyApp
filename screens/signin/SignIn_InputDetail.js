import React, {useState, useRef} from "react";
import {StyleSheet,Text,View,Image,TouchableOpacity,Alert, TextInput, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function SignIn_InputDetail() {
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState('');

   
    return(

        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                    Thêm thông tin cá nhân
                </Text>
            </View>

            <View style={styles.inputDetail}>
                
                <TouchableOpacity
                    style={styles.selected}
                    onPress={showDatePicker}
                >
                    <Text style={styles.textBirthDate}>Ngày sinh </Text>
                    <Image style={styles.iconSelected} source={require('../../icon/icon-calendar.png')}/>
                </TouchableOpacity>
 
      

                <TouchableOpacity
                    style={styles.selected}

                >
                    <Text style={styles.textBirthDate}>Giới tính </Text>
                    <Image style={styles.iconSelected} source={require('../../icon/icon-drop-down.png')} />
                </TouchableOpacity>
                
            <Picker
                selectedValue={selectedValue}
                style={styles.inputGender}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
            </Picker>
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

    button: {
        backgroundColor: '#0067fd',
        borderRadius: 50,
        width: 325,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    selected: {
        width: 325,
        height: 50,
        borderRadius: 10,
        color: 'white',
        paddingLeft: 20,
        borderColor: '#727881',
        marginTop: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textBirthDate: {
        color: '#727881',
        fontSize: 15,
    },

    iconSelected: {
        width: 25,
        height: 25,
        marginRight: 20,
    },
});