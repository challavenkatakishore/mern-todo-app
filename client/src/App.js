import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    try {
      if (!input) return;

      await axios.post("http://localhost:5000/add", {
        text: input
      });

      setInput("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyle: "none" }}>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;