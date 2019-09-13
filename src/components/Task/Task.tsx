import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IconButton } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';

import styles from './Task.module.scss';
import { ITaskProps } from './ITaskProps';
import { ITaskState } from './ITaskListState';



export default class Task extends React.Component<ITaskProps, ITaskState> {


  constructor(p,s){
    super(p,s);
    initializeIcons();
    this.state = {
      todo:this.props.task
    };
  }

  componentDidMount(){
    
  }

  private onCompleteTaskClick(event:any){
    console.debug("INIT markAsComplete in Task", this.props.task);
    this.props.onMarkComplete(this.props.task);
  }


  public render(): React.ReactElement<ITaskProps> {
    
    

    return (
        <div className={styles.row}>
          <div className={styles.col1}>
              <Checkbox label={this.state.todo.title} disabled={this.state.todo.completed} checked={this.state.todo.completed} />
          </div>
          <div className={styles.col2}>
            {
              !this.props.task.completed
              ? <IconButton  iconProps={{iconName:"Completed"}} disabled={this.state.todo.completed} onClick={this.onCompleteTaskClick.bind(this)} />
              : null
            }
          </div>
        </div>
    );
  }
}
  