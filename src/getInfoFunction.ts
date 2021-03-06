interface createGestureFunction{
    [index:string] : Function;
}
interface gestureWrap {
    [index:string] : Array<Function>
}
interface touchEventData {
    start       : Array<number>;
    move        : Array<number>;
    position    : Array<number>;
    prePosition : Array<number>;
    direction   : Array<number>;
    distance    : Array<number>;
    distanceAll : number;
    type        : string;

    isClicked   : Boolean;
}

export const $createTouchStartFunction = (element:HTMLElement, touchEventInfoFunction:Function, sendDataFunction:Array<Function>, dragFunction:Array<Function>, dragEndFunction:Array<Function>,  callback?:Function) => {
    //touchstart시 실행할 함수
    return (e:TouchEvent) => {
        e.preventDefault();
        document.addEventListener('touchmove', dragFunction[0] as EventListenerOrEventListenerObject, {passive:false});
        document.addEventListener('touchend', dragEndFunction[0] as EventListenerOrEventListenerObject, {passive:false});
        requestAnimationFrame(async () => {
            const [info, bf] = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            const originData = sendDataFunction[0]();
            callback && sendDataFunction[1](await callback.call(element, info, e, originData));
        });
    }
}
export const $createMouseDownFunction = (element:HTMLElement, touchEventInfoFunction:Function, sendDataFunction:Array<Function>, dragFunction:Array<Function>, dragEndFunction:Array<Function>,  callback?:Function) => {
    //mousedown 실행할 함수
    return (e:MouseEvent) => {
        document.addEventListener('mousemove', dragFunction[1] as EventListenerOrEventListenerObject, {passive:true});
        document.addEventListener('mouseup', dragEndFunction[1] as EventListenerOrEventListenerObject, {passive:true});
        requestAnimationFrame(async () => {
            const [info, bf] = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            const originData = sendDataFunction[0]();
            callback && sendDataFunction[1](await callback.call(element, info, e, originData));
        });
    }
}

export const $createTouchMoveFunction = (element:HTMLElement, touchEventInfoFunction:Function, sendDataFunction:Array<Function>, callback?:Function) => {
    //touchmove시 실행할 함수
    return (e:TouchEvent) => {
        e.preventDefault();
        requestAnimationFrame(async () => {
            const [info, bf] = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            const originData = sendDataFunction[0]();
            info.isClicked && callback && sendDataFunction[1](await callback.call(element, info, e, originData));
        });
    }
}
export const $createMouseMoveFunction = (element:HTMLElement, touchEventInfoFunction:Function, sendDataFunction:Array<Function>, callback?:Function) => {
    //mousemove 실행할 함수
    return (e:MouseEvent) => {
        requestAnimationFrame(async () => {
            const [info, bf] = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            const originData = sendDataFunction[0]();
            info.isClicked && callback && sendDataFunction[1](await callback.call(element, info, e, originData));
        });
    }
}

export const $createTouchEndFunction = (element:HTMLElement, touchEventInfoFunction:Function, sendDataFunction:Array<Function>, dragFunction:Array<Function>, callback?:Function) => {
    //touchend시 실행할 함수
    const rtFunction = (e:TouchEvent) => {
        e.preventDefault();
        document.removeEventListener('touchmove', dragFunction[0] as EventListenerOrEventListenerObject);
        document.removeEventListener('touchend', rtFunction as EventListenerOrEventListenerObject);
        requestAnimationFrame(async () => {
            const [info, bf] = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            const originData = sendDataFunction[0]();
            (bf.type !== '' && bf.type !== 'dragEnd') && callback && sendDataFunction[1](await callback.call(element, info, e, originData));
        });
    }
    return rtFunction;
}
export const $createMouseUpFunction = (element:HTMLElement, touchEventInfoFunction:Function, sendDataFunction:Array<Function>, dragFunction:Array<Function>, callback?:Function) => {
    //mouseup 실행할 함수
    const rtFunction = (e:MouseEvent) => {
        document.removeEventListener('mousemove', dragFunction[1] as EventListenerOrEventListenerObject);
        document.removeEventListener('mouseup', rtFunction as EventListenerOrEventListenerObject);
        requestAnimationFrame(async () => {
            const [info, bf] = touchEventInfoFunction ? touchEventInfoFunction(e) : '';
            const originData = sendDataFunction[0]();
            bf.isClicked === true && callback && sendDataFunction[1](await callback.call(element, info, e, originData));
        });
    }
    return rtFunction;
}

export const createGestureFunction:gestureWrap = {
    dragStart   : [$createTouchStartFunction, $createMouseDownFunction ],
    drag        : [$createTouchMoveFunction,  $createMouseMoveFunction ],
    dragEnd     : [$createTouchEndFunction,   $createMouseUpFunction ]
}

export const createSendDataFunction = ():Array<Function> => {
    let originData:any = undefined;
    return [() => {
        return originData;
    },(data:any) => {
        originData = data;
        return originData;
    }]
}
export const createEventInfoFunction = (event?:any, prevData?:touchEventData) => {
    const clientX = event ? event.type.substring(0,5) === 'mouse' ?
                    event.clientX : event.touches[0].clientX
                    : 0;
    const clientY = event ? event.type.substring(0,5) === 'mouse' ?
                    event.clientY : event.touches[0].clientY
                    : 0;
    const moveX   = prevData !== undefined ? clientX - prevData.position[0] : 0
    const moveY   = prevData !== undefined ? clientY - prevData.position[1] : 0

    const distance1 = prevData !== undefined ? clientX - prevData.start[0] : 0;
    const distance2 = prevData !== undefined ? clientY - prevData.start[1] : 0;
    const distance3 = Math.sqrt(Math.abs(distance1*distance1)+Math.abs(distance2*distance2));

    const move3     = Math.sqrt(Math.abs(moveX*moveX)+Math.abs(moveY*moveY));

    // prevData = undefined;
    prevData = {
        start       : [prevData !== undefined ? prevData.start[0] : clientX,
                       prevData !== undefined ? prevData.start[1] : clientY],
        move        : [moveX, moveY, move3],
        position    : [clientX, clientY],
        prePosition : [prevData !== undefined ? prevData.prePosition[0] : clientX,
                        prevData !== undefined ? prevData.prePosition[1] : clientY],
        direction   : [prevData !== undefined ? moveX>0?1:moveX<0?-1:0  : 0,
                       prevData !== undefined ? moveY>0?1:moveY<0?-1:0  : 0],
        distance    : [distance1, distance2, distance1],
        distanceAll : prevData !== undefined ? prevData.distanceAll += distance3 : 0,
        type        : event ? event.type : '',

        isClicked   : false
    }

    return ($event:any) => {
        const before  = JSON.parse(JSON.stringify(prevData));
        const type    = $event.type === 'touchstart' || $event.type === 'mousedown'
                        ? 'dragStart' : $event.type === 'touchmove' || $event.type === 'mousemove'
                        ? 'drag' : $event.type === 'touchend' || $event.type === 'mouseup'
                        ? 'dragEnd' : '';
        const isStart = type === 'dragStart' || prevData!.type === '';
        const isReset = isStart || prevData === undefined;

        const $clientX = $event ? $event.type.substring(0,5) === 'mouse' ?
                         $event.clientX : 
                         $event.type === 'touchend' ? prevData!.position[0] :
                         $event.touches[0].clientX
                         : 0;
        const $clientY = $event ? $event.type.substring(0,5) === 'mouse' ?
                         $event.clientY : 
                         $event.type === 'touchend' ? prevData!.position[1] :
                         $event.touches[0].clientY
                         : 0;

        const $moveX   = !isReset ? $clientX - prevData!.position[0] : 0;
        const $moveY   = !isReset ? $clientY - prevData!.position[1] : 0;

        const $distance1 = !isReset ? $clientX - prevData!.start[0] : 0;
        const $distance2 = !isReset ? $clientY - prevData!.start[1] : 0;
        const $distance3 = Math.sqrt(Math.abs($distance1*$distance1)+Math.abs($distance2*$distance2));

        const $move3     = Math.sqrt(Math.abs($moveX*$moveX)+Math.abs($moveY*$moveY));

        const thisData:touchEventData  = {
            start       : [!isStart ? prevData!.start[0] : $clientX,
                           !isStart ? prevData!.start[1] : $clientY],
            move        : [$moveX, $moveY, $move3],
            position    : [$clientX, $clientY],
            prePosition : [!isStart ? prevData!.position[0] : $clientX,
                           !isStart ? prevData!.position[1] : $clientY],
            direction   : type !== 'dragEnd' ?
                           [prevData !== undefined ? $moveX>0?1:$moveX<0?-1:0  : 0,
                            prevData !== undefined ? $moveY>0?1:$moveY<0?-1:0  : 0] :
                           [prevData!.direction[0], prevData!.direction[1]],
            distance    : [$distance1, $distance2, $distance1],
            distanceAll : prevData !== undefined ? isStart ? 0 : prevData.distanceAll += $move3 : 0,
            type        : type,

            isClicked   : type === 'dragStart' ?
                          true : type === 'dragEnd' ?
                          false : prevData!.isClicked
        }
        prevData = JSON.parse(JSON.stringify(thisData));


        return [thisData, before];
    }
}