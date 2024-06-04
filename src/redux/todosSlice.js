import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addTodoToFirebase = createAsyncThunk('todos/addTodoToFirebase', async (newTodo) => {
  const docRef = await addDoc(collection(db, 'todos'), newTodo);
  return { id: docRef.id, ...newTodo };
});

export const deleteTodoFromFirebase = createAsyncThunk('todos/deleteTodoFromFirebase', async (id) => {
  await deleteDoc(doc(db, 'todos', id));
  return id;
});

export const toggleTodoInFirebase = createAsyncThunk('todos/toggleTodoInFirebase', async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
  return { id: todo.id, completed: !todo.completed };
});

export const updateTodoInFirebase = createAsyncThunk('todos/updateTodoInFirebase', async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id), { title: todo.title });
  return todo;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => action.payload)
      .addCase(addTodoToFirebase.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTodoFromFirebase.fulfilled, (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
      })
      .addCase(toggleTodoInFirebase.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state[index].completed = action.payload.completed;
        }
      })
      .addCase(updateTodoInFirebase.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      });
  },
});

export default todosSlice.reducer;
