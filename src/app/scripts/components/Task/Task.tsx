import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IconButton } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';

// import styles from './Task.module.scss';
import { ITaskProps } from './ITaskProps';
import { ITaskState } from './ITaskListState';

import  { getContext, PrimaryButton, TeamsThemeContext, ThemeStyle, Table, Td, Tr , Th,TBody} from 'msteams-ui-components-react';


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
        <div>
          <Tr>
            <Td>
            {
              !this.props.task.completed
              ? <IconButton key="1"
              styles={{
              root: {
                selectors: {
                  ':hover .ms-Button-icon': {
                    color: 'green'
                  }
                }
              }}}
              
              iconProps={{iconName:"LocationCircle"}} disabled={this.state.todo.completed} onClick={this.onCompleteTaskClick.bind(this)} />
              : <IconButton key="1"  iconProps={{iconName:"Completed"}} />
            }

            <span>{this.state.todo.title}{this.props.task.importance=="high" ?<IconButton key="1"  iconProps={{iconName:"Important"}} /> :null}  </span>
            </Td>
          </Tr>
        </div>
    );
  }
}
  