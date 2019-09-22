import { ITodo } from "../../core/interfaces";

export interface ITaskListProps{
    tasks:ITodo[];
    onMarkComplete:(task:ITodo) => void;
}