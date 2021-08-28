interface TrackEvent {
    dragStart : Function;
    drag      : Function;
    dragEnd   : Function;
}
interface Element {
    gesture:Function;
    gestureData:any;
}
interface gestureData {
    dragStart:Object;
    drag:Object;
    dragEnd:Object;
}

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

HTMLElement.prototype.gesture = function($event:any){
    //dragStart,drag,dragEnd

    const eventMap:any = {
        mousedown  : 'dragStart',
        touchstart : 'dragStart',
        mousemove  : 'drag',
        touchmove  : 'drag',
        mouseup    : 'dragEnd',
        touchend   : 'dragEnd',
    }

    const type:Array<string> = Object.keys($event);
    this.gestureData     = {};

    // type.forEach(item => {
        this.addEventListener('mousedown',(event:MouseEvent) => {
            const mousemove = (event:MouseEvent) => {
                requestAnimationFrame(() => {
                    event.preventDefault();

                    const { clientX, clientY, movementX:moveX, movementY:moveY } = event;

                    const distance1 = clientX - this.gestureData.dragStart.start[0];
                    const distance2 = clientY - this.gestureData.dragStart.start[1];
                    const distance3 = Math.sqrt(Math.abs(distance1*distance1)+Math.abs(distance2*distance2));

                    const move3     = Math.sqrt(Math.abs(moveX*moveX)+Math.abs(moveY*moveY))
                    
                    this.gestureData.drag = {
                        start       : this.gestureData.dragStart.start,
                        // offset      : this.gestureData.dragStart.offset,
                        distance    : [
                            distance1,
                            distance2,
                            distance3
                        ],
                        move        : [
                            moveX,
                            moveY,
                            move3
                        ],
                        prePosition : [
                            this.gestureData.drag ? this.gestureData.drag.position[0] : clientX,
                            this.gestureData.drag ? this.gestureData.drag.position[1] : clientY
                        ],
                        position    : [
                            clientX,
                            clientY
                        ],
                        direction   : [
                            moveX > 0 ? 1 : moveX < 0 ? -1 : 0,
                            moveY > 0 ? 1 : moveY < 0 ? -1 : 0
                        ],
                        distanceAll : this.gestureData.drag ? this.gestureData.drag.distanceAll+move3 : 0,
                        type        : 'drag'
                    }         
                    
                    if($event[eventMap[event.type]] && eventMap[event.type] === 'drag'){
                        $event[eventMap[event.type]](this.gestureData.drag,this,event);
                    }
                });
            }
            const mouseup = (event:MouseEvent) => {
                event.preventDefault();
                document.removeEventListener('mousemove',mousemove);   
                document.removeEventListener('mouseup',mouseup); 
                if($event[eventMap[event.type]] && eventMap[event.type] === 'dragEnd'){
                    this.gestureData.dragEnd = this.gestureData.drag ? this.gestureData.drag : this.gestureData.dragStart;
                    this.gestureData.dragEnd.type = 'dragEnd';
                    $event[eventMap[event.type]](this.gestureData.dragEnd,this,event);
                }
                this.gestureData.drag && (this.gestureData.drag = undefined);
            }
            
            this.gestureData.dragStart = {
                start       : [event.clientX,event.clientY],
                // offset      : [event.offsetX,event.offsetY],
                distance    : [0,0,0],
                move        : [0,0,0],
                position    : [event.clientX,event.clientY],
                prePosition : [event.clientX,event.clientY],
                direction   : [0,0],
                distanceAll : 0,
                type        : 'dragStart'
            }

            if($event[eventMap[event.type]] && eventMap[event.type] === 'dragStart'){
                $event[eventMap[event.type]](this.gestureData.dragStart,this,event);
            }
            document.addEventListener('mousemove',mousemove);   
            document.addEventListener('mouseup',mouseup);   
        },true);

        this.addEventListener('touchstart',(event:TouchEvent) => {
            const touchmove = (event:TouchEvent) => {
                requestAnimationFrame(() => {


                    const clientX = event.touches[0].clientX;
                    const clientY = event.touches[0].clientY;
                    const moveX   = this.gestureData.drag ? clientX - this.gestureData.drag.position[0] : 0
                    const moveY   = this.gestureData.drag ? clientY - this.gestureData.drag.position[1] : 0

                    const distance1 = clientX - this.gestureData.dragStart.start[0];
                    const distance2 = clientY - this.gestureData.dragStart.start[1];
                    const distance3 = Math.sqrt(Math.abs(distance1*distance1)+Math.abs(distance2*distance2));

                    const move3     = Math.sqrt(Math.abs(moveX*moveX)+Math.abs(moveY*moveY))
                    
                    this.gestureData.drag = {
                        start       : this.gestureData.dragStart.start,
                        // offset      : this.gestureData.dragStart.offset,
                        distance    : [
                            distance1,
                            distance2,
                            distance3
                        ],
                        move        : [
                            moveX,
                            moveY,
                            move3
                        ],
                        prePosition : [
                            this.gestureData.drag ? this.gestureData.drag.position[0] : clientX,
                            this.gestureData.drag ? this.gestureData.drag.position[1] : clientY
                        ],
                        position    : [
                            clientX,
                            clientY
                        ],
                        direction   : [
                            moveX > 0 ? 1 : moveX < 0 ? -1 : 0,
                            moveY > 0 ? 1 : moveY < 0 ? -1 : 0
                        ],
                        distanceAll : this.gestureData.drag ? this.gestureData.drag.distanceAll+move3 : 0,
                        type        : 'drag'
                    }         
                    
                    if($event[eventMap[event.type]] && eventMap[event.type] === 'drag'){
                        $event[eventMap[event.type]](this.gestureData.drag,this,event);
                    }

                });
            }
            const touchend = (event:TouchEvent) => {
                document.removeEventListener('touchmove',touchmove);   
                document.removeEventListener('touchend',touchend);   
                if($event[eventMap[event.type]] && eventMap[event.type] === 'dragEnd'){
                    this.gestureData.dragEnd = this.gestureData.drag ? this.gestureData.drag : this.gestureData.dragStart;
                    this.gestureData.dragEnd.type = 'dragEnd';
                    $event[eventMap[event.type]](this.gestureData.dragEnd,this,event);
                }
                this.gestureData.drag && (this.gestureData.drag = undefined);

            }

            
            const clientX = event.touches[0].clientX;
            const clientY = event.touches[0].clientY;
            
            this.gestureData.dragStart = {
                start       : [clientX,clientY],
                // offset      : [offsetX,offsetY],
                distance    : [0,0,0],
                move        : [0,0,0],
                position    : [clientX,clientY],
                prePosition : [clientX,clientY],
                direction   : [0,0],
                distanceAll : 0,
                type        : 'dragStart'
            }        

            if($event[eventMap[event.type]] && eventMap[event.type] === 'dragStart'){
                $event[eventMap[event.type]](this.gestureData.dragStart,this,event);
            }
            document.addEventListener('touchmove',touchmove);   
            document.addEventListener('touchend',touchend);   
        });
    // });

}