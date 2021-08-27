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
box.gesture({
    dragStart : (parameter,element,event) => {
        ...
    },
    drag : (parameter,element,event) => {
        ...
    },
    dragEnd : (parameter,element,event) => {
        ...
    }
})
```
parameter는 다음과같은 값을 반환합니다.

| 키 | 값 | 형식 |비고|
|---|:---|:----|---|
|**type**|이벤트 이름|`string`||
|**start**|드래그를 시작한 위치|`array`| `[x, y]` |
|**direction**|드래그를 하는 방향|`array`| `[x, y]` |
|**move**|이번 틱에 이동한 거리|`array`| `[x, y, total]` |
|**position**|현재 포인터의 위치|`array`| `[x, y]` |
|**prePosition**|이전 포인터의 위치|`array`| `[x, y]` |
|**distance**|시작점으로부터의 이동 거리|`array`| `[x, y, total]` |
|**distanceAll**|시작점으로부터의 현재까지 이동한 총 거리|`number`||


## 사용하기
- [데모페이지](https://bbggkkk.github.io/Element-Gesture/)
- [타입스크립트](https://github.com/bbggkkk/Element-Gesture/blob/master/src/elementGesture.ts)
- [자바스크립트](https://github.com/bbggkkk/Element-Gesture/blob/master/dist/elementGesture.js)