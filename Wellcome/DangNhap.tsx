import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { auth } from '../Firebase/Firebaseconfig'; // Import cấu hình Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

const DangNhap = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      // Đăng nhập với Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      
      // Thông báo thành công
      Alert.alert('Thành công', 'Bạn đã đăng nhập thành công');
      
      // Chuyển hướng đến màn Home
      navigation.navigate('MainStack');
    } catch (e) {
      console.error(e);
      // Hiển thị thông báo lỗi
      Alert.alert('Lỗi', 'Đăng nhập không thành công');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} 
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../img/login_graphic.png')}
        style={{ width: 300, height: 300 }}
      />
      <View style={styles.login}>
        <Text style={styles.header}>Đăng Nhập</Text>
        <Text style={styles.subHeader}>Đăng nhập để tiếp tục</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={signIn}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DangKi')}>
            <Text style={styles.registerLink}>Đăng Kí</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fixedCirclesContainer}>
        <LinearGradient colors={['#220A40', '#883997']} style={styles.halfCircleLeft} />
        <LinearGradient colors={['#220A40', '#883997']} style={styles.halfCircleRight} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default DangNhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7F1',
    alignItems: 'center',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#220A40',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    color: '#220A40',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#220A40',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#220A40',
    fontSize: 16,
  },
  registerLink: {
    color: '#220A40',
    fontSize: 16,
    fontWeight: 'bold',
  },fixedCirclesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCircleLeft: {
    width: 70,
    height: 70,
    borderTopRightRadius: 50,
  },
  halfCircleRight: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 50,
  },
  login: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -40,
    padding: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
