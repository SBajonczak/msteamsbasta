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
  todoData: Array<ITodo>;
  taskFabric: taskFabric;
  public componentWillMount() {
    this.taskFabric = new taskFabric();
    // Initial with an empty array
    this.todoData = new Array<ITodo>();

    this.updateTheme(this.getQueryVariable("theme"));
    this.setState({
      fontSize: this.pageFontSize()
    });

    if (this.inTeams()) {
      microsoftTeams.initialize();
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
      microsoftTeams.getContext(context => {
        this.setState({
          entityId: context.entityId
        });
      });
      // Load Tasks from outlook.
      this.taskFabric.get().then(tasks=> {
        this.todoData = tasks;
      });

    } else {
      this.setState({
        entityId: "This is not hosted in Microsoft Teams"
      });
    }
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
              <div style={styles.header}>This is your tab</div>
            </PanelHeader>
            <PanelBody>
              <div style={styles.section}>{this.state.entityId}</div>
              <div style={styles.section}>
                <PrimaryButton>A sample button</PrimaryButton>
              </div>
            </PanelBody>
            <PanelFooter>
              <div style={styles.footer}>(C) Copyright Wir</div>
            </PanelFooter>
          </Panel>
        </Surface>
      </TeamsThemeContext.Provider>
    );
  }
}
