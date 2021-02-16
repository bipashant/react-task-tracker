import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

import './App.css';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }
    getTasks()
  }, [])
  
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

    
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }

  const addTask = async (task) => {
    console.log(JSON.stringify(task))
    
    const res = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()
    
    setTasks([...tasks, data])
    setShowAddTask(false)
    
  }
  
  const deleteTask = async (id) => { 
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  // Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToUpdate = await fetchTask(id)


    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ reminder: !taskToUpdate.reminder } )
    })
    
    const data = await res.json()
    
    setTasks(data);
    
    setTasks(
      tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task)
      )
    }
    
    
  return (
      <Router>
      <div className="container">
        
        <Header
          title='Task Tracker'
          onToggleAddForm={() => setShowAddTask(!showAddTask)}
          showAddTask={ showAddTask}
          />
          
        <Route path='/' exact render={(props) => 
          (
            <>
              {
                showAddTask && <AddTask onAdd={ addTask}/>
              }
              
            {tasks.length ? (<Tasks tasks={tasks} onDelete={deleteTask} onDoubleClick={toggleReminder} />) : ('No tasks found')}
            <Footer/>
            </>
          )}
          />
        <Route path='/about' component={About}/>
       
        </div>
      </Router>

      );
    }
    
    export default App;
    