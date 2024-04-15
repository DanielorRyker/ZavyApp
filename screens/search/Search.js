import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import {getApps, initializeApp} from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { useEffect } from 'react';

if (getApps().length === 0) {
  initializeApp();
}
const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const formatSearchQuery = formatPhoneNumber(searchQuery);
    const usersRef = database().ref('/users');
    if (searchQuery === '') {
      setSearchResults([]);
    } else {
      usersRef.orderByChild('name').startAt(searchQuery).endAt(searchQuery + '\uf8ff')
        .on('value', (snapshot) => {
          let nameResults = snapshot.val() ? Object.values(snapshot.val()) : [];
          usersRef.orderByChild('phoneNumber').equalTo(formatSearchQuery)
            .on('value', (snapshot) => {
              let phoneResults = snapshot.val() ? Object.values(snapshot.val()) : [];
              const combinedResults = [...new Set([...nameResults, ...phoneResults])];
              setSearchResults(combinedResults);
            });
        });
      }}  , [searchQuery]);

      const formatPhoneNumber = (input) => {
        const numbersOnly = input.replace(/\D+/g, '');
        return numbersOnly.replace(/(\d{3})(\d{4})(\d{3})/, '$1 $2 $3');
      };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View
        style={styles.iconHeader}
      >
        <Image
          style={styles.iconHeader}
          source={require("../../icon/back.png")}
        />
      </View>
       <View style={styles.input}>
        <Image 
          style={styles.iconHeader}
          source={require("../../icon/search.png")}
        />
        <TextInput
          style={styles.inputSearch}
          placeholder="Nhập từ khóa tìm kiếm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor={'#919191'}
        />

       
    </View>
    </View>
    <FlatList
        data={searchResults}
        keyExtractor={(item) => item.uid || item.phoneNumber}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Tên: {item.name}</Text>
            <Text style={styles.itemText}>SĐT: {item.phoneNumber}</Text>
            {/* Thêm các trường thông tin khác của người dùng ở đây */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1a1a1a',
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%', 
    height: 55,
    backgroundColor: '#212121',
    borderBottomColor: '#525252',
    borderBottomWidth: 1,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#1a1a1a', 
    width: '70%',
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  iconHeader: {
    width: 20,
    height: 20,
    tintColor: '#ffff', 
    marginHorizontal: 10,
  },

  inputSearch: {
    color: '#ffff',
    fontSize: 16,
    width: '80%',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemText: {
    fontSize: 16,
    color: 'white',
  },

});

export default SearchPage;
