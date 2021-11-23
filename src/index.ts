import './elementGesture';
import { createGesture } from './elementGesture';

(function():void{
    // const table = document?.querySelector('table');

    // const updateData = (data:any):void => {
    //     const keys = Object.keys(data);
    //     keys.forEach(item => {
    //         const row = table?.querySelector(`:scope .${item}`) as any;
    //         const value = Array.isArray(data[item]) ? data[item] : [data[item]];
    //         value.forEach(($item:number|string,idx:number) => {
    //             row.querySelector(`:scope .v${idx+1}`).innerHTML = String($item);
    //         });
    //         // console.log(row?.querySelector(':scope .vname'));
    //     });
    // }

    const box = document.querySelector('#box');
    createGesture(box as HTMLElement, {dragStart: (e:any) => { console.log(e); }})

    // box?.addEventListener('touchstart', (e) => {
    //     e.preventDefault();
    //     console.log('touchstart', e);
    // })
    // box?.addEventListener('touchmove', (e) => {
    //     console.log('touchmove', e);
    // })
    // box?.addEventListener('touchend', (e) => {
    //     console.log('touchend', e);
    // })
    // box?.addEventListener('mousedown', (e) => {
    //     console.log('mousedown');
    // })
    // box?.addEventListener('mousemove', (e) => {
    //     console.log('mousemove');
    // })

})();