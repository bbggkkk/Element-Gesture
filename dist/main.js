/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (() => {


/**
 *
 *
필요값


drag

시작지점
startX,startY

시작으로부터 현재까지의 이동거리
distanceX,distanceY,distance

이전 틱과의 이동거리
moveX,moveY,move

현재 위치
positionX,positionY

이전 위치
prePositionX,prePositionY

속도 (기준 잡아야함 (ex. 초당 이동한 픽셀))
speedX,speedY,speed

이동 방향
direction

총 이동거리
distanceAll

*/
HTMLElement.prototype.gesture = function ($event) {
    //dragStart,drag,dragEnd
    var _this = this;
    var type = Object.keys($event);
    this.gestureData = {};
    type.forEach(function (item) {
        _this.addEventListener('mousedown', function (event) {
            var mousemove = function (event) {
                requestAnimationFrame(function () {
                    var clientX = event.clientX, clientY = event.clientY, moveX = event.movementX, moveY = event.movementY;
                    var distance1 = clientX - _this.gestureData.dragStart.start[0];
                    var distance2 = clientY - _this.gestureData.dragStart.start[1];
                    var distance3 = Math.sqrt(Math.abs(distance1 * distance1) + Math.abs(distance2 * distance2));
                    var move3 = Math.sqrt(Math.abs(moveX * moveX) + Math.abs(moveY * moveY));
                    _this.gestureData.drag = {
                        start: _this.gestureData.dragStart.start,
                        offset: _this.gestureData.dragStart.offset,
                        distance: [
                            distance1,
                            distance2,
                            distance3
                        ],
                        move: [
                            moveX,
                            moveY,
                            move3
                        ],
                        prePosition: [
                            _this.gestureData.drag ? _this.gestureData.drag.position[0] : clientX,
                            _this.gestureData.drag ? _this.gestureData.drag.position[1] : clientY
                        ],
                        position: [
                            clientX,
                            clientY
                        ],
                        speed: [0, 0, 0],
                        direction: [
                            moveX > 0 ? 1 : moveX < 0 ? -1 : 0,
                            moveY > 0 ? 1 : moveY < 0 ? -1 : 0
                        ],
                        distanceAll: _this.gestureData.drag ? _this.gestureData.drag.distanceAll + move3 : 0
                    };
                    if (item === 'drag') {
                        $event[item](_this.gestureData.drag, _this, event);
                    }
                });
            };
            var mouseup = function (event) {
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
                if (item === 'dragEnd') {
                    $event[item](_this.gestureData.drag, _this, event);
                }
                _this.gestureData.drag.distanceAll = 0;
            };
            _this.gestureData.dragStart = {
                start: [event.clientX, event.clientY],
                // offset      : [event.offsetX,event.offsetY],
                distance: [0, 0, 0],
                move: [0, 0, 0],
                position: [event.clientX, event.clientY],
                prePosition: [event.clientX, event.clientY],
                speed: [0, 0, 0],
                direction: [0, 0],
                distanceAll: 0
            };
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);
        });
        _this.addEventListener('touchstart', function (event) {
            var touchmove = function (event) {
                requestAnimationFrame(function () {
                    var clientX = event.touches[0].clientX;
                    var clientY = event.touches[0].clientY;
                    var moveX = _this.gestureData.drag ? clientX - _this.gestureData.drag.prePosition[0] : 0;
                    var moveY = _this.gestureData.drag ? clientY - _this.gestureData.drag.prePosition[1] : 0;
                    var distance1 = clientX - _this.gestureData.dragStart.start[0];
                    var distance2 = clientY - _this.gestureData.dragStart.start[1];
                    var distance3 = Math.sqrt(Math.abs(distance1 * distance1) + Math.abs(distance2 * distance2));
                    var move3 = Math.sqrt(Math.abs(moveX * moveX) + Math.abs(moveY * moveY));
                    _this.gestureData.drag = {
                        start: _this.gestureData.dragStart.start,
                        offset: _this.gestureData.dragStart.offset,
                        distance: [
                            distance1,
                            distance2,
                            distance3
                        ],
                        move: [
                            moveX,
                            moveY,
                            move3
                        ],
                        prePosition: [
                            _this.gestureData.drag ? _this.gestureData.drag.position[0] : clientX,
                            _this.gestureData.drag ? _this.gestureData.drag.position[1] : clientY
                        ],
                        position: [
                            clientX,
                            clientY
                        ],
                        speed: [0, 0, 0],
                        direction: [
                            moveX > 0 ? 1 : moveX < 0 ? -1 : 0,
                            moveY > 0 ? 1 : moveY < 0 ? -1 : 0
                        ],
                        distanceAll: _this.gestureData.drag ? _this.gestureData.drag.distanceAll + move3 : 0
                    };
                    if (item === 'drag') {
                        $event[item](_this.gestureData.drag, _this, event);
                    }
                });
            };
            var touchend = function (event) {
                document.removeEventListener('touchmove', touchmove);
                document.removeEventListener('touchend', touchend);
                if (item === 'dragEnd') {
                    $event[item](_this.gestureData.drag, _this, event);
                }
                _this.gestureData.drag.distanceAll = 0;
            };
            var clientX = event.touches[0].clientX;
            var clientY = event.touches[0].clientY;
            _this.gestureData.dragStart = {
                start: [clientX, clientY],
                // offset      : [offsetX,offsetY],
                distance: [0, 0, 0],
                move: [0, 0, 0],
                position: [clientX, clientY],
                prePosition: [clientX, clientY],
                speed: [0, 0, 0],
                direction: [0, 0],
                distanceAll: 0
            };
            document.addEventListener('touchmove', touchmove);
            document.addEventListener('touchend', touchend);
        });
    });
};


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
(function () {
    var box = document.querySelector('#box');
    box === null || box === void 0 ? void 0 : box.gesture({
        dragStart: function (parameter, ele, event) {
            console.log("parameter :: ", parameter, "\nele :: ", ele, "\nevent :: ", event);
        },
        drag: function (parameter, ele, event) {
            console.log("parameter :: ", parameter, "\nele :: ", ele, "\nevent :: ", event);
        },
        dragEnd: function (parameter, ele, event) {
            console.log("parameter :: ", parameter, "\nele :: ", ele, "\nevent :: ", event);
        }
    });
})();

})();

/******/ })()
;