import { ITodo } from '../core';
import * as _ from "lodash";

import { ITodoService } from './ITodoService';

export class MockTasks implements ITodoService {
    

    private mockData:ITodo[];

    constructor() {
        this.mockData=[{
            id:_.uniqueId(),
            completed:false,
            isEditMode:false,
            title:"Important Supertask"
        },
        {
            id:_.uniqueId(),
            completed:false,
            isEditMode:false,
            title:"Super Task"
        }];
    }

   
    async get(): Promise<ITodo[]> {
        return this.mockData;
    }

    async create(todo: ITodo): Promise<ITodo> {
        todo.id =_.uniqueId();
        this.mockData.push(todo);
        return todo;
    }

    async update(todo: ITodo): Promise<ITodo> {
        return todo;
    }

    // @ts-ignore
    async delete(todo: ITodo): Promise<boolean> {
      return true;
    }

    async markAsComplete(todo: ITodo): Promise<ITodo> {
       return todo;
    }   
}