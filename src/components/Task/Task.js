import React from 'react';
import './Task.css';

function Task ({ task, onComplete, onDelete, onClick }) {
  const [text, setText] = React.useState(task.text);

  const taskClassName = (
    `task${task.isActive ? ' task_active' : ''}${task.isCompleted ? ' task_completed' : ''}`
  )
  const completeButtonClassName = (
    `task-button task__complete-button${task.isCompleted ? ' task__complete-button_checked' : ''}`
  )

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleDelete() {
    onDelete(task);
  }

  function handleComplete() {
    onComplete(task);
  }

  function handleClick() {
    !task.isCompleted && !task.isActive && onClick(task);
  }

  return (
    <li className={taskClassName} key={task.id}>
      <button type="button" className={completeButtonClassName} onClick={handleComplete} title={task.isCompleted ? 'uncheck' : 'check'} />
      <input type="text" className="task__text" onClick={handleClick} onChange={handleChange} value={text} disabled={task.isCompleted} />
      <button type="button" className="task-button task__delete-button" onClick={handleDelete} title="удалить" />
    </li>
  )
}

export default Task;