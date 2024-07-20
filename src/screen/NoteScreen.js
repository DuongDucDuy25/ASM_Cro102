import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, updateNote, deleteNote, listenToNotes } from '../redux/reducer/noteReducer';
import { Provider as PaperProvider, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Image } from 'react-native';
import { auth } from '../../Firebase/Firebaseconfig';

const NotesScreen = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notesBieton.notes);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [userId, setCurrentId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const unsubscribe = dispatch(listenToNotes());
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  }, [dispatch]);

  const handleAddNote = () => {
    const user = auth().currentUser;
    if (user) {
      if (editMode) {
        dispatch(updateNote({
          id: userId,
          updatedNote: { title, content }
        }));
        setEditMode(false);
        setCurrentId(null);
      } else {
        dispatch(addNote({
          title,
          content,
          userId: user.uid // Gán userId vào ghi chú
        }));
      }
      setTitle('');
      setContent('');
      setVisible(false);
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditMode(true);
    setCurrentId(note.id);
    setVisible(true);
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setEditMode(false);
    setTitle('');
    setContent('');
    setCurrentId(null);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
            <Dialog.Title style={styles.dialogTitle}>{editMode ? 'Sửa bản ghi' : 'Thêm bản ghi'}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Tiêu Đề"
                value={title}
                onChangeText={setTitle}
                style={styles.inputTitle}
                mode="outlined"
                theme={{ colors: { text: '#ffffff', primary: '#ffffff', placeholder: '#ffffff' } }}
              />
              <TextInput
                label="Nội Dung"
                value={content}
                onChangeText={setContent}
                style={styles.inputContent}
                multiline
                numberOfLines={4}
                mode="outlined"
                theme={{ colors: { text: '#ffffff', primary: '#ffffff', placeholder: '#ffffff' } }}
              />
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              <Button onPress={hideDialog} mode="contained" style={styles.dialogButton}>Hủy</Button>
              <Button onPress={handleAddNote} mode="contained" style={styles.dialogButton}>{editMode ? 'Sửa' : 'Thêm'}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleEditNote(item)}>
              <View style={styles.itemContainer}>
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemContent}>{item.content}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteNote(item.id)} style={styles.deleteButton}>
                  <Image source={require('/CRO102/Asm_Cro102/img/buttondelete.png')} style={styles.delete} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={showDialog}>
          <Image source={require('/CRO102/Asm_Cro102/img/buttonadd.png')} style={styles.fab} />
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CCCCFF',
  },
  itemContainer: {
    backgroundColor: '#330033',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4a148c',
    borderRadius: 10,
    position: 'relative',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    padding: 5,
    marginBottom: 10,
    borderRadius: 20,
    width: 'auto',
    marginTop: -10,
    marginLeft: -10,
  },
  itemContent: {
    fontSize: 14,
    color: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  delete: {
    width: 20,
    height: 20,
    marginBottom: 30,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    backgroundColor: '#4a148c',
    width: 50,
    height: 50,
    padding: 20,
    borderRadius: 30,
  },
  dialog: {
    backgroundColor: '#993399',
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },
  inputTitle: {
    marginBottom: 20,
    color: '#fff',
  },
  inputContent: {
    height: 100,
    textAlignVertical: 'top',
    color: '#ffffff',
  },
  dialogActions: {
    justifyContent: 'space-around',
    padding: 10,
  },
  dialogButton: {
    backgroundColor: '#4a148c',
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 10,
    width: 100,
  },
});

export default NotesScreen;
