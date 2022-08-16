import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import GetTask from "./components/getTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('')
  const getTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks()
  }, []);


  // Get task By ID
  const getTaskId = async (id) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/" + id)
      setTask(response.data)
     
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTaskId(task.id)
  }, []);

  // Add task
  const addTask = async (task) => {
    let formData = new FormData();

    formData.append("title", task.title);
    formData.append("time", task.time);
    formData.append("reminder", task.reminder);
    if (task.image) {
      formData.append("image", task.image);
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", formData);
      await getTasks();
    } catch (error) {
      alert(error)
    }
  };
  
  


  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`);
      // Call API to refresh tasks
      // await getTasks();
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (e) {
      console.log(e);
    }
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <BrowserRouter>
    <div className="container">
      <Header title="TODO APP" />
      <Routes>
        <Route path='/' element={
          <>
           <AddTask onAdd={addTask} />
            {Tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onGetTask={getTaskId}
              />
            ) : (
              "No tasks found"
            )}
            <Link to="/about">About page</Link>
          </>}>
        </Route>
        <Route path='/about' element={<About />}></Route>
        <Route 
          path={`/${task.id}`} 
          element={<GetTask 
            onGetTask={task}
            />}
          
        ></Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;