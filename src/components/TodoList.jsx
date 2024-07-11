import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ tasks }) => {
  return (
        <div  className="mt-4 rounded-t-md bg-white transition-all duration-700 dark:bg-slate-800 overflow-auto h-80" >
          {tasks.map((todo, index) => (  <TodoListItem todo={todo} key={index}/> ))}
        </div>
  );
};

export default TodoList;
