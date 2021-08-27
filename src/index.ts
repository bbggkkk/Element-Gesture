import './elementGesture';

(function():void{

    const box = document.querySelector('#box');
    
    box?.gesture({
        dragStart : (parameter:any, ele:Object, event:any) => {
            console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        },
        drag : (parameter:any, ele:Object, event:any) => {
            console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        },
        dragEnd : (parameter:any, ele:Object, event:any) => {
            console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        }
    });

})();