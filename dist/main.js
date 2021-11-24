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
    var touchEventInfoFunction = (0, getInfoFunction_1.createEventInfoFunction)();
    var gestureFunction = gestureKeys.reduce(function (acc, item) {
        acc[item] = [getInfoFunction_1.createGestureFunction[item][0](element, touchEventInfoFunction, gesture[item]),
            getInfoFunction_1.createGestureFunction[item][1](element, touchEventInfoFunction, gesture[item])];
        return acc;
    }, {});
    return [
        function () {
            element.addEventListener('touchstart', gestureFunction.dragStart[0], { passive: false });
            document.addEventListener('touchmove', gestureFunction.drag[0], { passive: false });
            document.addEventListener('touchend', gestureFunction.dragEnd[0], { passive: false });
            element.addEventListener('mousedown', gestureFunction.dragStart[1], { passive: true });
            document.addEventListener('mousemove', gestureFunction.drag[1], { passive: true });
            document.addEventListener('mouseup', gestureFunction.dragEnd[1], { passive: true });
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
        document.removeEventListener('touchmove', gestureFunction.drag[0]);
        document.removeEventListener('touchend', gestureFunction.dragEnd[0]);
        element.removeEventListener('mousedown', gestureFunction.dragStart[1]);
        document.removeEventListener('mousemove', gestureFunction.drag[1]);
        document.removeEventListener('mouseup', gestureFunction.dragEnd[1]);
    };
};
exports.createOffGesture = createOffGesture;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createEventInfoFunction = exports.createGestureFunction = exports.$createMouseUpFunction = exports.$createTouchEndFunction = exports.$createMouseMoveFunction = exports.$createTouchMoveFunction = exports.$createMouseDownFunction = exports.$createTouchStartFunction = void 0;
var $createTouchStartFunction = function (element, touchEventInfoFunction, callback) {
    //touchstart시 실행할 함수
    return function (e) {
        e.preventDefault();
        requestAnimationFrame(function () {
            var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            callback && callback.call(element, info, e);
        });
    };
};
exports.$createTouchStartFunction = $createTouchStartFunction;
var $createMouseDownFunction = function (element, touchEventInfoFunction, callback) {
    //mousedown 실행할 함수
    return function (e) {
        requestAnimationFrame(function () {
            var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            callback && callback.call(element, info, e);
        });
    };
};
exports.$createMouseDownFunction = $createMouseDownFunction;
var $createTouchMoveFunction = function (element, touchEventInfoFunction, callback) {
    //touchmove시 실행할 함수
    return function (e) {
        e.preventDefault();
        requestAnimationFrame(function () {
            var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            info.isClicked && callback && callback.call(element, info, e);
        });
    };
};
exports.$createTouchMoveFunction = $createTouchMoveFunction;
var $createMouseMoveFunction = function (element, touchEventInfoFunction, callback) {
    //mousemove 실행할 함수
    return function (e) {
        requestAnimationFrame(function () {
            var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            info.isClicked && callback && callback.call(element, info, e);
        });
    };
};
exports.$createMouseMoveFunction = $createMouseMoveFunction;
var $createTouchEndFunction = function (element, touchEventInfoFunction, callback) {
    //touchend시 실행할 함수
    return function (e) {
        e.preventDefault();
        requestAnimationFrame(function () {
            var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            callback && callback.call(element, info, e);
        });
    };
};
exports.$createTouchEndFunction = $createTouchEndFunction;
var $createMouseUpFunction = function (element, touchEventInfoFunction, callback) {
    //mouseup 실행할 함수
    return function (e) {
        requestAnimationFrame(function () {
            var info = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            callback && callback.call(element, info, e);
        });
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
    // prevData = undefined;
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
        type: event ? event.type : '',
        isClicked: false
    };
    return function ($event) {
        var type = $event.type === 'touchstart' || $event.type === 'mousedown'
            ? 'dragStart' : $event.type === 'touchmove' || $event.type === 'mousemove'
            ? 'drag' : $event.type === 'touchend' || $event.type === 'mouseup'
            ? 'dragEnd' : '';
        var isStart = type === 'dragStart' || prevData.type === '';
        var isReset = isStart || prevData === undefined;
        var $clientX = $event ? $event.type.substring(0, 5) === 'mouse' ?
            $event.clientX :
            $event.type === 'touchend' ? prevData.position[0] :
                $event.touches[0].clientX
            : 0;
        var $clientY = $event ? $event.type.substring(0, 5) === 'mouse' ?
            $event.clientY :
            $event.type === 'touchend' ? prevData.position[1] :
                $event.touches[0].clientY
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
            prePosition: [!isStart ? prevData.position[0] : $clientX,
                !isStart ? prevData.position[1] : $clientY],
            direction: [prevData !== undefined ? $moveX > 0 ? 1 : $moveX < 0 ? -1 : 0 : 0,
                prevData !== undefined ? $moveY > 0 ? 1 : $moveY < 0 ? -1 : 0 : 0],
            distance: [$distance1, $distance2, $distance1],
            distanceAll: prevData !== undefined ? isStart ? 0 : prevData.distanceAll += $move3 : 0,
            type: type,
            isClicked: type === 'dragStart' ?
                true : type === 'dragEnd' ?
                false : prevData.isClicked
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
    var table = document === null || document === void 0 ? void 0 : document.querySelector('table');
    var updateData = function (data) {
        var keys = Object.keys(data);
        keys.forEach(function (item) {
            var row = table === null || table === void 0 ? void 0 : table.querySelector(":scope ." + item);
            var value = Array.isArray(data[item]) ? data[item] : [data[item]];
            value.forEach(function ($item, idx) {
                row.querySelector(":scope .v" + (idx + 1)).innerHTML = String($item);
            });
            // console.log(row?.querySelector(':scope .vname'));
        });
    };
    var box = document.querySelector('#box');
    var test = function (e) {
        console.log('console\n\n', "type :: " + e.type + "\n", "direction :: " + e.direction + "\n", "distance :: " + e.distance + "\n", "distanceAll :: " + e.distanceAll + "\n", "move :: " + e.move + "\n", "position :: " + e.position + "\n", "prePosition :: " + e.prePosition + "\n", "start :: " + e.start + "\n");
    };
    var _a = (0, elementGesture_1.createGesture)(box, {
        dragStart: function (r) { updateData(r); },
        drag: function (r) { updateData(r); },
        dragEnd: function (r) { updateData(r); },
    }), on = _a[0], off = _a[1];
    window.gesture = [on, off];
    on();
})();

})();

/******/ })()
;