"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./elementGesture");
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
//# sourceMappingURL=index.js.map