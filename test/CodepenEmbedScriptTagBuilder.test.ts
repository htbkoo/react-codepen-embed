import {when} from 'jest-when'

import CodepenEmbedScriptTagBuilder from "../src/CodepenEmbedScriptTagBuilder";

describe('CodepenEmbedScriptTagBuilder', function () {
    const NO_OP = () => {
    };

    it('should create builder with default options', function () {
        // given
        const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};
        const builder = new CodepenEmbedScriptTagBuilder();

        // when
        builder.appendTo(mockElement, () => mockScriptTag);

        // then
        expect(mockScriptTag).toMatchObject(defaultAttributes());

        expect(mockElement.appendChild).toBeCalledWith(mockScriptTag)
    });

    it('should create builder without "createScriptTag" argument', function () {
        // given
        const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};

        const mockDocument = {createElement: jest.fn()};
        when(mockDocument.createElement).calledWith("script").mockReturnValue(mockScriptTag);
        (global as any).document = mockDocument;

        const builder = new CodepenEmbedScriptTagBuilder();

        // when
        builder.appendTo(mockElement);

        // then
        expect(mockScriptTag).toMatchObject(defaultAttributes());

        expect(mockElement.appendChild).toBeCalledWith(mockScriptTag)
    });

    [
        {attribute: "src", overrideTo: "some src", methodName: "withSrc"},
        {attribute: "async", overrideTo: true, methodName: "setAsync"},
        {attribute: "onload", overrideTo: NO_OP, methodName: "withOnLoadHandler"},
        {attribute: "onerror", overrideTo: NO_OP, methodName: "withOnErrorHandler"},
    ].forEach(({attribute, overrideTo, methodName}) =>
        it(`should be able to override "${attribute}" of script tag created`, function () {
            // given
            const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};
            const builder = builderWithOverrides({methodName, overrideTo});

            // when
            builder.appendTo(mockElement, () => mockScriptTag);

            // then
            const expectedAttributes = defaultAttributes();
            expectedAttributes[attribute] = overrideTo;
            expect(mockScriptTag).toMatchObject(expectedAttributes);

            expect(mockElement.appendChild).toBeCalledWith(mockScriptTag)
        })
    );

    function defaultAttributes() {
        return {
            src: 'https://production-assets.codepen.io/assets/embed/ei.js',
            async: false,
            onload: null,
            onerror: null,
        };
    }

    function builderWithOverrides({methodName, overrideTo}: { methodName: string, overrideTo: any }) {
        return new CodepenEmbedScriptTagBuilder()[methodName](overrideTo);
    }
});