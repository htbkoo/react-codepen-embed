import CodepenEmbedScriptTagBuilder from "../src/CodepenEmbedScriptTagBuilder";

describe('CodepenEmbedScriptTagBuilder', function () {
    it('should create builder with default options', function () {
        // given
        const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};
        const builder = new CodepenEmbedScriptTagBuilder();

        // when
        builder.appendTo(mockElement, () => mockScriptTag as any);

        // then
        expect(mockScriptTag).toMatchObject(defaultAttributes());

        expect(mockElement.appendChild).toBeCalledWith(mockScriptTag)
    });

    [
        {attribute: "src", overrideTo: "some src", methodName: "withSrc"}
    ].forEach(({attribute, overrideTo, methodName}) =>
        it(`should be able to override "${attribute}" of script tag created`, function () {
            // given
            const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};
            const builder = new CodepenEmbedScriptTagBuilder()[methodName](overrideTo);

            // when
            builder.appendTo(mockElement, () => mockScriptTag);

            // then

            const expectedTag = defaultAttributes();
            expectedTag[attribute] = overrideTo;
            expect(mockScriptTag).toMatchObject(expectedTag);

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
});