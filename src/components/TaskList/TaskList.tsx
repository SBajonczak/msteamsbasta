import * as React from 'react';
import styles from './TaskList.module.scss';
import { ITaskListProps } from './ITaskListProps';
import { ITaskListState } from './ITaskListState';



import Task from "../Task/Task";
import { ITodo } from '../../core';

export default class TaskList extends React.Component<ITaskListProps, ITaskListState> {

  constructor(p,s){
    super(p,s);
    
  }

  componentDidMount(){
    
  }

private onMarkComplete(task:ITodo){
console.debug("INIT markAsComplete in Task", task);
this.props.onMarkComplete(task);
}


public render(): React.ReactElement<ITaskListProps> {
  
return (
  
  <div className="ms-Grid" dir="ltr">
      {
          this.props.tasks.map((task:ITodo) =>{
              return <Task task={task} onMarkComplete={this.onMarkComplete.bind(this)} />
          })
      }
  </div>
  
);
}
}
