interface createGestureFunction{
    [index:string] : Function;
}
interface gestureWrap {
    [index:string] : Array<Function>
}

export const $createTouchStartFunction = (callback:Function) => {
    //touchstart시 실행할 함수
    return (e:TouchEvent) => {
        callback();
    }
}
export const $createMouseDownFunction = (callback:Function) => {
    //mousedown 실행할 함수
    return (e:MouseEvent) => {
        callback();
    }
}
export const createGestureFunction:gestureWrap = {
    dragStart : [$createTouchStartFunction, $createMouseDownFunction ]
}

interface touchEventData {
    [index:string] : number|Array<number>;
}
// export const createTouchEventInfoFunction = (event:TouchEvent) => {
//     let touchEventData:touchEventData = {};
//     return (event:TouchEvent) => {
//         const clientX = event.touches[0].clientX;
//         const clientY = event.touches[0].clientY;
//         const moveX   = touchEventData ? clientX - touchEventData.position[0] : 0
//         const moveY   = touchEventData ? clientY - touchEventData.position[1] : 0
    
//         const distance1 = clientX - touchEventData.start[0];
//         const distance2 = clientY - touchEventData.start[1];
//         const distance3 = Math.sqrt(Math.abs(distance1*distance1)+Math.abs(distance2*distance2));
    
//         const move3     = Math.sqrt(Math.abs(moveX*moveX)+Math.abs(moveY*moveY))
//     }
// }