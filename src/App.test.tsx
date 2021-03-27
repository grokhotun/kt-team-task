import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import App from './components/App';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoLits';
import AddTodo from './components/AddTodo';

const onRemove = () => {
  console.log('onRemove');
};
const onEdit = () => {
  console.log('onEdit');
};

const onAdd = () => {
  console.log('onAdd');
};

describe('TodoItem', () => {
  test('Should render TodoItem', () => {
    const task = {id: 1, name: 'Купить хлеб'};
    const {getByDisplayValue} = render(<TodoItem onRemove={onRemove} onEdit={onEdit} task={task}/>);
    expect(getByDisplayValue('Купить хлеб')).toBeInTheDocument();
  });

  test('Should have focus', () => {
    const task = {id: 1, name: 'Купить хлеб'};
    const {getByDisplayValue} = render(<TodoItem onRemove={onRemove} onEdit={onEdit} task={task}/>);
    const input = getByDisplayValue('Купить хлеб');
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});

describe('TodoList', () => {
  test('Should render TodoList', () => {
    const tasks = [{id: 1, name: 'Купить хлеб'}, {id: 2, name: 'Купить молоко'}, {id: 3, name: 'Купить яйца'}];
    const {getByDisplayValue} = render(<TodoList onEdit={onEdit} onRemove={onRemove} tasks={tasks}/>);
    expect(getByDisplayValue('Купить хлеб')).toBeInTheDocument();
    expect(getByDisplayValue('Купить молоко')).toBeInTheDocument();
    expect(getByDisplayValue('Купить яйца')).toBeInTheDocument();
  });
});

describe('AddTodo', () => {
  test('Should render AddTodo', () => {
    const {getByText, getByPlaceholderText} = render(<AddTodo onAdd={onAdd}/>);
    getByPlaceholderText('Введите что нужно сделать...');
    getByText('Добавить');
  });
});

describe('App', () => {
  test('App renders the correct content', () =>{
    const {getByText, getByPlaceholderText} = render(<App/>);
    getByText('TypeScipted Todo App');
    getByPlaceholderText('Введите что нужно сделать...');
    getByText('Добавить');
    getByText('Пока нет никаких дел');
  });

  test('Tasks are allowed to be added into to the task list', () => {
    const {getByText, getByPlaceholderText, getByDisplayValue} = render(<App/>);
    const input = getByPlaceholderText('Введите что нужно сделать...');
    const btn = getByText('Добавить');
    fireEvent.change(input, {target: {value: 'Переехать в Санкт Петербург'}});
    fireEvent.click(btn);
    expect(getByDisplayValue('Переехать в Санкт Петербург')).toBeInTheDocument();
  });

  test('Tasks are allowed to be removed from the task list', () => {
    const {getByText, getByPlaceholderText, getByDisplayValue, queryByDisplayValue} = render(<App/>);
    const input = getByPlaceholderText('Введите что нужно сделать...');
    const addBtn = getByText('Добавить');
    fireEvent.change(input, {target: {value: 'Переехать в Санкт Петербург'}});
    fireEvent.click(addBtn);
    expect(getByDisplayValue('Переехать в Санкт Петербург')).toBeInTheDocument();
    const removeBtn = getByText('Удалить');
    fireEvent.click(removeBtn);
    expect(queryByDisplayValue('Переехать в Санкт Петербург')).toBeNull();
  });

  test('Tasks are allowed for editing', () => {
    const {getByText, getByPlaceholderText, getByDisplayValue} = render(<App/>);
    const input = getByPlaceholderText('Введите что нужно сделать...');
    const addBtn = getByText('Добавить');
    fireEvent.change(input, {target: {value: 'Переехать в Санкт Петербург'}});
    fireEvent.click(addBtn);
    const inputTasks = getByDisplayValue('Переехать в Санкт Петербург');
    expect(inputTasks).toBeInTheDocument();
    fireEvent.change(inputTasks, {target: {value: 'Я передумал и решил, что надо в Москву'}});
    expect(getByDisplayValue('Я передумал и решил, что надо в Москву')).toBeInTheDocument();
  });

  test('Tasks are deleted if empty and blur', () => {
    const {getByText, getByPlaceholderText, getByDisplayValue, queryByDisplayValue} = render(<App/>);
    const input = getByPlaceholderText('Введите что нужно сделать...');
    const addBtn = getByText('Добавить');
    fireEvent.change(input, {target: {value: 'Переехать в Санкт Петербург'}});
    fireEvent.click(addBtn);
    const inputTasks = getByDisplayValue('Переехать в Санкт Петербург');
    expect(inputTasks).toBeInTheDocument();
    fireEvent.change(inputTasks, {target: {value: ''}});
    fireEvent.blur(inputTasks);
    expect(queryByDisplayValue('Переехать в Санкт Петербург')).toBeNull();
  });
});
