import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const Home = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
