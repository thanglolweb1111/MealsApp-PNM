import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Account } from '../data/account'; // Import dữ liệu tài khoản
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Sử dụng context từ AuthContext
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        const user = Account.find(
            (acc) => acc.username === username && acc.password === password
        );
        
        if (user) {
          // Lưu thông tin user vào AuthContext
            login(user);
    
          // Điều hướng tới SettingsScreen qua BottomTab Navigator hoặc Drawer Navigator
          navigation.navigate('Settings'); // Thay đổi từ 'replace' thành 'navigate'
        } else {
            alert('Tài khoản hoặc mật khẩu không đúng!');
        }
    };
    

return (
    <View style={styles.container}>
        <Text style={styles.label}>Tên đăng nhập:</Text>
        <TextInput
            style={styles.input}
            value={username}
                onChangeText={setUsername}
                placeholder="Nhập tên đăng nhập"
            />
        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            secureTextEntry
        />
        <Button title="Đăng nhập" onPress={handleLogin} />
        </View>
    );
};

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    });

export default LoginScreen;
