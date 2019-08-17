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
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import {OutlookTasks} from "../../services";

/**
 * State for the bastaSuperTodoTabTab React component
 */
export interface IBastaSuperTodoTabState extends ITeamsBaseComponentState {
    entityId?: string;
}

/**
 * Properties for the bastaSuperTodoTabTab React component
 */
export interface IBastaSuperTodoTabProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the Basta! SuperTodo content page
 */
export class BastaSuperTodoTab extends TeamsBaseComponent<IBastaSuperTodoTabProps, IBastaSuperTodoTabState> {

    tasks:OutlookTasks;
    public componentWillMount() {
        this.tasks = new OutlookTasks();

        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                this.setState({
                    entityId: context.entityId
                });
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
    }

    public ButtonClicked(){
        this.tasks.login();
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
                            <div style={styles.section}>
                                {this.state.entityId}
                            </div>
                            <div style={styles.section}>
                                <PrimaryButton onClick={this.ButtonClicked}>A sample button</PrimaryButton>
                            </div>
                        </PanelBody>
                        <PanelFooter>
                            <div style={styles.footer}>
                                (C) Copyright Wir
                            </div>
                        </PanelFooter>
                    </Panel>
                </Surface>
            </TeamsThemeContext.Provider>
        );
    }
}
