import {Header, TodoComputed, TodoCreate, TodoFilter, TodoList } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTasks, getFilter, getOwnerTasks } from '../redux/slices/taskSlice'; 
import { useEffect } from 'react';
import { getState } from '../redux/slices/authSlice';


const Home = () => {

  const dispatch = useDispatch()

  let tasks = useSelector(selectAllTasks)

  let {connectedUser: {_id}} = useSelector(getState)

  let filter = useSelector(getFilter)
  
  const itemsLeft = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    dispatch(getOwnerTasks(_id))
  }, []);
  
  const filteredTasks = () => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

;

  return (
    <div className="min-h-screen w-screen  bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-700 dark:bg-slate-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
      <Header />
      <main className="container mx-auto px-6 md:max-w-xl">
        <TodoCreate />
        {itemsLeft > 0 && ( <TodoFilter /> )}
          <TodoList tasks={filteredTasks()} />
        {itemsLeft > 0 && (<TodoComputed itemsLeft={itemsLeft}  />)}
      </main>
    </div>
  );
};

export default Home;
