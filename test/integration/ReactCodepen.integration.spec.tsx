import * as React from "react";
import {mount} from "enzyme";
import renderer from 'react-test-renderer';

import ReactCodepen from "../../src";
import {ReactCodepenProps} from "../../src/ReactCodepen";

describe('<ReactCodepen/> - integration tests', function () {
    describe('mount tests', function () {
        describe('Not loading script', function () {
            it('should mount without error and render with ".codepen"', function () {
                // given
                // when
                const wrapper = mount(reactCodepen());

                // then
                expect(wrapper.find(".codepen").length).toEqual(1);
            });
        });
    });

    describe('Snapshot tests', function () {
        describe('Not loading script', function () {
            it('should, when not loaded and no loader provided, render and match the snapshot', function () {
                const tree = renderer
                    .create(reactCodepen())
                    .toJSON();

                expect(tree).toMatchSnapshot();
            });

            it('should, when loader is provided and not loaded, render and match the snapshot', function () {
                const tree = renderer
                    .create(reactCodepen({
                        loader: ({isLoading, error}) => <p>{`loader: isLoading: ${isLoading}, error: ${error}`}</p>
                    }))
                    .toJSON();

                expect(tree).toMatchSnapshot();
            });

            it('should, when loaded, render and match the snapshot', function () {
                // given
                const hash = "hash", user = "user", title = "title", height = 512, themeId = "theme",
                    defaultTab = "defaultTab", version = 100, preview = false;

                // when
                const tree = renderer
                    .create(reactCodepen({
                        user,
                        hash,
                        title,
                        height,
                        themeId,
                        defaultTab,
                        version,
                        preview,
                        overrideAsLoaded: true
                    }))
                    .toJSON();

                expect(tree).toMatchSnapshot();
            });
        });
    });

    function reactCodepen(overrides: Partial<ReactCodepenProps> = {}) {
        return <ReactCodepen
            hash="someHash"
            user="someUser"
            shouldLoadScript={false}
            {...overrides}
        />;
    }
});