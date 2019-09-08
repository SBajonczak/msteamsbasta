import { ITodoService } from "../services/ITodoService";

export interface ITodo {
    id: string,
    title: string,
    completed: boolean,
    isEditMode:boolean,
    importance?: string,
    provider:ITodoService
}
