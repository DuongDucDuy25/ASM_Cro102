import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';

const categories = [
  { id: '1', title: 'Thể chất', image: require('../img/physical.jpg') },
  { id: '2', title: 'Thống kê', image: require('../img/phantich.jpg') },
  { id: '3', title: 'Kết bạn', image: require('../img/banbe.png') },
  { id: '4', title: 'Tư vấn', image: require('../img/tuvan.jpg') },
  { id: '5', title: 'Thư giãn', image: require('../img/thugian.jpg') },
  { id: '6', title: 'Tinh thần', image: require('../img/tinhthan.jpg') },
  { id: '7', title: 'Quản lý giấc ngủ', image: require('../img/ngu.jpg') },
];

const Home = ({ navigation } : any) => {
  const renderItem = ({ item }  : any) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.title)}>
      <ImageBackground source={item.image} style={styles.image}>
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../img/bannerhome2.jpg')} style={styles.banner}>
      </Image>
      <View style = {{flexDirection : 'row', width : '100%'}}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm..."
        placeholderTextColor="#8e8e8e"
        
      />
      <Image source={require('../img/buttontimkiem.png')}  style ={{height : 30 , width : 30, position : 'absolute', right : 45 , top : 15 , zIndex : 1000 }}/>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF',
  },
  banner: {
    width: '95%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    resizeMode: 'stretch', // Đảm bảo ảnh bao phủ toàn bộ vùng chứa
    margin : 10,
    borderRadius : 10,
    borderWidth : 1,
    
  },
  bannerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#4a148c',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    color: '#4a148c',
    width : '90%',
    padding : 5
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth : 0.5,
    objectFit : 'contain'
  },
  image: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
