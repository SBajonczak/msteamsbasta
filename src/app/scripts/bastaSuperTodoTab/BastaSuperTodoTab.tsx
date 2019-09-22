import * as React from "react";

import {
  PrimaryButton,
  TeamsThemeContext,
  Panel,
  Input,
  PanelBody,
  PanelHeader,
  PanelFooter,
  Surface,
  getContext
} from "msteams-ui-components-react";
import TeamsBaseComponent, {
  ITeamsBaseComponentProps,
  ITeamsBaseComponentState
} from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { taskFabric } from "../services";
import { ITodo } from "../core";
import * as _ from "lodash";
import { MockTasks } from "../services/mock.tasks";
import TaskManager from "../components/TaskManager/TaskManager";

/**
 * State for the bastaSuperTodoTabTab React component
 */
export interface IBastaSuperTodoTabState extends ITeamsBaseComponentState {
  entityId?: string;
  todos: ITodo[];
}

/**
 * Properties for the bastaSuperTodoTabTab React component
 */
export interface IBastaSuperTodoTabProps extends ITeamsBaseComponentProps {}

/**
 * Implementation of the Basta! SuperTodo content page
 */
export class BastaSuperTodoTab extends TeamsBaseComponent<
  IBastaSuperTodoTabProps,
  IBastaSuperTodoTabState
> {
  taskFabric: taskFabric;

  constructor(props, state) {
    super(props, state);
    this.createEmptyOne = this.createEmptyOne.bind(this);
    this.persisElement = this.persisElement.bind(this);
    this.ToggleEdit = this.ToggleEdit.bind(this);
  }

  public componentWillMount() {
    // Load the Taskfabric
    this.taskFabric = new taskFabric();

    // Set initial state
    this.setState({
      fontSize: this.pageFontSize(),
      todos: []
    });

    if (this.inTeams()) {
      microsoftTeams.initialize();
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
      microsoftTeams.getContext(context => {
        this.setState({
          entityId: context.entityId
        });
      });
    }
    this.reloadData();
  }

  /**
   * Reload the data
   */
  public reloadData() {
    this.taskFabric.get().then(result => {
      this.setState({
        todos: result
      });
    });
  }

  public createEmptyOne() {
    let newElement: ITodo = {
      title: "New Title",
      completed: false,
      isEditMode: true,
      id: -1,
      // TODO: make user choose provider for task persisting
      provider:new MockTasks()
    };
    this.taskFabric.persist(newElement);
    this.reloadData();
  }
  public persisElement(todo: ITodo) {
    this.taskFabric.persist(todo);
    this.ToggleEdit(todo);
  }

  public ToggleEdit(todo: ITodo) {
    let data = this.state.todos;
    let index = _.findIndex(data, (item: ITodo) => {
      return item.id == todo.id;
    });
    data[index].isEditMode = !data[index].isEditMode;
    this.setState({
      todos: data
    });
  }

  /**
   * The render() method to create the UI of the tab
   */
  public render() {
    const context = getContext({
      baseFontSize: this.state.fontSize,
      style: this.state.theme
    });

    return (
      <TeamsThemeContext.Provider value={context}>
        <Surface>
              <TaskManager TaskGateway={this.taskFabric} />
        </Surface>
      </TeamsThemeContext.Provider>
    );
  }
}
