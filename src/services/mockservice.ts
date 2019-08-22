import { ITodo, IProfile } from '../core';

/**
 * We are using OfficeHelpers library as it allows us to complete authentication
 * with relative ease and also provides other useful Utilities.
 *
 * Note: We have included a beta version of OfficeHelpers that has support for
 * MicrosoftTeams and the API signatures might change when OfficeHelpers for
 * Microsoft Teams releases.
 */
import { Authenticator, IToken, Utilities } from '@microsoft/office-js-helpers';
import { ITodoService } from './ITodoService';

export class OutlookTasks implements ITodoService {
    private _token: IToken;

    private mockData:ITodo[];

    constructor() {
        this.mockData=[];
     
    }

   
    async get(): Promise<ITodo[]> {

        return this.mockData;
    }

    async create(todo: ITodo): Promise<ITodo> {
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