import { ITodo } from "../core";

export interface ITodoService {
    get: () => Promise<ITodo[]>;
    create: (todo: ITodo) => Promise<ITodo>;
    delete: (todo: ITodo) => Promise<boolean>;
    markAsComplete: (todo: ITodo) => Promise<ITodo>;
}