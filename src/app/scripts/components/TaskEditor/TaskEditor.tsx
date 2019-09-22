import * as React from "react";
import * as ReactDOM from "react-dom";

import {ITaskEditorProps, FormMode} from "./ITaskEditorProps";
import {ITaskEditorState} from "./ITaskEditorState";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ITodo } from "../../core";
import { ITodoService } from "../../services/ITodoService";

export default class TaskEditor extends React.Component<ITaskEditorProps, ITaskEditorState>{
    private _isEditMode:boolean;
    private _todo:ITodo;
    _gatewaySelected: boolean;
   
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
                id : -1,
                importance:"",
                isEditMode:false,
                title : "",
                providerName:"Dummy"
            }
        }
        else{
            this._todo = this.props.todo as ITodo;
        }
    }

    
    private updateTitle(event:any, newValue:string){
        this._todo.title = newValue;
    }

    private updateImportance(event:any, newValue:boolean){
        this._todo.importance = newValue ? "high" : "";
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
        console.log("Selected option", option);

        this._todo.providerName =(option as IDropdownOption).key.toString();
    }

    private async onOkClick(event:any){
        if(this.props.mode === FormMode.New){
            console.log(this._todo);
            let newTask = await (this._todo.provider as ITodoService).create(this._todo);
            this.props.hideNewForm();
        }
        else{
            // Wir haben kein simples Update?! Nur MaskAsComplete?!
            if(this._todo.completed){
                (this._todo.provider as ITodoService).markAsComplete(this._todo).then(() =>{this.onCancelClick({});});
            }
        }
    }

    private onCancelClick(event:any){
        this.props.hideNewForm();
    }

    public render():React.ReactElement<ITaskEditorProps>{

    
        const gatewayOptions:IDropdownOption[] =[
            {key:"Dummy", text:"Mock Service"},
            {key:"planner", text:"Planner"},
            {key:"sappi", text:"SAP PI"},
            {key:"notes", text:"Lotus Notes"},
        ];

        if (this.props.gateways != undefined && this.props.gateways.length>0){
            this._todo.provider = this.props.gateways[0];
        }

        let form;
        if(this.props.mode === FormMode.New){
            
            form =
            <div>
                <div><Dropdown label="Wo soll die Aufgabe gespeichert werden?" options={gatewayOptions} defaultSelectedKey={gatewayOptions[0].key} onChange={this.updateSelectedGateway.bind(this)} /></div>
                <div><TextField label="Titel" onChange={this.updateTitle.bind(this)}/></div>
                <div><Toggle label="Wichtig" onChange={this.updateImportance.bind(this)}/></div>
                <div>
                {
                    this.renderOkButton()
                }
                    {this.renderCancelButton()}
                </div>
            </div>;
        }
        return form;
    }
}