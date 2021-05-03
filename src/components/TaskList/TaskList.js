import React from 'react';
import Task from './Task/Task';
import './TaskList.css';

const TaskList = React.memo(({ tasks, onComplete, onDelete, onClick, onSubmit }) => {

  return (
    <div className="task-list">
      <h2 className="task-list__title">Активные задачи</h2>
      <ul className="tasks">
        {tasks.map((taskData) => (
          !taskData.isCompleted &&
          <Task
            key={taskData.id}
            task={taskData}
            onDelete={onDelete}
            onComplete={onComplete}
            onClick={onClick}
            onSubmit={onSubmit}
          />
        ))}
      </ul>
      <button type="button" class="task-list__add-button">добавить задачу</button>
      <h2 className="task-list__title">Завершённые задачи</h2>
      <ul className="tasks">
        {tasks.map((taskData) => (
          taskData.isCompleted &&
          <Task
            key={taskData.id}
            task={taskData}
            onDelete={onDelete}
            onComplete={onComplete}
            onClick={onClick}
            onSubmit={onSubmit}
          />
        ))}
      </ul>
    </div>
  )
})

export default TaskList;