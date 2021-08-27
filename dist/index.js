"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./elementGesture");
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
    box === null || box === void 0 ? void 0 : box.gesture({
        dragStart: function (parameter, ele, event) {
            updateData(parameter);
            // console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        },
        drag: function (parameter, ele, event) {
            updateData(parameter);
            // console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        },
        dragEnd: function (parameter, ele, event) {
            updateData(parameter);
            // console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        }
    });
})();
//# sourceMappingURL=index.js.map