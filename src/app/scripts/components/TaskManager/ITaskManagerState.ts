import { ITodo } from "../../core";


export interface ITaskManagerState{
    tasks:ITodo[];
    showNewForm:boolean;
}