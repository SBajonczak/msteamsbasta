import { ITodo } from "../../core";


export interface ITaskProps {
  task:ITodo;
  onMarkComplete:(task:ITodo) => void;
}
