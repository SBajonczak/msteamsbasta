import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';

import styles from './Task.module.scss';
import { ITaskProps } from './ITaskProps';
import { ITaskState } from './ITaskListState';



export default class Task extends React.Component<ITaskProps, ITaskState> {


  constructor(p,s){
    super(p,s);
    this.state = {}
  }

  componentDidMount(){
    
  }


  public render(): React.ReactElement<ITaskProps> {
    return (
      
        <div className={styles.row}>
          <div className={styles.col1}>
            <Checkbox label={this.props.task.title} />
          </div>
          <div className={styles.col2}>
          </div>
        </div>
    );
  }
}
  