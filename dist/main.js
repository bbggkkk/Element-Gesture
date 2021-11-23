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
    var _a = (0, exports.createOnGesture)(element, gesture), onGesture = _a[0], gestureFunction = _a[1];
    var offGesture = (0, exports.createOffGesture)(element, gestureFunction);
    return [onGesture, offGesture];
};
exports.createGesture = createGesture;
var createOnGesture = function (element, gesture) {
    //addEventListener 해주는 함수 반환
    var gestureKeys = ['dragStart', 'drag', 'dragEnd'];
    var gestureFunction = gestureKeys.reduce(function (acc, item) {
        var touchEventInfoFunction = (0, getInfoFunction_1.createEventInfoFunction)();
        acc[item] = [getInfoFunction_1.createGestureFunction[item][0](gesture[item], touchEventInfoFunction),
            getInfoFunction_1.createGestureFunction[item][1](gesture[item], touchEventInfoFunction)];
        return acc;
    }, {});
    return [
        function () {
            element.addEventListener('touchstart', gestureFunction.dragStart[0]);
            // element.addEventListener('touchmove', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
            // element.addEventListener('touchcancel', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
            element.addEventListener('mousedown', gestureFunction.dragStart[0]);
            // element.addEventListener('mousemove', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
            // element.addEventListener('mouseleave', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
        },
        gestureFunction
    ];
};
exports.createOnGesture = createOnGesture;
var createOffGesture = function (element, gestureFunction) {
    //removeEventListener 해주는 함수 반환
    var gestureKeys = ['dragStart', 'drag', 'dragEnd'];
    return function () {
        element.removeEventListener('touchstart', gestureFunction.dragStart[0]);
        element.removeEventListener('touchmove', gestureFunction.dragStart[0]);
        element.removeEventListener('touchend', gestureFunction.dragStart[0]);
        element.removeEventListener('mousedown', gestureFunction.dragStart[0]);
        element.removeEventListener('mousemove', gestureFunction.dragStart[0]);
        element.removeEventListener('mouseup', gestureFunction.dragStart[0]);
    };
};
exports.createOffGesture = createOffGesture;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createEventInfoFunction = exports.createGestureFunction = exports.$createMouseUpFunction = exports.$createTouchEndFunction = exports.$createMouseMoveFunction = exports.$createTouchMoveFunction = exports.$createMouseDownFunction = exports.$createTouchStartFunction = void 0;
var $createTouchStartFunction = function (element, callback, touchEventInfoFunction) {
    //touchstart시 실행할 함수
    return function (e) {
        e.preventDefault();
        var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
        callback && callback(info, e);
    };
};
exports.$createTouchStartFunction = $createTouchStartFunction;
var $createMouseDownFunction = function (element, callback, touchEventInfoFunction) {
    //mousedown 실행할 함수
    return function (e) {
        var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
        callback && callback(info, e);
    };
};
exports.$createMouseDownFunction = $createMouseDownFunction;
var $createTouchMoveFunction = function (element, callback, touchEventInfoFunction) {
    //touchmove시 실행할 함수
    return function (e) {
        e.preventDefault();
        var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
        callback && callback(info, e);
    };
};
exports.$createTouchMoveFunction = $createTouchMoveFunction;
var $createMouseMoveFunction = function (element, callback, touchEventInfoFunction) {
    //mousemove 실행할 함수
    return function (e) {
        var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
        callback && callback(info, e);
    };
};
exports.$createMouseMoveFunction = $createMouseMoveFunction;
var $createTouchEndFunction = function (element, callback, touchEventInfoFunction) {
    //touchend시 실행할 함수
    return function (e) {
        e.preventDefault();
        var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
        callback && callback(info, e);
    };
};
exports.$createTouchEndFunction = $createTouchEndFunction;
var $createMouseUpFunction = function (element, callback, touchEventInfoFunction) {
    //mouseup 실행할 함수
    return function (e) {
        var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
        callback && callback(info, e);
    };
};
exports.$createMouseUpFunction = $createMouseUpFunction;
exports.createGestureFunction = {
    dragStart: [exports.$createTouchStartFunction, exports.$createMouseDownFunction],
    drag: [exports.$createTouchMoveFunction, exports.$createMouseMoveFunction],
    dragEnd: [exports.$createTouchEndFunction, exports.$createMouseUpFunction]
};
var createEventInfoFunction = function (event, prevData) {
    var clientX = event ? event.type.substring(0, 5) === 'mouse' ?
        event.clientX : event.touches[0].clientX
        : 0;
    var clientY = event ? event.type.substring(0, 5) === 'mouse' ?
        event.clientY : event.touches[0].clientY
        : 0;
    var moveX = prevData !== undefined ? clientX - prevData.position[0] : 0;
    var moveY = prevData !== undefined ? clientY - prevData.position[1] : 0;
    var distance1 = prevData !== undefined ? clientX - prevData.start[0] : 0;
    var distance2 = prevData !== undefined ? clientY - prevData.start[1] : 0;
    var distance3 = Math.sqrt(Math.abs(distance1 * distance1) + Math.abs(distance2 * distance2));
    var move3 = Math.sqrt(Math.abs(moveX * moveX) + Math.abs(moveY * moveY));
    prevData = {
        start: [prevData !== undefined ? prevData.start[0] : clientX,
            prevData !== undefined ? prevData.start[1] : clientY],
        move: [moveX, moveY, move3],
        position: [clientX, clientY],
        prePosition: [prevData !== undefined ? prevData.prePosition[0] : clientX,
            prevData !== undefined ? prevData.prePosition[1] : clientY],
        direction: [prevData !== undefined ? moveX > 0 ? 1 : moveX < 0 ? -1 : 0 : 0,
            prevData !== undefined ? moveY > 0 ? 1 : moveY < 0 ? -1 : 0 : 0],
        distance: [distance1, distance2, distance1],
        distanceAll: prevData !== undefined ? prevData.distanceAll += distance3 : 0,
        type: event ? event.type : ''
    };
    return function ($event) {
        var isStart = $event.type === 'touchstart' ||
            prevData.type === '' ||
            $event.type === 'mousedown' ||
            prevData.type === '';
        var isReset = isStart || prevData === undefined;
        var $clientX = $event ? $event.type.substring(0, 5) === 'mouse' ?
            $event.clientX : $event.touches[0].clientX
            : 0;
        var $clientY = $event ? $event.type.substring(0, 5) === 'mouse' ?
            $event.clientY : $event.touches[0].clientY
            : 0;
        var $moveX = !isReset ? $clientX - prevData.position[0] : 0;
        var $moveY = !isReset ? $clientY - prevData.position[1] : 0;
        var $distance1 = !isReset ? $clientX - prevData.start[0] : 0;
        var $distance2 = !isReset ? $clientY - prevData.start[1] : 0;
        var $distance3 = Math.sqrt(Math.abs($distance1 * $distance1) + Math.abs($distance2 * $distance2));
        var $move3 = Math.sqrt(Math.abs($moveX * $moveX) + Math.abs($moveY * $moveY));
        var thisData = {
            start: [!isStart ? prevData.start[0] : $clientX,
                !isStart ? prevData.start[1] : $clientY],
            move: [$moveX, $moveY, $move3],
            position: [$clientX, $clientY],
            prePosition: [isStart ? prevData.prePosition[0] : $clientX,
                isStart ? prevData.prePosition[1] : $clientY],
            direction: [prevData !== undefined ? $moveX > 0 ? 1 : $moveX < 0 ? -1 : 0 : 0,
                prevData !== undefined ? $moveY > 0 ? 1 : $moveY < 0 ? -1 : 0 : 0],
            distance: [$distance1, $distance2, $distance1],
            distanceAll: prevData !== undefined ? prevData.distanceAll += $distance3 : 0,
            type: $event.type
        };
        prevData = JSON.parse(JSON.stringify(thisData));
        return thisData;
    };
};
exports.createEventInfoFunction = createEventInfoFunction;


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
    var _a = (0, elementGesture_1.createGesture)(box, {
        dragStart: function (r) { console.log(r); },
        drag: function (r) { console.log(r.position, r.prePosition); }
    }), on = _a[0], off = _a[1];
    window.gesture = [on, off];
    on();
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