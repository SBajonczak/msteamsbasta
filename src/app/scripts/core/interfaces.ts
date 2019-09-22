import { ITodoService } from "../services/ITodoService";

export interface ITodo {
    id: number,
    title: string,
    completed: boolean,
    isEditMode:boolean,
    importance?: string,
    provider?:ITodoService,
    providerName:string
}
