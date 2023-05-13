import React, { useState, useRef, useEffect } from 'react';
import Graph from '../../modules/Graph/Graph';
import FuncMath from './FuncMath';
import UIComponent from './UI/UIComponent';
import './styleCanvas.css';

const Graph2DComponent = () => {
const WIN = {
LEFT: -10,
BOTTOM: -10,
WIDTH: 20,
HEIGHT: 20,
};
const [derevativeX, setDerevativeX] = useState(0);
const [funcs, setFuncs] = useState([]);
const [canMove, setCanMove] = useState(false);
const [canvas, setCanvas] = useState(null);
const canvasRef = useRef(null);

useEffect(() => {
const callbacks = {
wheel: (event) => wheel(event),
mouseMove: (event) => mouseMove(event),
mouseUp: () => mouseUp(),
mouseDown: () => mouseDown(),
mouseLeave: () => mouseLeave(),
};
const graph = new Graph({
WIN,
id: 'canvas',
width: 600,
height: 600,
callbacks,
});
setCanvas(graph);

Копировать
const uiCallbacks = {
  delFunction: (num) => delFunction(num),
  addFunction: (f, num, width, color, sLine, eLine, printDerevative) =>
    addFunction(f, num, width, color, sLine, eLine, printDerevative),
};
const ui = new UIComponent({
  id: 'ui',
  parent: 'canvas',
  callbacks: uiCallbacks,
});
const funcMath = new FuncMath({ WIN, canvas: graph });

renderCanvas();
return () => graph.destroy();
}, []);

const addFunction = (f, num, width, color, sLine, eLine, printDerevative) => {
const n = num !== undefined ? num : funcs.length;
setFuncs([
...funcs,
{
f,
n,
width,
color,
sLine,
eLine,
printDerevative,
},
]);
setDerevativeX(undefined);
};

const delFunction = (num) => {
setFuncs(funcs.filter((f) => f.n !== num));
setDerevativeX(undefined);
};

const wheel = (event) => {
event.preventDefault();
const delta = event.deltaY > 0 ? 1.1 : 1 / 1.1;
canvas.zoomToPoint(delta, event.offsetX, event.offsetY);
renderCanvas(event);
};

const mouseLeave = () => {
setCanMove(false);
renderCanvas();
};

const mouseDown = () => {
setCanMove(true);
};

const mouseUp = () => {
setCanMove(false);
};

const mouseMove = (event) => {
if (canMove) {
canvas.move(event.movementX, event.movementY);
renderCanvas();
}
};

const printFunction = (f, color, width) => {
const toCanvasX = (x) => canvas.toCanvasX(x);
const toCanvasY = (y) => canvas.toCanvasY(y);
canvas.printFunction(f, { color, width, toCanvasX, toCanvasY });
};

const printXY = () => {
canvas.printAxis({ color: '#aaa', width: 1 });
canvas.printAxisX({
color: '#000',
width: 1,
fontSize: 14,
left: WIN.LEFT,
bottom: WIN.BOTTOM,
step: 1,
});
canvas.printAxisY({
color: '#000',
width: 1,
fontSize: 14,
left: WIN.LEFT,
bottom: WIN.BOTTOM,
step: 1,
});
};

const printDerivative = (f, color, width) => {
const df = (x) => funcMath.derivative(f, x);
addFunction(df, undefined, width, color, false, false, false);
};

const renderCanvas = (event = null) => {
canvas.clear();
printXY();
if (event) {
printRect(event);
}

Копировать
funcs.forEach((f) => {
  if (f) {
    printFunction(f.f, f.color, f.width);
  }
  if (f && f.printDerevative) {
    printDerivative(f.f, f.color, f.width);
  }
});
};

const printRect = (event) => {
const x = canvas.toGraphX(event.offsetX);
const y = canvas.toGraphY(event.offsetY);
const rectWidth = WIN.WIDTH / 10;
const rectHeight = WIN.HEIGHT / 10;
const xLeft = Math.floor((x - WIN.WIDTH / 2) / rectWidth) * rectWidth;
const yBottom = Math.floor((y - WIN.HEIGHT / 2) / rectHeight) * rectHeight;
const xRight = xLeft + rectWidth;
const yTop = yBottom + rectHeight;
canvas.printLine(xLeft, yBottom, xRight, yBottom, { color: '#f00', width: 1 });
canvas.printLine(xRight, yBottom, xRight, yTop, { color: '#f00', width: 1 });
canvas.printLine(xRight, yTop, xLeft, yTop, { color: '#f00', width: 1 });
canvas.printLine(xLeft, yTop, xLeft, yBottom, { color: '#f00', width: 1 });
};

const handleClick = () => {
ui.addFunction();
};

return (


<canvas ref="{canvasRef}" id="canvas"></canvas>


Add function



);
};
export default Graph2DComponent;