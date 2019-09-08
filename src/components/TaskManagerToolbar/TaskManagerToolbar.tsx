import * as React from 'react';
import styles from './TaskManagerToolbar.module.scss';
import { ITaskManagerToolbarProps } from './ITaskManagerToolbarProps';
import { ITaskManagerToolbarState } from './ITaskManagerToolbarState';


export default class TaskManagerToolbar extends React.Component<ITaskManagerToolbarProps, ITaskManagerToolbarState> {
  
    constructor(p,s){
      super(p,s);
    }
    
    componentDidMount(){
      
    }
  
    public render(): React.ReactElement<ITaskManagerToolbarProps> {
      return (
        <div>
            Toolbar hier
        </div>
      );
    }
}
