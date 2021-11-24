import { createGestureFunction, createEventInfoFunction, createSendDataFunction } from "./getInfoFunction";

interface gesture {
    [index:string] : Function;
}
interface gestureWrap {
    [index:string] : Array<Function>
}

export const createGesture = (element:HTMLElement, gesture:gesture):Array<Function> => {
    //제스쳐 on,off 함수 반환
    const [onGesture, gestureFunction] = createOnGesture(element, gesture);
    const offGesture = createOffGesture(element, gestureFunction as gestureWrap);
    return [onGesture as Function, offGesture as Function];
}

export const createOnGesture = (element:HTMLElement, gesture:gesture) => {
    //addEventListener 해주는 함수 반환
    const gestureKeys = ['dragStart', 'drag', 'dragEnd'];
    const touchEventInfoFunction = createEventInfoFunction();
    const sendDataFunction = createSendDataFunction();
    const gestureFunction:gestureWrap = gestureKeys.reduce((acc:gestureWrap, item:string) => {
        acc[item] = [createGestureFunction[item][0](element, touchEventInfoFunction, sendDataFunction, gesture[item]),
                     createGestureFunction[item][1](element, touchEventInfoFunction, sendDataFunction, gesture[item])];
        return acc;
    }, {});

    return [
        () => {
            element.addEventListener('touchstart', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject, {passive : false});
            document.addEventListener('touchmove', gestureFunction.drag[0] as EventListenerOrEventListenerObject, {passive : false});
            document.addEventListener('touchend', gestureFunction.dragEnd[0] as EventListenerOrEventListenerObject, {passive : false});

            element.addEventListener('mousedown', gestureFunction.dragStart[1] as EventListenerOrEventListenerObject, {passive : true});
            document.addEventListener('mousemove', gestureFunction.drag[1] as EventListenerOrEventListenerObject, {passive : true});
            document.addEventListener('mouseup', gestureFunction.dragEnd[1] as EventListenerOrEventListenerObject, {passive : true});
        },
        gestureFunction
    ];

}
export const createOffGesture = (element:HTMLElement, gestureFunction:gestureWrap) => {
    //removeEventListener 해주는 함수 반환
    const gestureKeys = ['dragStart', 'drag', 'dragEnd'];
    return () => {
            element.removeEventListener('touchstart', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            document.removeEventListener('touchmove', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
            document.removeEventListener('touchend', gestureFunction.dragEnd[0] as EventListenerOrEventListenerObject);

            element.removeEventListener('mousedown', gestureFunction.dragStart[1] as EventListenerOrEventListenerObject);
            document.removeEventListener('mousemove', gestureFunction.drag[1] as EventListenerOrEventListenerObject);
            document.removeEventListener('mouseup', gestureFunction.dragEnd[1] as EventListenerOrEventListenerObject);
    };
}