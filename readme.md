# Element-Gesture
엘리먼트를 드래그하면 드래그한 방향, 거리, 위치등을 반환하는 메서드입니다. 인자로 키가 이벤트명이고 값이 함수인 객체를 받습니다.

## 사용방법
Element-Gesture는 세가지 이벤트를 지원합니다.

| 이벤트     | 의미            |
| ---------|:--------------  |
| `dragStart`| 드래그를 시작할 때 |
| `drag`     | 드래그를 실행할 때 |
| `dragEnd`  | 드래그를 끝낼 때   |

아래와 같이 사용할 수 있습니다.


```HTML
<body>
    <div id="box"></div>
</body>
```
```js
const box = document.querySelector('#box');
const [on, off] = createGesture(box as HTMLElement, {
    dragStart   : (r:any, e:TouchEvent|MouseEvent, rt:any) => { ... },
    drag        : (r:any, e:TouchEvent|MouseEvent, rt:any) => { ... },
    dragEnd     : (r:any, e:TouchEvent|MouseEvent, rt:any) => { ... },
});
on();
```
createGesutre 함수의 인풋입니다.
|이름|설명|형식|비고|
|--|:--|:--|:--|
|element|이벤트를 적용할 엘리먼트|`HTMLElement`||
|callback|이벤트 후 실행할 함수|`Function`||

콜백함수의 첫번째 인자는 제스쳐 이동 값들입니다.

| 이름 | 설명 | 형식 |비고|
|---|:---|:----|---|
|**type**|이벤트 이름|`string`|`dragStart`, `drag`, `dragEnd`|
|**start**|드래그를 시작한 위치|`array`| `[x, y]` |
|**direction**|드래그를 하는 방향|`array`| `[x, y]` |
|**move**|이번 틱에 이동한 거리|`array`| `[x, y, total]` |
|**position**|현재 포인터의 위치|`array`| `[x, y]` |
|**prePosition**|이전 포인터의 위치|`array`| `[x, y]` |
|**distance**|시작점으로부터의 이동 거리|`array`| `[x, y, total]` |
|**distanceAll**|시작점으로부터의 현재까지 이동한 총 거리|`number`||
|**isClicked**|클릭상태인지 아닌지|`boolean`||

콜백함수의 두번째 인자는 실제 발생한 이벤트의 객체입니다.

콜백함수의 세번째 인자는 콜백함수에서 반환한 값입니다.


## 사용하기
- [데모페이지](https://bbggkkk.github.io/Element-Gesture/)
- [타입스크립트](https://github.com/bbggkkk/Element-Gesture/blob/master/src/elementGesture.ts)
- [자바스크립트](https://github.com/bbggkkk/Element-Gesture/blob/master/dist/elementGesture.js)