import * as React from 'react';
import styles from './TaskManagerToolbar.module.scss';
import { ITaskManagerToolbarProps } from './ITaskManagerToolbarProps';
import { ITaskManagerToolbarState } from './ITaskManagerToolbarState';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

export default class TaskManagerToolbar extends React.Component<ITaskManagerToolbarProps, ITaskManagerToolbarState> {
  
  constructor(p,s){
    super(p,s);
  }
  
  componentDidMount(){
    
  }




  private getItems():ICommandBarItemProps[]{
    return [
      {
        disabled: this.props.allowNewButton,
        key: 'newItem',
        name: 'Neu',
        iconProps: {
          iconName: 'Add'
        },
        onClick: () =>{this.props.showNewForm()},
        ariaLabel: 'New'}
      ]
      }

  public render(): React.ReactElement<ITaskManagerToolbarProps> {
    return (
      <div>
          <CommandBar items={this.getItems()} />
      </div>
    );
  }
}
