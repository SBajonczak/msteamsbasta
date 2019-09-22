import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { BastaSuperTodoTabConfig } from "../BastaSuperTodoTabConfig";

describe("BastaSuperTodoTabConfig Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<BastaSuperTodoTabConfig />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<BastaSuperTodoTabConfig />);
        const divResult = component.containsMatchingElement(<div>Configure your tab</div>);

        expect(divResult).toBeTruthy();
    });
});
