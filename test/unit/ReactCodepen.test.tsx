import * as React from "react";
import {when} from 'jest-when'
import {shallow} from "enzyme";

import ReactCodepen from "../../src";

describe('<ReactCodepen/>', function () {
    it('should render "null" if not loaded and no loader provided', function () {
        // given
        // when
        const wrapper = shallow(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}/>);

        // then
        expect(wrapper.isEmptyRender()).toBe(true);
    });

    it('should render loader if not loaded and loader is provided', function () {
        // given
        const loader = <div id="loader"/>;

        // when
        const wrapper = shallow(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}
                                              loader={() => loader}/>);

        // then
        expect(wrapper.exists(".codepen")).toEqual(true);
        expect(wrapper.find(".codepen").exists("div")).toEqual(true);
    });
});