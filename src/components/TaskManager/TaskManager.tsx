import * as React from 'react';
import styles from './TaskManager.module.scss';


import TaskManagerToolbar from "../TaskManagerToolbar/TaskManagerToolbar";
import TaskList from "../TaskList/TaskList";

import { ITaskManagerProps } from './ITaskManagerProps';
import { ITaskManagerState } from './ITaskManagerState';
import { ITodo } from '../../typings/ITodo';


export default class TaskManager extends React.Component<ITaskManagerProps, ITaskManagerState> {


  constructor(p,s){
    super(p,s);
    this.state = {
      tasks:[]
    };
    
  }

  async componentDidMount(){
    let tasks = await this.props.TaskGateway.get();
    
    this.setState({tasks:tasks});
    
  }

  public render(): React.ReactElement<ITaskManagerProps> {

    
    return (
      <div>
        
        <TaskManagerToolbar />
        
        <TaskList tasks={this.state.tasks} />

      </div>
    );
  }
}
