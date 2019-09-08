import { ITodo } from '../core';
import * as _ from "lodash";

import { ITodoService } from './ITodoService';

export class MockTasks implements ITodoService {
    

    private mockData:ITodo[];

    constructor() {
        
    }
    private static _MockItems:ITodo[] = [
        {completed:false,   id: "0",    importance: "high",     isEditMode:false,   title :"Milch kaufen",          provider:new MockTasks() },
        {completed:false,   id: "1",    importance: "",         isEditMode:false,   title :"Brötchen holen",        provider:new MockTasks() },
        {completed:false,   id: "2",    importance: "",         isEditMode:false,   title :"BASTA!-Vortrag",        provider:new MockTasks() },
        {completed:false,   id: "3",    importance: "",         isEditMode:false,   title :"Kinder hüten",          provider:new MockTasks() },
        {completed:false,   id: "4",    importance: "",         isEditMode:false,   title :"Kalte Fusion schaffen", provider:new MockTasks() }
    ]
   
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