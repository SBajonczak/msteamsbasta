import * as React from "react";
import {
  PrimaryButton,
  TeamsThemeContext,
  Panel,
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
IBastaSuperTodoTabProps,IBastaSuperTodoTabState> {

  taskFabric: taskFabric;

  public componentWillMount() {
    // Load the Taskfabric
    this.taskFabric = new taskFabric();
    
    this.updateTheme(this.getQueryVariable("theme"));

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
    } else {
    }
    this.taskFabric.get().then(result => {
      this.setState({
        todos: result
      });
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
    const { rem, font } = context;
    const { sizes, weights } = font;
    const styles = {
      header: { ...sizes.title, ...weights.semibold },
      section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
      footer: { ...sizes.xsmall }
    };
    return (
      <TeamsThemeContext.Provider value={context}>
        <Surface>
          <Panel>
            <PanelHeader>
              <div style={styles.header}>Super Todo</div>
            </PanelHeader>
            <PanelBody>
              <div style={styles.section}>{this.state.entityId}</div>
              <div style={styles.section}>
                {this.state.todos.map(todo => {
                  return <span key={todo.id}>Titel: {todo.title}</span>;
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
