import * as React from 'react';


import  { getContext, PrimaryButton, TeamsThemeContext, ThemeStyle, Table, Td, Tr , Th,TBody, Panel, PanelBody, PanelHeader} from 'msteams-ui-components-react';


import TaskManagerToolbar from "../TaskManagerToolbar/TaskManagerToolbar";
import TaskList from "../TaskList/TaskList";

import { ITaskManagerProps } from './ITaskManagerProps';
import { ITaskManagerState } from './ITaskManagerState';

import TaskEditor from '../TaskEditor/TaskEditor';
import { FormMode } from '../TaskEditor/ITaskEditorProps';
import { ITodo } from '../../core';


export default class TaskManager extends React.Component<ITaskManagerProps, ITaskManagerState> {
  constructor(p, s) {
    super(p, s);

    this.state = {
      tasks: [],
      showNewForm: false
    };
  }

  async componentDidMount() {
    this.fetchTasks();
  }

  async fetchTasks() {
    let tasks = await this.props.TaskGateway.get();
    this.setState({ tasks: tasks });
  }

  public showNewForm() {
    this.setState({ showNewForm: true });
  }

  public hideNewForm() {
    this.setState({ showNewForm: false }, () => {
      this.fetchTasks();
    });
  }

  public async markAsComplete(task: ITodo) {


    return new Promise<ITodo>((resolve, reject) => {
      if (task.provider) {  // When privider is set.
        task.provider.markAsComplete(task).then((updatedTask: ITodo) => {

          var newTasks = this.state.tasks.map((oldTask: ITodo) => {
            if (oldTask.provider == updatedTask.provider && oldTask.id == updatedTask.id) {
              return updatedTask;
            }
            else {
              return oldTask;
            }
          });
          this.setState({ tasks: newTasks });
        });
      }
    });
  }

  public render(): React.ReactElement<ITaskManagerProps> {
    return (
      <div>
            <Panel>
              <PanelHeader>
              <TaskManagerToolbar showNewForm={this.showNewForm.bind(this)} allowNewButton={this.state.showNewForm} />
              </PanelHeader>

              <PanelBody>
                      {this.state.showNewForm
          ? <TaskEditor mode={FormMode.New} gateways={[this.props.TaskGateway.mockService]} hideNewForm={this.hideNewForm.bind(this)} />
          : null
        }

              </PanelBody>

            </Panel>
      
        {!this.state.showNewForm
          ? <TaskList tasks={this.state.tasks} onMarkComplete={this.markAsComplete.bind(this)} />
          : null
        }
      </div>
    );
  }
}