import './elementGesture';
import { createGesture } from './elementGesture';

declare global {
    interface Window {
        gesture : Array<Function>
    }
}

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
    const test = (e:any) => {
        console.log('console\n\n', `type :: ${e.type}\n`, `direction :: ${e.direction}\n`, `distance :: ${e.distance}\n`, `distanceAll :: ${e.distanceAll}\n`, `move :: ${e.move}\n`, `position :: ${e.position}\n`, `prePosition :: ${e.prePosition}\n`, `start :: ${e.start}\n`);
    }
    
    const [on, off] = createGesture(box as HTMLElement, {
        dragStart   : (r:any) => { updateData(r); },
        drag        : (r:any) => { updateData(r); },
        dragEnd     : (r:any) => { updateData(r); },
    });
    window.gesture = [on, off];
    on();

})();