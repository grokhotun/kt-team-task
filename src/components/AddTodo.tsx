import React, {useState} from 'react';

import {Button, Input} from 'antd';

interface AddTodoProps {
  onAdd(name: string): void
}

const AddTodo: React.FC<AddTodoProps> = ({onAdd}) => {
  const [name, setName] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const pressHandler = (): void => {
    if (name !== '') {
      onAdd(name);
      setName('');
    }
  };

  return (
    <div className="add-form">
      <Input
        value={name}
        onPressEnter={pressHandler}
        onChange={changeHandler}
        placeholder='Введите что нужно сделать...'/>
      <Button
        onClick={pressHandler}
        type='primary'>
        Добавить
      </Button>
    </div>
  );
};

export default AddTodo;
