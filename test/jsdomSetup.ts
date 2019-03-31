/* setup.js */

import {JSDOM} from "jsdom";

const jsdom = new JSDOM('<!doctype html><html lang="en"><body/></html>');
const {window: jsdomWindow} = jsdom;

(global as any).window = jsdomWindow;
(global as any).document = jsdomWindow.document;
(global as any).navigator = {
    userAgent: 'node.js',
};
(global as any).requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
(global as any).cancelAnimationFrame = function (id) {
    clearTimeout(id);
};

// TODO: pending reply to fix, reference: https://github.com/airbnb/enzyme/issues/1436#issuecomment-478314857
// function copyProps(src, target) {
//     Object.defineProperties(target, {
//         ...Object.getOwnPropertyDescriptors(src),
//         ...Object.getOwnPropertyDescriptors(target),
//     });
// }
// copyProps(jsdomWindow, (global as any));