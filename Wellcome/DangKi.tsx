import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import { auth, firestore, serverTimestamp } from '../Firebase/firebaseConfig'; // Import cấu hình Firebase và serverTimestamp
import {auth,firestore, serverTimestamp} from '../Firebase/Firebaseconfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; 
import LinearGradient from 'react-native-linear-gradient';

// Khai báo kiểu cho navigation
interface Props {
  navigation: any;
}

const DangKi: React.FC<Props> = ({ navigation }) => {
  // các state dùng để lưu trữ thông tin nhập từ người dùng
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // hàm xử lý khi người dùng ấn vào nút đăng ký
  const signUp = async () => {
 
    // kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp hay không
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }
    try {
      // tạo tài khoản người dùng với firebase auth
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // lưu thông tin người dùng vào Firebase Firestore
      await setDoc(doc(collection(firestore, 'users'), user.uid), {
        username: username,
        phoneNumber: phoneNumber,
        createdAt: serverTimestamp(),
      });

      // Thông báo thành công
      Alert.alert('Thành công', 'Bạn đã đăng ký thành công');

      // Chuyển hướng đến trang Đăng Nhập
      navigation.navigate('DangNhap');
    } catch (e) {
      console.error(e);
      // hiển thị thông báo lỗi
      Alert.alert('Lỗi : ' + e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/signup_graphic.png')} 
        style={{ width: 300, height: 200 }}
      />
      <View style = {styles.signup}>
      <Text style={styles.headerText}>Tạo Tài Khoản</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tên đăng nhập"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mật khẩu"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Xác nhận mật khẩu"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>hoặc</Text>
      <View style={styles.socialContainer}>
        <Image source={require('../img/logofb.png')} style={styles.socialIcon} />
        <Image source={require('../img/google.png')} style={styles.socialIcon} />
        <Image source={require('../img/applelogo.png')} style={styles.socialIcon} />
      </View>
      <Text style={styles.footerText}>
        Đã có tài khoản? <Text style={styles.link}>Đăng nhập</Text>
      </Text>
      </View>
      <LinearGradient colors={['#220A40', '#883997']} style={styles.halfCircleLeft} />
      <LinearGradient colors={['#220A40', '#883997']} style={styles.halfCircleRight} />
    </View>
  );
};

export default DangKi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF7F1',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    width: 250,
    textAlign: 'center',
    color: '#220A40',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    height: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
  link: {
    color: '#220A40',
  },
  button: {
    backgroundColor: '#220A40',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    marginTop: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  halfCircleLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 70,
    height: 70,
    backgroundColor: '#220A40',
    borderTopRightRadius: 50,
  },
  halfCircleRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 70,
    height: 70,
    backgroundColor: '#220A40',
    borderTopLeftRadius: 50,
  },
  signup : {
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
  }
});
