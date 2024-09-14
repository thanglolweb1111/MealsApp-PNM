import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { authState, logout } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;
  const user = authState.user;
  console.log(user);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: isLoggedIn ? user.avatar : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>
        {isLoggedIn ? user.name : 'Chưa đăng nhập'}
      </Text>
      <View style={styles.buttonContainer}>
        {!isLoggedIn ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')} 
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              logout(); 
              console.log('Đăng xuất');
            }}
          >
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
