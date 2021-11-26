import { createGestureFunction, createEventInfoFunction, createSendDataFunction } from "./getInfoFunction";

interface gesture {
    [index:string] : Function;
}
interface gestureWrap {
    [index:string] : Array<Function>
}

export const createGesture = (element:HTMLElement, gesture:gesture):Array<Function> => {
    //제스쳐 on,off 함수 반환
    const [onGesture, getDragStartFunction] = createOnGesture(element, gesture);
    const offGesture = createOffGesture(element, getDragStartFunction as Array<Function>);
    return [onGesture as Function, offGesture as Function];
}

export const createOnGesture = (element:HTMLElement, gesture:gesture) => {
    //addEventListener 해주는 함수 반환
    const touchEventInfoFunction = createEventInfoFunction();

    
    const sendDataFunction = createSendDataFunction();

    const getDragFunction:Array<Function> = [
        createGestureFunction['drag'][0](element, touchEventInfoFunction, sendDataFunction, gesture['drag']),
        createGestureFunction['drag'][1](element, touchEventInfoFunction, sendDataFunction, gesture['drag'])
    ];

    const getDragEndFunction:Array<Function> = [
        createGestureFunction['dragEnd'][0](element, touchEventInfoFunction, sendDataFunction, getDragFunction, gesture['dragEnd']),
        createGestureFunction['dragEnd'][1](element, touchEventInfoFunction, sendDataFunction, getDragFunction, gesture['dragEnd'])
    ];
    
    const getDragStartFunction:Array<Function> = [
        createGestureFunction['dragStart'][0](element, touchEventInfoFunction, sendDataFunction, getDragFunction, getDragEndFunction, gesture['dragStart']),
        createGestureFunction['dragStart'][1](element, touchEventInfoFunction, sendDataFunction, getDragFunction, getDragEndFunction, gesture['dragStart'])
    ];

    return [
        () => {
            element.addEventListener('touchstart', getDragStartFunction[0] as EventListenerOrEventListenerObject, {passive : false});

            element.addEventListener('mousedown', getDragStartFunction[1] as EventListenerOrEventListenerObject, {passive : true});
        },
        getDragStartFunction
    ];

}
export const createOffGesture = (element:HTMLElement, gestureFunction:Array<Function>) => {
    //removeEventListener 해주는 함수 반환
    return () => {
            element.removeEventListener('touchstart', gestureFunction[0] as EventListenerOrEventListenerObject);

            element.removeEventListener('mousedown', gestureFunction[1] as EventListenerOrEventListenerObject);
    };
}