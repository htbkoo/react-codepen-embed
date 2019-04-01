import * as React from "react";
import {when} from 'jest-when'
import {shallow} from "enzyme";

import ReactCodepen from "../../src";

describe('<ReactCodepen/>', function () {
    it('should render "null" if not loaded and no loader provided', function () {
        // given
        // when
        const wrapper = newWrapper();

        // then
        expect(wrapper.isEmptyRender()).toBe(true);
    });

    it('should render loader if not loaded and loader is provided', function () {
        // given
        const loader = <div id="loader"/>;

        // when
        const wrapper = newWrapper({loader: () => loader});

        // then
        expect(wrapper.exists(".codepen")).toEqual(true);
        expect(wrapper.find(".codepen").exists("div")).toEqual(true);
    });

    it('should render content if loaded', function () {
        // given
        // when
        const wrapper = newWrapper({overrideAsLoaded: true});

        // then
        expect(wrapper.exists(".codepen")).toEqual(true);

        const codepenWrapper = wrapper.find(".codepen");
        expect(codepenWrapper.props()).toMatchObject({
            "data-height": 300,
            "data-theme-id": "dark",
            "data-slug-hash": "someHash",
            "data-default-tab": "css,result",
            "data-user": "someUser",
            "data-embed-version": 2,
            // "data-pen-title": "this.props.title",
            "data-preview": true,
            "className": "codepen",
        });
    });

    function newWrapper({loader = undefined, overrideAsLoaded = undefined} = {}) {
        return shallow(
            <ReactCodepen
                hash="someHash"
                user="someUser"
                shouldLoadScript={false}
                loader={loader}
                overrideAsLoaded={overrideAsLoaded}
            />
        );
    }
});