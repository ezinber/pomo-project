import React from 'react';
import './Task.css';

const Task = React.memo(({ task, onComplete, onDelete, onClick, onSubmit }) => {
  const [text, setText] = React.useState(task.text);
  const [isEditing, setIsEditing] = React.useState(false); //состояние при редактировании заметки

  const taskClassName = (
    `task${task.isActive ? ' task_active' : ''}${task.isCompleted ? ' task_completed' : ''}`
  )
  const completeButtonClassName = (
    `task-button task__complete-button${task.isCompleted ? ' task__complete-button_checked' : ''}`
  )

  function handleChange(e) {
    setText(e.target.value);
    !isEditing && setIsEditing(true); //при изменении названия включаем состояние редактирования
  }

  function handleDelete() {
    onDelete(task);
  }

  function handleComplete() {
    onComplete(task);
  }

  function handleClick() {
    !task.isCompleted && !task.isActive && onClick(task); //если задача незавершена и неактивна, делаем активной текущую
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isEditing) {
      task.text = text; //вносим текст в задачу из стейта
      onSubmit(task);
      setIsEditing(false); //убираем состояние редактирования при сабмите (с сервером придётся поднять стейт)
    }
  }

  function handleBlur() { //действия при потере фокуса инпута
    setIsEditing(false);
    setText(task.text);
  }

  return (
    <li className={taskClassName} key={task.id} onClick={handleClick}>
      <button
        type="button"
        className={completeButtonClassName}
        onClick={handleComplete}
        title={task.isCompleted ? 'uncheck' : 'check'}
      />
      <form className="task__text-wrapper" name="task" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task__text"
          onChange={handleChange}
          value={text}
          disabled={task.isCompleted}
          onBlur={handleSubmit} //при потере фокуса сохраняются изменения
        />
        <button
          type="submit"
          className="task-button task__save-button"
          title="save"
          style={isEditing ? {display: 'block'} : {display: 'none'} /*меняем видимость иконки при редактировании */}
        />
      </form>
      <button
        type="button"
        className="task-button task__delete-button"
        title="delete"
        onClick={handleDelete}
      />
    </li>
  )
});

export default Task;