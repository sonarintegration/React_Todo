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
      const response = await axios.get('http://localhost:8080/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8080/todos', {
        title,
        description,
        completed: false
      });
      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        console.log('Todo created:', response.data);
        // Handle successful response, update UI, etc.
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
      } else {
        // If the response status is not in the 2xx range, throw an error
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding todo:', error.message);
      // Handle error, display message to user, etc.
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
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
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => console.log('Checkbox changed')}
            />
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
