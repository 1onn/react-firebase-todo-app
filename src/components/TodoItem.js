import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoFromFirebase, toggleTodoInFirebase, updateTodoInFirebase } from '../redux/todosSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = () => {
    dispatch(toggleTodoInFirebase(todo));
  };

  const handleDelete = () => {
    dispatch(deleteTodoFromFirebase(todo.id));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(updateTodoInFirebase({ ...todo, title: editTitle }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
      )}
      <button className="edit-button" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
