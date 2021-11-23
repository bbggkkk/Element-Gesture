import { createGestureFunction, createEventInfoFunction } from "./getInfoFunction";

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
    const gestureFunction:gestureWrap = gestureKeys.reduce((acc:gestureWrap, item:string) => {
        const touchEventInfoFunction = createEventInfoFunction();
        acc[item] = [createGestureFunction[item][0](gesture[item], touchEventInfoFunction),
                     createGestureFunction[item][1](gesture[item], touchEventInfoFunction)];
        return acc;
    }, {});

    return [
        () => {
            element.addEventListener('touchstart', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            // element.addEventListener('touchmove', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
            // element.addEventListener('touchcancel', gestureFunction.drag[0] as EventListenerOrEventListenerObject);

            element.addEventListener('mousedown', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            // element.addEventListener('mousemove', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
            // element.addEventListener('mouseleave', gestureFunction.drag[0] as EventListenerOrEventListenerObject);
        },
        gestureFunction
    ];

}
export const createOffGesture = (element:HTMLElement, gestureFunction:gestureWrap) => {
    //removeEventListener 해주는 함수 반환
    const gestureKeys = ['dragStart', 'drag', 'dragEnd'];
    return () => {
            element.removeEventListener('touchstart', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            element.removeEventListener('touchmove', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            element.removeEventListener('touchend', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);

            element.removeEventListener('mousedown', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            element.removeEventListener('mousemove', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
            element.removeEventListener('mouseup', gestureFunction.dragStart[0] as EventListenerOrEventListenerObject);
    };
}