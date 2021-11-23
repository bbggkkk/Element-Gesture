import { createGestureFunction } from "./getInfoFunction";

interface gesture {
    [index:string] : Function;
}
interface gestureWrap {
    [index:string] : Array<Function>
}

export const createGesture = (element:HTMLElement, gesture:gesture) => {
    //제스쳐 on,off 함수 반환
    const onGesture  = createOnGesture(element, gesture);
    const offGesture = createOffGesture(element, gesture);
    return [onGesture];
}

export const createOnGesture = (element:HTMLElement, gesture:gesture) => {
    //addEventListener 해주는 함수 반환
    const gestureKeys = Object.keys(gesture);
    const gestureFunction = gestureKeys.reduce((acc:gestureWrap, item:string) => {
        acc[item] = [createGestureFunction[item][0](gesture[item]),
                     createGestureFunction[item][1](gesture[item])];
        return acc;
    }, {});
    console.log(gestureFunction);
    // element.addEventListener('touchstart', );

}
export const createOffGesture = (element:HTMLElement, gesture:gesture) => {
    //removeEventListener 해주는 함수 반환
    const gestureKeys = Object.keys(gesture);
}