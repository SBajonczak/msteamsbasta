import * as React from "react";
import * as ReactDOM from "react-dom";

import {ITaskEditorProps, FormMode} from "./ITaskEditorProps";
import {ITaskEditorState} from "./ITaskEditorState";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { ITodoService } from "../../typings/ITodoService";
import { ITodo } from "../../typings/ITodo";

export default class TaskEditor extends React.Component<ITaskEditorProps, ITaskEditorState>{
    private _isEditMode:boolean;
    private _todo:ITodo;
    /*
    id: string,
    title: string,
    completed: boolean,
    isEditMode:boolean,
    importance?: string,
    provider:ITodoService
    */
    constructor(p,s){
        super(p,s);

        this.updateTitle.bind(this);
        this.updateImportance.bind(this);
        this.renderOkButton.bind(this);
        this.renderCancelButton.bind(this);
        this.onOkClick.bind(this);
        this.onCancelClick.bind(this);

        if(this.props.mode === FormMode.New)
        {
            this._todo = {
                completed : false,
                id : "-1",
                importance:"",
                isEditMode:false,
                provider: undefined,
                title : ""
            }
        }
        else{
            this._todo = this.props.todo
        }
    }

    
    private updateTitle(event:any, newValue:string){
        this._todo.title = newValue;
    }

    private updateImportance(event:any, newValue:boolean){
        this._todo.importance = newValue ? "Hoch" : "";
    }

    private updateCompletion(event:any, newValue:boolean){
        this._todo.completed = newValue;
    }

    private renderOkButton(){
        return <DefaultButton text={this.props.mode === FormMode.New ? "Speichern" : "Aktualisieren"} onClick={this.onOkClick.bind(this)} />;
    }
    private renderCancelButton(){
        return <DefaultButton text={"Abbrechen"} onClick={this.onCancelClick.bind(this)} />;
    }

    private updateSelectedGateway(event:any, option?: IDropdownOption){
        this._todo.provider = this.props.gateways.filter((g:ITodoService) =>{ if(g.displayName === option.key){return g;} })[0];
        
    }

    private async onOkClick(event:any){
        
        if(this.props.mode === FormMode.New){
            console.log(this._todo);
            let newTask = await this._todo.provider.create(this._todo);
            debugger;
            this.onCancelClick({});
        }
        else{
            // Wir haben kein simples Update?!
            if(this._todo.completed){
                this._todo.provider.markAsComplete(this._todo).then(() =>{this.onCancelClick({});});
            }
        }
    }

    private onCancelClick(event:any){
        debugger;
        this.props.hideNewForm();
        // unmounten hier
    }

    public render():React.ReactElement<ITaskEditorProps>{
        const gatewayOptions:IDropdownOption[] = this.props.gateways.map( (gateway:ITodoService) => {
            return {key:gateway.displayName, text:gateway.displayName};
        });
        let form = null;
        if(this.props.mode === FormMode.New){
            
            form =
            <div>
                <div><Dropdown label="Wo soll die Aufgabe gespeichert werden?" options={gatewayOptions} onChange={this.updateSelectedGateway.bind(this)} /></div>
                <div><TextField label="Titel" onChange={this.updateTitle.bind(this)}/></div>
                <div><Toggle label="Wichtig" onChange={this.updateImportance.bind(this)}/></div>
                <div>
                    {this.renderOkButton()}
                    {this.renderCancelButton()}
                </div>
            </div>;
        }
        else{
            form = <div>
                    <div><TextField label="Titel" onChange={this.updateTitle} value={this.props.todo.title}/></div>
                    <div><Toggle label="Wichtig" onChange={this.updateImportance} defaultChecked={this.props.todo.importance === "Hoch"}/></div>
                    <div><Toggle label="Edledigt" onChange={this.updateCompletion} defaultChecked={false}/></div>
                    <div>
                        {this.renderOkButton()}
                        {this.renderCancelButton()}
                    </div>
                </div>;
        }
        return form;
    }
}