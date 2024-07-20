import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import notesReducer from '../reducer/noteReducer';

const store = configureStore({
  reducer: {
    notesBieton: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['notes/listenToNotes/fulfilled'],
      },
    }),
});

export default store;
