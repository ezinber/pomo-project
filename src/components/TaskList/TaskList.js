import React from 'react';
import TaskBlock from './TaskBlock/TaskBlock';
import { getRandomString } from '../../utils/utils';
import './TaskList.css';

const TaskList = React.memo(
  ({ tasks, onComplete, onDelete, onClick, onSubmit, onAdd }) => {
    const currentTasks = [];
    const completedTasks = [];

    tasks.forEach((item) => {
      item.isCompleted ? completedTasks.push(item) : currentTasks.push(item);
    });

    function handleTaskAdd() {
      // добавление новой задачи со сгенерированным id
      onAdd({
        id: getRandomString(),
        text: '',
        isActive: false,
        isCompleted: false,
      });
    }

    return (
      <div className="task-list">
        <TaskBlock
          tasks={currentTasks}
          title="Текущие задачи"
          onDelete={onDelete}
          onComplete={onComplete}
          onClick={onClick}
          onSubmit={onSubmit}
        />

        <button
          type="button"
          className="task-list__add-button"
          onClick={handleTaskAdd}
        >
          добавить задачу
        </button>

        {
          /* показываем список при наличии завершённых задач */
          completedTasks.length > 0 && (
            <TaskBlock
              tasks={completedTasks}
              title="Завершённые задачи"
              onDelete={onDelete}
              onComplete={onComplete}
              onClick={onClick}
              onSubmit={onSubmit}
            />
          )
        }
      </div>
    );
  }
);

export default TaskList;
