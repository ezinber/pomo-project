import React from 'react';
import Task from './Task/Task';
import './TaskBlock.css';

const TaskBlock = React.memo(
  ({ tasks, title, onComplete, onDelete, onClick, onSubmit }) => {
    return (
      <div className="task-block">
        <h2 className="task-block__title">{title}</h2>
        <ul className="task-block__tasks">
          {tasks.map((taskData) => (
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
    );
  }
);

export default TaskBlock;
