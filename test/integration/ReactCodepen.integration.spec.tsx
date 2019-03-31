import * as React from "react";
import {when} from 'jest-when'
import {mount} from "enzyme";

import ReactCodepen from "../../src";

describe('<ReactCodepen/> - integration tests', function () {
    it('should mount without error', function () {
        // given
        mount(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}/>);
        // when
        // then
    });
});