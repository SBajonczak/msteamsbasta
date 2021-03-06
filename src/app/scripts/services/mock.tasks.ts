import { ITodo } from '../core';
import * as _ from "lodash";

import { ITodoService } from './ITodoService';

export class MockTasks implements ITodoService {
    

    public displayName:string="Dummy";

    private _mockData:ITodo[];

    constructor() {
        this._mockData = MockTasks._MockItems;
    }

    private static _MockItems:ITodo[] = [
        {completed:false,   id: 0,    importance: "high",     isEditMode:false,   title :"Milch kaufen",          provider:new MockTasks(), providerName:"planner" },
        {completed:true,    id: 1,    importance: "",         isEditMode:false,   title :"Brötchen holen",        provider:new MockTasks(), providerName:"planner" },
        {completed:true,    id: 2,    importance: "",         isEditMode:false,   title :"BASTA!-Vortrag",        provider:new MockTasks(), providerName:"notes" },
        {completed:false,   id: 3,    importance: "",         isEditMode:false,   title :"Kinder hüten",          provider:new MockTasks(), providerName:"sappi" },
        {completed:false,   id: 4,    importance: "",         isEditMode:false,   title :"Kalte Fusion schaffen", provider:new MockTasks(), providerName:"planner" }
    ];
   
    public async get():Promise<ITodo[]>{
        return new Promise<ITodo[]>((resolve) =>{
            return resolve(this._mockData);
        });
    }

    public async create(todo: ITodo):Promise<ITodo>{
        let that = this;
        if (todo!= undefined && _!= undefined && this._mockData!= undefined){
            let item =  _.maxBy(this._mockData, (o)=>{return o.id});
            if (item!= undefined){
                todo.id= item.id+1;
            }
            todo.id=0;
        }
        return new Promise<ITodo>((resolve) => {
            that._mockData.push(todo);
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