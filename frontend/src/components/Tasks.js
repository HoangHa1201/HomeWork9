import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle, onGetTask }) => {
  return (
    <div>
      {tasks.map(task => <Task key={task.id}
        task={task}
        onDelete={onDelete}
        onToggle={onToggle}
        onGetTask={onGetTask}
        />)}
    </div>
  )
}

export default Tasks