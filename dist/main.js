/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOffGesture = exports.createOnGesture = exports.createGesture = void 0;
var getInfoFunction_1 = __webpack_require__(2);
var createGesture = function (element, gesture) {
    //제스쳐 on,off 함수 반환
    var onGesture = (0, exports.createOnGesture)(element, gesture);
    var offGesture = (0, exports.createOffGesture)(element, gesture);
    return [onGesture];
};
exports.createGesture = createGesture;
var createOnGesture = function (element, gesture) {
    //addEventListener 해주는 함수 반환
    var gestureKeys = Object.keys(gesture);
    var gestureFunction = gestureKeys.reduce(function (acc, item) {
        acc[item] = [getInfoFunction_1.createGestureFunction[item][0](gesture[item]),
            getInfoFunction_1.createGestureFunction[item][1](gesture[item])];
        return acc;
    }, {});
    console.log(gestureFunction);
    // element.addEventListener('touchstart', );
};
exports.createOnGesture = createOnGesture;
var createOffGesture = function (element, gesture) {
    //removeEventListener 해주는 함수 반환
    var gestureKeys = Object.keys(gesture);
};
exports.createOffGesture = createOffGesture;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createGestureFunction = exports.$createMouseDownFunction = exports.$createTouchStartFunction = void 0;
var $createTouchStartFunction = function (callback) {
    //touchstart시 실행할 함수
    return function (e) {
        callback();
    };
};
exports.$createTouchStartFunction = $createTouchStartFunction;
var $createMouseDownFunction = function (callback) {
    //mousedown 실행할 함수
    return function (e) {
        callback();
    };
};
exports.$createMouseDownFunction = $createMouseDownFunction;
exports.createGestureFunction = {
    dragStart: [exports.$createTouchStartFunction, exports.$createMouseDownFunction]
};
// export const createTouchEventInfoFunction = (event:TouchEvent) => {
//     let touchEventData:touchEventData = {};
//     return (event:TouchEvent) => {
//         const clientX = event.touches[0].clientX;
//         const clientY = event.touches[0].clientY;
//         const moveX   = touchEventData ? clientX - touchEventData.position[0] : 0
//         const moveY   = touchEventData ? clientY - touchEventData.position[1] : 0
//         const distance1 = clientX - touchEventData.start[0];
//         const distance2 = clientY - touchEventData.start[1];
//         const distance3 = Math.sqrt(Math.abs(distance1*distance1)+Math.abs(distance2*distance2));
//         const move3     = Math.sqrt(Math.abs(moveX*moveX)+Math.abs(moveY*moveY))
//     }
// }


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(1);
var elementGesture_1 = __webpack_require__(1);
(function () {
    // const table = document?.querySelector('table');
    // const updateData = (data:any):void => {
    //     const keys = Object.keys(data);
    //     keys.forEach(item => {
    //         const row = table?.querySelector(`:scope .${item}`) as any;
    //         const value = Array.isArray(data[item]) ? data[item] : [data[item]];
    //         value.forEach(($item:number|string,idx:number) => {
    //             row.querySelector(`:scope .v${idx+1}`).innerHTML = String($item);
    //         });
    //         // console.log(row?.querySelector(':scope .vname'));
    //     });
    // }
    var box = document.querySelector('#box');
    (0, elementGesture_1.createGesture)(box, { dragStart: function (e) { console.log(e); } });
    // box?.addEventListener('touchstart', (e) => {
    //     e.preventDefault();
    //     console.log('touchstart', e);
    // })
    // box?.addEventListener('touchmove', (e) => {
    //     console.log('touchmove', e);
    // })
    // box?.addEventListener('touchend', (e) => {
    //     console.log('touchend', e);
    // })
    // box?.addEventListener('mousedown', (e) => {
    //     console.log('mousedown');
    // })
    // box?.addEventListener('mousemove', (e) => {
    //     console.log('mousemove');
    // })
})();

})();

/******/ })()
;