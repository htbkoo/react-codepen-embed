import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";

import ReactCodepen from "../../src";
import {ReactCodepenProps} from "../../src/ReactCodepen";

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
        assertWrapper(wrapper)
            .contains(".codepen")
            .thatHasProps({
                "data-height": 300,
                "data-theme-id": "dark",
                "data-slug-hash": "someHash",
                "data-default-tab": "css,result",
                "data-user": "someUser",
                "data-embed-version": 2,
                "data-preview": true,
                "className": "codepen",
            });

        assertWrapper(wrapper.find(".codepen"))
            .contains("div");
    });

    it('should render content if loaded', function () {
        // given
        const hash = "hash", user = "user", title = "title", height = 512, themeId = "theme", defaultTab = "defaultTab",
            version = 100, preview = false;

        // when
        const wrapper = newWrapper({
            user,
            hash,
            title,
            height,
            themeId,
            defaultTab,
            version,
            preview,
            overrideAsLoaded: true
        });

        // then
        assertWrapper(wrapper)
            .contains(".codepen")
            .thatHasProps({
                "data-height": height,
                "data-theme-id": themeId,
                "data-slug-hash": hash,
                "data-default-tab": defaultTab,
                "data-user": user,
                "data-embed-version": version,
                "data-pen-title": title,
                "data-preview": preview,
                "className": "codepen",
            });
    });

    function newWrapper(overrides: Partial<ReactCodepenProps> = {}) {
        return shallow(
            <ReactCodepen
                hash="someHash"
                user="someUser"
                shouldLoadScript={false}
                {...overrides}
            />
        );
    }

    function assertWrapper(wrapper: ShallowWrapper) {
        return {
            contains(selector: string) {
                expect(wrapper.exists(selector)).toEqual(true);
                const childWrapper = wrapper.find(selector);
                return {
                    thatHasProps(expectedProps: object) {
                        expect(childWrapper.props()).toMatchObject(expectedProps);
                    }
                }
            }
        };
    }
});