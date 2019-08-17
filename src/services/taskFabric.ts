import {OutlookTasks} from './outlook.tasks';
import { ITodo } from '../core';
import { Utilities } from '@microsoft/office-js-helpers';


export class taskFabric {
    outlookService:OutlookTasks;
    constructor(){
        // Implementing the Outlook Service (It perform the autologin also)
        this.outlookService = new OutlookTasks();
    }
    
    /**
     * 
     * Get all Elements.
     */
    async get(): Promise<ITodo[]> {
        // Furst get all outlook tasks
        let outlookTaks=  await this.getOutlookTasks();
    
        return outlookTaks;
    }

    /**
     * Get all my tasks from outlook
     */
    async getOutlookTasks():Promise<ITodo[]>
    {
        return this.outlookService.get().then(tasks=>{

            return tasks;
        });
    }
}