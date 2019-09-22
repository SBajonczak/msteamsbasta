import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { BastaSuperTodoTabRemove } from "../BastaSuperTodoTabRemove";

describe("BastaSuperTodoTabRemove Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<BastaSuperTodoTabRemove />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<BastaSuperTodoTabRemove />);
        const divResult = component.containsMatchingElement(<div>You"re about to remove your tab...</div>);

        expect(divResult).toBeTruthy();
    });
});
