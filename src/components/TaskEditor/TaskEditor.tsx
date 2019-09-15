import * as React from "react";
import * as ReactDOM from "react-dom";

import {ITaskEditorProps, FormMode} from "./ITaskEditorProps";
import {ITaskEditorState} from "./ITaskEditorState";

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


// import { autobind } from 'office-ui-fabric-react/lib/Utilities';
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
                id : "-1",
                importance:"",
                isEditMode:false,
                title : ""
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
        this._gatewaySelected = true;
        this._todo.provider = (this.props.gateways as ITodoService[]).filter((g:ITodoService) =>{ if(g.displayName === (option as IDropdownOption).key){return g;} })[0];
        
    }

    private async onOkClick(event:any){
        // wenn kein Gateway aka ITodoService ausgewählt wurde, kann man jetzt diese Button gar nicht bekommen
        if(this.props.mode === FormMode.New){
            console.log(this._todo);
            let newTask = await (this._todo.provider as ITodoService).create(this._todo);
            debugger;
            this.onCancelClick({});
        }
        else{
            // Wir haben kein simples Update?! Nur MaskAsComplete?!
            if(this._todo.completed){
                (this._todo.provider as ITodoService).markAsComplete(this._todo).then(() =>{this.onCancelClick({});});
            }
        }
    }

    private onCancelClick(event:any){
        debugger;
        this.props.hideNewForm();
        // unmounten hier
    }

    public render():React.ReactElement<ITaskEditorProps>{

    
        const gatewayOptions:IDropdownOption[] = (this.props.gateways as ITodoService[]).map( (gateway:ITodoService) => {
            return {key:gateway.displayName, text:gateway.displayName};
        });
        
        let form;
        if(this.props.mode === FormMode.New){
            
            form =
            <div>
                <div><Dropdown label="Wo soll die Aufgabe gespeichert werden?" options={gatewayOptions} defaultSelectedKey={gatewayOptions[0].key} onChange={this.updateSelectedGateway.bind(this)} /></div>
                <div><TextField label="Titel" onChange={this.updateTitle.bind(this)}/></div>
                <div><Toggle label="Wichtig" onChange={this.updateImportance.bind(this)}/></div>
                <div>
                {
                            this._gatewaySelected
                            ? this.renderOkButton()
                            :null
                        }
                    {this.renderCancelButton()}
                </div>
            </div>;
        }
        return form;
    }
}