import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../../../Firebase/Firebaseconfig';

const initialState = {
  notes: [],
  status: 'idle',
  error: null,
};

export const listenToNotes = () => (dispatch) => {
  const user = auth().currentUser;
  if (user) {
    const q = query(collection(firestore, 'notes'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: 'SET_NOTES', payload: notes });
    });
    return unsubscribe;
  }
};
// Thêm ghi chú với userId
export const addNote = (note) => async (dispatch) => {
  try {
    const user = auth().currentUser;
    if (user) {
      await addDoc(collection(firestore, 'notes'), {
        title: note.title,
        content: note.content,
        userId: user.uid, // Thêm userId vào ghi chú
        createdAt: serverTimestamp(),
      });
      dispatch({ type: 'ADD_NOTE', payload: note });
    }
  } catch (error) {
    console.error('Error adding note: ', error);
  }
};

export const updateNote = (updatedNote) => async (dispatch) => {
  try {
    const noteRef = doc(firestore, 'notes', updatedNote.id);
    await updateDoc(noteRef, updatedNote.updatedNote);
    dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
  } catch (error) {
    console.error('Error updating note: ', error);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    const noteRef = doc(firestore, 'notes', id);
    await deleteDoc(noteRef);
    dispatch({ type: 'DELETE_NOTE', payload: id });
  } catch (error) {
    console.error('Error deleting note: ', error);
  }
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  },
});

export const { setNotes } = notesSlice.actions;

export default notesSlice.reducer;
