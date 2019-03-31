import "./jsdomSetup";
import * as React from "react";
import {when} from 'jest-when'
import {mount, shallow} from "enzyme";

import ReactCodepen from "../src";

describe('<ReactCodepen/> - integration tests', function () {
    it('should mount without error', function () {
        // given
        mount(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}/>);
        // when
        // then
    });
});