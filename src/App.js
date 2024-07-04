import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      if (Array.isArray(response.data)) {
        setTodos(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setTodos([]); // Set todos to an empty array
      }
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      setTodos([]); // Set todos to an empty array
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
        title,
        description,
        completed: false
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('Todo created:', response.data);
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
