import CodepenEmbedScriptTagBuilder from "../src/CodepenEmbedScriptTagBuilder";

describe('CodepenEmbedScriptTagBuilder', function () {
    it('should create builder with default options', function () {
        // given
        const mockElement = {appendChild: jest.fn()}, mockScriptTag: any = {};
        const builder = new CodepenEmbedScriptTagBuilder();

        // when
        builder.appendTo(mockElement, () => mockScriptTag as any);

        // then
        expect(mockScriptTag).toMatchObject({
            src: 'https://production-assets.codepen.io/assets/embed/ei.js',
            async: false,
            onload: null,
            onerror: null,
        });

        expect(mockElement.appendChild).toBeCalledWith(mockScriptTag)
    });
});