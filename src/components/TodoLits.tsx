import React from 'react';

import TodoItem from './TodoItem';
import {ITask} from '../interfaces';

interface TodoListProps {
  tasks: ITask[],
  onRemove(id: number): void,
  onEdit(id: number, name: string): void
}

const TodoList: React.FC<TodoListProps> = ({tasks, onRemove, onEdit}) => {
  if (tasks.length === 0) {
    return (<div className="empty-list"><p>Пока нет никаких дел</p></div>);
  }
  return (
    <ul>
      {tasks.map((task) => <TodoItem key={task.id} task={task} onRemove={onRemove} onEdit={onEdit}/>)}
    </ul>
  );
};

export default TodoList;
