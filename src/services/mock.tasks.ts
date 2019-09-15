import { ITodo } from '../core';
import * as _ from "lodash";

import { ITodoService } from './ITodoService';

export class MockTasks implements ITodoService {
    

    public displayName:string;

    private _mockData:ITodo[];

    constructor() {
        this._mockData = MockTasks._MockItems;
    }

    private static _MockItems:ITodo[] = [
        {completed:false,   id: "0",    importance: "high",     isEditMode:false,   title :"Milch kaufen",          provider:new MockTasks() },
        {completed:true,    id: "1",    importance: "",         isEditMode:false,   title :"Brötchen holen",        provider:new MockTasks() },
        {completed:true,    id: "2",    importance: "",         isEditMode:false,   title :"BASTA!-Vortrag",        provider:new MockTasks() },
        {completed:false,   id: "3",    importance: "",         isEditMode:false,   title :"Kinder hüten",          provider:new MockTasks() },
        {completed:false,   id: "4",    importance: "",         isEditMode:false,   title :"Kalte Fusion schaffen", provider:new MockTasks() }
    ];
   
    public async get():Promise<ITodo[]>{
        return new Promise<ITodo[]>((resolve) =>{
            return resolve(this._mockData);
        });
    }

    public async create(todo: ITodo):Promise<ITodo>{
        return new Promise<ITodo>((resolve) => {
            return resolve(todo);
        });
    }

    public async delete(todo: ITodo): Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            return resolve(true);
        });
    }

    public async markAsComplete(todo: ITodo):Promise<ITodo>{
        return new Promise<ITodo>((resolve) => {
            todo.completed = true;
            return resolve(todo);
        });
    }   
}