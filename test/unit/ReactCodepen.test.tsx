import * as React from "react";
import {when} from 'jest-when'
import {shallow} from "enzyme";

import ReactCodepen from "../../src";

describe('<ReactCodepen/>', function () {
    it('should mount without error', function () {
        // given
        shallow(<ReactCodepen hash="someHash" user="someUser" shouldLoadScript={false}/>);
        // when
        // then
    });
});