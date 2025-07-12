import {useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  } 

  function hnadleAddTask() {
        if (newTask === "") {
          return
        }
        const newTaskItem = {
        id: Date.now(),
        text: newTask,
        completed: false,
        };
        setTasks([...tasks, newTaskItem])
        setNewTask(''); //  clears the input box
  }
  function handleEdit(id, text) {
    setEditingId(id);
    setEditingText(text);
  }
function handleSave(id) {
  setTasks(
    tasks.map((task) => 
      task.id === id ? 
        { ...task, text:editingText} : task
    )
  )
    setEditingId(null);
    setEditingText('');
}

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleCheckbox = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} className="theme-toggle">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
       </button>
      <div className='content'>
       <h1>Task Track</h1>
      
      <input 
      type="text"
      placeholder="Add task"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      />
      <button className='addbtn'
       onClick={hnadleAddTask}>
        Add</button>
      <ul style={{listStyle: "none", padding: 0}}>
        {tasks.map((task) => (
         <li key={task.id} style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
  <input 
    type='checkbox'
    checked={task.completed}
    onChange={() => handleCheckbox(task.id)}
  />
  {editingId === task.id ? (
    <>
      <input
        type='text'
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <button onClick={() => handleSave(task.id)}>Save</button>
    </>
  ) : (
    <>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
    </>
  )}
  <button onClick={() => handleDelete(task.id)}>Delete</button>
</li>

        ))}
      </ul>
      </div>
    </div>
  )
}

export default App
