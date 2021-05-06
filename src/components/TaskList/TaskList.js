import React from 'react';
import Task from './Task/Task';
import { getRandomString } from '../../utils/utils';
import './TaskList.css';

const TaskList = React.memo(
  ({ tasks, onComplete, onDelete, onClick, onSubmit, onAdd }) => {
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
        <h2 className="task-list__title">Активные задачи</h2>
        <ul className="task-list__tasks">
          {
            /* список активных задач */
            tasks.map(
              (taskData) =>
                !taskData.isCompleted && (
                  <Task
                    key={taskData.id}
                    task={taskData}
                    onDelete={onDelete}
                    onComplete={onComplete}
                    onClick={onClick}
                    onSubmit={onSubmit}
                  />
                )
            )
          }
        </ul>

        <button
          type="button"
          className="task-list__add-button"
          onClick={handleTaskAdd}
        >
          добавить задачу
        </button>

        {
          /* скрываем заголовок при отсутствии завершённых задач */
          tasks.some((taskData) => taskData.isCompleted) && (
            <h2 className="task-list__title">Завершённые задачи</h2>
          )
        }

        <ul className="task-list__tasks">
          {
            /* список завершённых задач */
            tasks.map(
              (taskData) =>
                taskData.isCompleted && (
                  <Task
                    key={taskData.id}
                    task={taskData}
                    onDelete={onDelete}
                    onComplete={onComplete}
                    onClick={onClick}
                    onSubmit={onSubmit}
                  />
                )
            )
          }
        </ul>
      </div>
    );
  }
);

export default TaskList;
