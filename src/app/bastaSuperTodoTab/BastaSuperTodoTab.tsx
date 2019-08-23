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
import { taskFabric } from "../../services";
import { ITodo } from "../../core";
import * as _ from "lodash";

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
      id: _.uniqueId()
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
          <Panel>
            <PanelHeader>
              <div>Super Todo</div>
            </PanelHeader>
            <PanelBody>
              <div>{this.state.entityId}</div>
              <PrimaryButton onClick={this.createEmptyOne}>
                Neuer Eintrag
              </PrimaryButton>
              <div>
                {this.state.todos.map(todo => {
                  return (
                    <div>
                      <div>
                        <span hidden={todo.isEditMode} key={todo.id}>
                          Titel: {todo.title}
                        </span>

                        <Input
                          hidden={!todo.isEditMode}
                          key={todo.id}
                          autoFocus
                          label="Enter a Title"
                          errorLabel={
                            !todo.title ? "This value is required" : undefined
                          }
                          required
                          value={todo.title}
                        />
                      </div>
                      <div>
                        <PrimaryButton
                          hidden={todo.isEditMode}
                          onClick={this.ToggleEdit.bind(this, todo)}
                        >
                          Bearbeiten
                        </PrimaryButton>

                        <PrimaryButton
                          hidden={!todo.isEditMode}
                          onClick={this.persisElement.bind(this, todo)}
                        >
                          Speichern
                        </PrimaryButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PanelBody>
            <PanelFooter />
          </Panel>
        </Surface>
      </TeamsThemeContext.Provider>
    );
  }
}
