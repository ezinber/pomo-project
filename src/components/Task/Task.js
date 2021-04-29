import React from 'react';

function Task ({ id, isActive, isCompleted, onComplete, onDelete }) {

  const [text, setText] = React.useState('test');
  const taskClassName = (
    `task ${isActive ? 'task_active' : ''} ${isCompleted ? 'task_completed' : ''}`
  )

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className={taskClassName}>
      <input className="task__text" onChange={handleChange}>{text}</input>
    </div>
  )
}

export default Task;