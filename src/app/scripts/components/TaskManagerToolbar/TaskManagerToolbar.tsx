import * as React from 'react';
import { ITaskManagerToolbarProps } from './ITaskManagerToolbarProps';
import { ITaskManagerToolbarState } from './ITaskManagerToolbarState';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

import { PrimaryButton } from "msteams-ui-components-react";


export default class TaskManagerToolbar extends React.Component<ITaskManagerToolbarProps, ITaskManagerToolbarState> {
  
  constructor(p,s){
    super(p,s);
  }
  
  componentDidMount(){
    
  }


  public render(): React.ReactElement<ITaskManagerToolbarProps> {
    return (
      <div>
        <PrimaryButton hidden={this.props.allowNewButton}  onClick={() => this.props.showNewForm()}>Neue Aufgabe</PrimaryButton>
      </div>
    );
  }
}
