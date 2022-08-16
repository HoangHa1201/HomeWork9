import { FaTimes } from 'react-icons/fa'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


const Task = ({ task, onDelete, onToggle, onGetTask }) => {
  return (
    <div>
      <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>
          {task.title} <FaTimes
            style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} />
        </h3>
        <p>{task.time}</p>
        <p>Created: {task.created}</p>
        <p>Updated: {task.updated}</p>
        <img src={task.image} width='70' height='70' />
      </div>
      <h4 >
        <Link 
          to={`/${task.id}`} 
          onClick={() => onGetTask(task.id)}
        >View task</Link>
      </h4>

    </div>
  )
}

export default Task