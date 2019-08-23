import {OutlookTasks} from './outlook.tasks';
import { ITodo } from '../core';
import { ITodoService } from './ITodoService';
import {MockTasks} from './mock.tasks';

export class taskFabric {
    outlookService:ITodoService;
    mockService :ITodoService;
    constructor(){
        // Implementing the Outlook Service (It perform the autologin also)
        this.outlookService = new MockTasks();
        this.mockService = new MockTasks();
    }
    
    /**
     * 
     * Get all Elements.
     */
    async get(): Promise<ITodo[]> {
        // First get all outlook tasks
        let outlookTasks=  await this.getOutlookTasks();
        // Now get the mocked tasks
        let mockTasks = await this.mockService.get().then(results=>{
            return results;
        });
        console.log(mockTasks.length);
        // conact the results
        return mockTasks;
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