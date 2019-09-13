import { ITodo } from "../../typings/ITodo";
import { ITodoService } from "../../typings/ITodoService";

export enum FormMode{
    New,
    Edit
}

export interface ITaskEditorProps{
    todo?:ITodo;
    mode:FormMode;
    gateways?:ITodoService[];
    hideNewForm:() => void;
}