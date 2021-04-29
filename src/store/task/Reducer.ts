import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ITask } from '../../types';
import { ACTION_TYPES } from './Types';

interface ITaskReducer {
  task: ITask[];
}

const InitialState: ITaskReducer = {
  task: [
    {
      id: 1,
      title: 'Post 1',
      body: 'Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint',
    },
  ],
};

const addTask = (state: ITaskReducer, action: any): ITaskReducer => {
  const newTask: ITask = {
    id: Math.random(),
    title: action.payload.title,
    body: action.payload.body,
  };
  console.log(newTask);
  return {
    ...state,
    task: state.task.concat(newTask),
  };
};

const removeTask = (state: ITaskReducer, action: any): ITaskReducer => {
  const tasks: ITask[] = state.task.filter((task) => task.id !== action.payload.id);
  console.log('[tasks', tasks);
  console.log('[id', action.payload.id);
  return {
    ...state,
    task: tasks,
  };
};

const Reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      return addTask(state, action);

    case ACTION_TYPES.REMOVE_TASK:
      return removeTask(state, action);

    default:
      return state;
  }
};

// persister
const persistConfig = {
  key: 'tasks',
  storage: storage,
};

export const taskReducer = persistReducer(persistConfig, Reducer);