import React, {useState} from 'react';

import AddTodo from './AddTodo';
import TodoList from './TodoLits';
import {ITask} from '../interfaces';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addHandler = (name: string) => {
    const newTask: ITask = {
      id: Date.now(),
      name,
    };
    setTasks((prevState:ITask[]) => [newTask, ...prevState]);
  };

  const removeHandler = (id: number) => {
    setTasks((prevState:ITask[]) => prevState.filter((task: ITask) => task.id !== id));
  };

  const editHandler = (id: number, name: string) => {
    setTasks((prevState:ITask[]) => prevState.map((task: ITask) => {
      if (task.id === id) {
        return {
          ...task,
          name,
        };
      }
      return task;
    }));
  };

  return (
    <div className="wrapper">
      <h1>TypeScipted Todo App</h1>
      <span className="hint">Чтобы отредактировать существующее задание кликните по нему и начните писать</span>
      <AddTodo
        onAdd={addHandler}/>
      <TodoList
        onEdit={editHandler}
        onRemove={removeHandler}
        tasks={tasks}/>
    </div>
  );
};

export default App;
