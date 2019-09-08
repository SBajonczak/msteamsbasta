import * as React from 'react';
import styles from './TaskList.module.scss';
import { ITaskListProps } from './ITaskListProps';
import { ITaskListState } from './ITaskListState';
import { ITodo } from '../../typings/ITodo';


import Task from "../Task/Task";

export default class TaskList extends React.Component<ITaskListProps, ITaskListState> {

    constructor(p,s){
        super(p,s);
        
      }
    
      componentDidMount(){
        
      }


  public render(): React.ReactElement<ITaskListProps> {
      
    return (
      <div className={styles.checkBox}>
      <div className="ms-Grid" dir="ltr">
          {
              this.props.tasks.map((task:ITodo) =>{
                  return <Task task={task} />
              })
          }
      </div>
      </div>
    );
  }
}
