import Task from './Task'
const Tasks = ({ tasks, onDelete, onDoubleClick }) => {
    return (
        <>
            { tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onDoubleClick={ onDoubleClick}/>
                ))
            }
        </>
    )
}

export default Tasks
