import React from 'react'
import { FaTimes } from 'react-icons/fa'
function Task({ task, onDelete, onDoubleClick}) {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={(id) => onDoubleClick(task.id)}>
            {task.reminder ? <div className='reminder'></div> : ''}
            <h3>
                {task.text}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={(id) => onDelete(task.id)} />
            </h3>

            <p>{ task.day}</p>
        </div>
    )
}

export default Task
