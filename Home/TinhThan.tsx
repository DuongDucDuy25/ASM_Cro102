import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotesScreen from '../src/screen/NoteScreen';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store';


const TinhThan = () => {
  return (
    <Provider store={store}>
      <NotesScreen/>
    </Provider>
  );
}

export default TinhThan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
