import * as React from "react";
import {mount} from "enzyme";
import renderer from 'react-test-renderer';

import ReactCodepen from "../../src";

describe('<ReactCodepen/> - integration tests', function () {
    it('should mount without error and render with ".codepen"', function () {
        // given
        // when
        const wrapper = mount(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}/>);

        // then
        expect(wrapper.find(".codepen").length).toEqual(1);
    });

    it('should render and match the snapshot', function () {
        const tree = renderer
            .create(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});