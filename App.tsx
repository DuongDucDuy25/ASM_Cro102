import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManHinhChao from './Wellcome/ManHinhChao';
import DangNhap from './Wellcome/DangNhap';
import DangKi from './Wellcome/DangKi';
import Home from './Home/Home';
import TheChat from './Home/TheChat';
import GiacNgu from './Home/GiacNgu';
import TinhThan from './Home/TinhThan';
import ThongKe from './Home/ThongKe';
import { Image, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ManHinhChao" component={ManHinhChao} options={{ headerShown: false }} />
      <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false }} />
      <Stack.Screen name="DangKi" component={DangKi} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('./img/trangchu.png');
            return (
              <View style={{ 
                width: 70, 
                height: 70, 
                borderRadius: 35, 
                backgroundColor: '#883997', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <Image source={iconSource} style={{ width: size, height: size }} />
              </View>
            );
          } else if (route.name === 'TheChat') {
            iconSource = require('./img/thechat.png');
          } else if (route.name === 'GiacNgu') {
            iconSource = require('./img/ngu.png');
          } else if (route.name === 'TinhThan') {
            iconSource = require('./img/thien.png');
          } else if (route.name === 'ThongKe') {
            iconSource = require('./img/thongke.png');
          }

          return <Image source={iconSource} style={{ width: size, height: size }} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          margin: 10,
          padding: 10,
          position: 'absolute',
          borderRadius: 15,
          backgroundColor : '#4a148c', // Màu tím nhạt hơn
        },
        tabBarActiveTintColor: '#4a148c', // Màu khi chọn
        tabBarInactiveTintColor: '#000', // Màu khi không chọn
        tabBarItemStyle: {
          transition: 'transform 0.2s', // Hiệu ứng chuyển động
        },
      })}
    >
      <Tab.Screen name="TheChat" component={TheChat} options={{ headerShown: false }} />
      <Tab.Screen name="GiacNgu" component={GiacNgu} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="TinhThan" component={TinhThan} options={{ headerShown: false }} />
      <Tab.Screen name="ThongKe" component={ThongKe} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ManHinhChao">
        <Stack.Screen name="ManHinhChao" component={ManHinhChao} options={{ headerShown: false }} />
        <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false }} />
        <Stack.Screen name="DangKi" component={DangKi} options={{ headerShown: false }} />
        <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
