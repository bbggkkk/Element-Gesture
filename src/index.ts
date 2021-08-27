import './elementGesture';

(function():void{

    const box = document.querySelector('#box');
    
    box?.gesture({
        drag : (parameter:any, ele:Object, event:any) => {
            console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        }
    });

})();