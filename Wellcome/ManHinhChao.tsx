import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const ManHinhChao = ({navigation} : any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      )
    ]).start();
  }, [fadeAnim, moveAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello</Text>
      <Text style={styles.subText}>How are you today?</Text>
      <LottieView
        source={require('../Wellcome/animation_wellcome.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DangNhap')}>
        <Text style={styles.buttonText}>Start Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManHinhChao;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  helloText: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#8C52FF',
    marginTop: 100,
    marginLeft : 40
  },
  subText: {
    fontSize: 17,
    color: '#8C52FF',
    marginBottom: 20,
    marginLeft : 40
    
  },
  lottie: {
    width: 350,
    height: 350,
    marginTop: 80,
    alignItems : 'center',
    justifyContent : 'center',
    marginLeft : 40,
    
  },
  button: {
    marginTop: 50,
    backgroundColor: '#8C52FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent : 'center',
    alignItems : 'center',
    width : 150,
    marginLeft : 140,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
