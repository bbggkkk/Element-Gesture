import './elementGesture';

(function():void{
    const table = document?.querySelector('table');

    const updateData = (data:any):void => {
        const keys = Object.keys(data);
        keys.forEach(item => {
            const row = table?.querySelector(`:scope .${item}`) as any;
            const value = Array.isArray(data[item]) ? data[item] : [data[item]];
            value.forEach(($item:number|string,idx:number) => {
                row.querySelector(`:scope .v${idx+1}`).innerHTML = String($item);
            });
            // console.log(row?.querySelector(':scope .vname'));
        });
    }

    const box = document.querySelector('#box');
    
    box?.gesture({
        dragStart : (parameter:any, ele:Object, event:any) => {
            updateData(parameter);
            // console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        },
        drag : (parameter:any, ele:Object, event:any) => {
            updateData(parameter);
            // console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        },
        dragEnd : (parameter:any, ele:Object, event:any) => {
            updateData(parameter);
            // console.log("parameter :: ",parameter,"\nele :: ",ele,"\nevent :: ",event);
        }
    });
})();