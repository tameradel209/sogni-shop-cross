import {doTask} from '../../config/helpers/toDo';

export const toDoAsync = (task: string, callback: (load: boolean) => void) => {
  callback(true);
  return doTask(task)
    .then(() => callback(false))
    .catch(() => callback(false));
};
