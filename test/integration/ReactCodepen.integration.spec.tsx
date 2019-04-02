import * as React from "react";
import {mount} from "enzyme";
import renderer from 'react-test-renderer';

import ReactCodepen from "../../src";
import {ReactCodepenProps} from "../../src/ReactCodepen";

describe('<ReactCodepen/> - integration tests', function () {
    describe('Not loading script', function () {
        it('should mount without error and render with ".codepen"', function () {
            // given
            // when
            const wrapper = mount(reactCodepen());

            // then
            expect(wrapper.find(".codepen").length).toEqual(1);
        });

        it('should render and match the snapshot', function () {
            const tree = renderer
                .create(reactCodepen())
                .toJSON();

            expect(tree).toMatchSnapshot();
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