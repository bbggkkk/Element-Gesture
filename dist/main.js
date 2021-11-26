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
    var _a = (0, exports.createOnGesture)(element, gesture), onGesture = _a[0], getDragStartFunction = _a[1];
    var offGesture = (0, exports.createOffGesture)(element, getDragStartFunction);
    return [onGesture, offGesture];
};
exports.createGesture = createGesture;
var createOnGesture = function (element, gesture) {
    //addEventListener 해주는 함수 반환
    var touchEventInfoFunction = (0, getInfoFunction_1.createEventInfoFunction)();
    var sendDataFunction = (0, getInfoFunction_1.createSendDataFunction)();
    var getDragFunction = [
        getInfoFunction_1.createGestureFunction['drag'][0](element, touchEventInfoFunction, sendDataFunction, gesture['drag']),
        getInfoFunction_1.createGestureFunction['drag'][1](element, touchEventInfoFunction, sendDataFunction, gesture['drag'])
    ];
    var getDragEndFunction = [
        getInfoFunction_1.createGestureFunction['dragEnd'][0](element, touchEventInfoFunction, sendDataFunction, getDragFunction, gesture['dragEnd']),
        getInfoFunction_1.createGestureFunction['dragEnd'][1](element, touchEventInfoFunction, sendDataFunction, getDragFunction, gesture['dragEnd'])
    ];
    var getDragStartFunction = [
        getInfoFunction_1.createGestureFunction['dragStart'][0](element, touchEventInfoFunction, sendDataFunction, getDragFunction, getDragEndFunction, gesture['dragStart']),
        getInfoFunction_1.createGestureFunction['dragStart'][1](element, touchEventInfoFunction, sendDataFunction, getDragFunction, getDragEndFunction, gesture['dragStart'])
    ];
    return [
        function () {
            element.addEventListener('touchstart', getDragStartFunction[0], { passive: false });
            element.addEventListener('mousedown', getDragStartFunction[1], { passive: true });
        },
        getDragStartFunction
    ];
};
exports.createOnGesture = createOnGesture;
var createOffGesture = function (element, gestureFunction) {
    //removeEventListener 해주는 함수 반환
    return function () {
        element.removeEventListener('touchstart', gestureFunction[0]);
        element.removeEventListener('mousedown', gestureFunction[1]);
    };
};
exports.createOffGesture = createOffGesture;


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createEventInfoFunction = exports.createSendDataFunction = exports.createGestureFunction = exports.$createMouseUpFunction = exports.$createTouchEndFunction = exports.$createMouseMoveFunction = exports.$createTouchMoveFunction = exports.$createMouseDownFunction = exports.$createTouchStartFunction = void 0;
var $createTouchStartFunction = function (element, touchEventInfoFunction, sendDataFunction, dragFunction, dragEndFunction, callback) {
    //touchstart시 실행할 함수
    return function (e) {
        e.preventDefault();
        document.addEventListener('touchmove', dragFunction[0], { passive: false });
        document.addEventListener('touchend', dragEndFunction[0], { passive: false });
        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, info, bf, originData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = touchEventInfoFunction ? touchEventInfoFunction(e) : '', info = _a[0], bf = _a[1];
                        originData = sendDataFunction[0]();
                        _b = callback;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = sendDataFunction)[1];
                        return [4 /*yield*/, callback.call(element, info, e, originData)];
                    case 1:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 2;
                    case 2:
                        _b;
                        return [2 /*return*/];
                }
            });
        }); });
    };
};
exports.$createTouchStartFunction = $createTouchStartFunction;
var $createMouseDownFunction = function (element, touchEventInfoFunction, sendDataFunction, dragFunction, dragEndFunction, callback) {
    //mousedown 실행할 함수
    return function (e) {
        document.addEventListener('mousemove', dragFunction[1], { passive: true });
        document.addEventListener('mouseup', dragEndFunction[1], { passive: true });
        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, info, bf, originData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = touchEventInfoFunction ? touchEventInfoFunction(e) : '', info = _a[0], bf = _a[1];
                        originData = sendDataFunction[0]();
                        _b = callback;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = sendDataFunction)[1];
                        return [4 /*yield*/, callback.call(element, info, e, originData)];
                    case 1:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 2;
                    case 2:
                        _b;
                        return [2 /*return*/];
                }
            });
        }); });
    };
};
exports.$createMouseDownFunction = $createMouseDownFunction;
var $createTouchMoveFunction = function (element, touchEventInfoFunction, sendDataFunction, callback) {
    //touchmove시 실행할 함수
    return function (e) {
        e.preventDefault();
        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, info, bf, originData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = touchEventInfoFunction ? touchEventInfoFunction(e) : '', info = _a[0], bf = _a[1];
                        originData = sendDataFunction[0]();
                        _b = info.isClicked && callback;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = sendDataFunction)[1];
                        return [4 /*yield*/, callback.call(element, info, e, originData)];
                    case 1:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 2;
                    case 2:
                        _b;
                        return [2 /*return*/];
                }
            });
        }); });
    };
};
exports.$createTouchMoveFunction = $createTouchMoveFunction;
var $createMouseMoveFunction = function (element, touchEventInfoFunction, sendDataFunction, callback) {
    //mousemove 실행할 함수
    return function (e) {
        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, info, bf, originData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = touchEventInfoFunction ? touchEventInfoFunction(e) : '', info = _a[0], bf = _a[1];
                        originData = sendDataFunction[0]();
                        _b = info.isClicked && callback;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = sendDataFunction)[1];
                        return [4 /*yield*/, callback.call(element, info, e, originData)];
                    case 1:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 2;
                    case 2:
                        _b;
                        return [2 /*return*/];
                }
            });
        }); });
    };
};
exports.$createMouseMoveFunction = $createMouseMoveFunction;
var $createTouchEndFunction = function (element, touchEventInfoFunction, sendDataFunction, dragFunction, callback) {
    //touchend시 실행할 함수
    var rtFunction = function (e) {
        e.preventDefault();
        document.removeEventListener('touchend', dragFunction[0]);
        document.removeEventListener('touchend', rtFunction);
        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, info, bf, originData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = touchEventInfoFunction ? touchEventInfoFunction(e) : '', info = _a[0], bf = _a[1];
                        originData = sendDataFunction[0]();
                        _b = (bf.type !== '' && bf.type !== 'dragEnd') && callback;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = sendDataFunction)[1];
                        return [4 /*yield*/, callback.call(element, info, e, originData)];
                    case 1:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 2;
                    case 2:
                        _b;
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return rtFunction;
};
exports.$createTouchEndFunction = $createTouchEndFunction;
var $createMouseUpFunction = function (element, touchEventInfoFunction, sendDataFunction, dragFunction, callback) {
    //mouseup 실행할 함수
    var rtFunction = function (e) {
        document.removeEventListener('mouseup', dragFunction[1]);
        document.removeEventListener('mouseup', rtFunction);
        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, info, bf, originData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = touchEventInfoFunction ? touchEventInfoFunction(e) : '', info = _a[0], bf = _a[1];
                        originData = sendDataFunction[0]();
                        _b = bf.isClicked === true && callback;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = sendDataFunction)[1];
                        return [4 /*yield*/, callback.call(element, info, e, originData)];
                    case 1:
                        _b = _d.apply(_c, [_e.sent()]);
                        _e.label = 2;
                    case 2:
                        _b;
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return rtFunction;
};
exports.$createMouseUpFunction = $createMouseUpFunction;
exports.createGestureFunction = {
    dragStart: [exports.$createTouchStartFunction, exports.$createMouseDownFunction],
    drag: [exports.$createTouchMoveFunction, exports.$createMouseMoveFunction],
    dragEnd: [exports.$createTouchEndFunction, exports.$createMouseUpFunction]
};
var createSendDataFunction = function () {
    var originData = undefined;
    return [function () {
            return originData;
        }, function (data) {
            originData = data;
            return originData;
        }];
};
exports.createSendDataFunction = createSendDataFunction;
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
        var before = JSON.parse(JSON.stringify(prevData));
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
        return [thisData, before];
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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