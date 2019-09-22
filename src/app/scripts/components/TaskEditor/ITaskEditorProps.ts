import { ITodo } from "../../core";
import { ITodoService } from "../../services/ITodoService";

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