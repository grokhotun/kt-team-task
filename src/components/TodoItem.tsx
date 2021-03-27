import React, {useState} from 'react';

import {Button, Input} from 'antd';
import {ITask} from '../interfaces';

interface TodoItemProps {
  task: ITask,
  onRemove(id: number): void,
  onEdit(id: number, name: string): void
}

const TodoItem: React.FC<TodoItemProps> = ({task, onRemove, onEdit}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(task.id, event.target.value);
  };

  const focusHandler = () => {
    if (task.name === '') {
      onRemove(task.id);
    }
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <Input
        onBlur={focusHandler}
        onFocus={setIsEditing.bind(null, true)}
        onChange={editHandler}
        value={task.name}
        bordered={isEditing}
        placeholder=''/>
      <Button
        onClick={onRemove.bind(null, task.id)}
        danger
        type='primary'>
        Удалить
      </Button>
    </div>
  );
};

export default TodoItem;
