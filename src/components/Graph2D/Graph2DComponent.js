import React from 'react';
import Graph from '../../modules/Graph/Graph';
import FuncMath from './FuncMath';
import UIComponent from './UI/UIComponent';

import './styleCanvas.css';

class Graph2DComponent extends React.Component {
  constructor(props) {
    super(props);

    this.WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    };

    this.derevativeX = 0;
    this.funcs = [];
    this.canMove = false;
    this.canvas = null;
  }

  componentDidMount() {
    this.canvas = new Graph({
      WIN: this.WIN,
      id: 'canvas',
      width: 600,
      height: 600,
      callbacks: {
        wheel: (event) => this.wheel(event),
        mouseMove: (event) => this.mouseMove(event),
        mouseUp: () => this.mouseUp(),
        mouseDown: () => this.mouseDown(),
        mouseLeave: () => this.mouseLeave(),
      },
    });
    this.ui = new UIComponent({
      id: 'ui',
      parent: this.id,
      callbacks: {
        delFunction: (num) => this.delFunction(num),
        addFunction: (f, num, width, color, sLine, eLine, printDerevative) =>
          this.addFunction(f, num, width, color, sLine, eLine, printDerevative),
      },
    });

    this.funcMath = new FuncMath({ WIN: this.WIN, canvas: this.canvas });

    this.renderCanvas();
  }

  render() {
    return (
      <div className="flex">
        <div className="canvas">
          <canvas id="canvas"></canvas>
        </div>
        <button id="addFunction" onClick={() => this.ui.addFunction()}>
          Add function
        </button>
        <div id="funcsInputs"></div>
      </div>
    );
  }

  renderCanvas(event = null) {
    this.canvas.clear();
    this.printXY();
    if (event) {
      this.printRect(event);
    }
    //this.printNums();
    //Function
    this.funcs.forEach((f) => {
      if (f) {
        this.printFunction(f.f, f.color, f.width);
      }
    });

    //Derivative
    this.funcs.forEach((f) => {
      if (f && f.printDerevative) {
        this.funcMath.printTangent(f.f, this.derevativeX);
      }
    });

    //Integral
    this.funcs.forEach((f) => {
      if (f) {
        this.printIntegral(f.f, f.sLine - 0, f.eLine - 0);
      }
    });
    return null;
  }

  addFunction(f, num, width = 9, color = 'red', sLine, eLine, printDerevative) {
    this.funcs[num] = { f, color, width, sLine, eLine, printDerevative };
    this.renderCanvas();
  }

  delFunction(num) {
    this.funcs[num] = null;
    this.renderCanvas();
  }

  mouseMove(event) {
    if (this.canMove) {
      this.WIN.LEFT -= this.canvas.sx(event.movementX);
      this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
    }
    this.derevativeX = this.WIN.LEFT + this.canvas.sx(event.offsetX);
    this.renderCanvas(event);
  }
  mouseLeave() {
    this.canMove = false;
  }
  mouseUp() {
    this.canMove = false;
  }
  mouseDown() {
    this.canMove = true;
  }
  wheel(event) {
    event.preventDefault();
    let delta = event.deltaY > 0 ? -0.3 : +0.3;
    if (this.WIN.BOTTOM + delta < -6) {
      this.WIN.WIDTH -= delta;
      this.WIN.HEIGHT -= delta;
      this.WIN.LEFT += delta / 2;
      this.WIN.BOTTOM += delta / 2;
    }
    this.renderCanvas();
  }

  printFunction(f, color, width) {
    let x = this.WIN.LEFT;
    let dx = this.WIN.WIDTH / 1000;
    while (x < this.WIN.LEFT + this.WIN.WIDTH) {
      this.canvas.line(x, f(x), x + dx, f(x + dx), color, width);
      x += dx;
    }
  }

  printIntegral(f, a, b, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    const points = [];
    points.push({ x, y: 0 });
    while (x < b) {
      points.push({ x, y: f(x) });
      x += dx;
    }
    points.push({ x: b, y: 0 });
    this.canvas.polygon(points, 'rgba(154, 205, 50, 0.7)');
  }

  printXY() {
    const { LEFT, BOTTOM, WIDTH, HEIGHT } = this.WIN;

    //Стрелки
    this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, 0.15, 'black', 2);
    this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, -0.15, 'black', 2);
    this.canvas.line(0, HEIGHT + BOTTOM, -0.15, HEIGHT + BOTTOM - 0.4, 'black', 2);
    this.canvas.line(0, HEIGHT + BOTTOM, 0.15, HEIGHT + BOTTOM - 0.4, 'black', 2);
    //Клетки
    for (let i = 0; i > LEFT; i--) {
      this.canvas.line(i, BOTTOM + LEFT, i, HEIGHT + BOTTOM, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT + LEFT - BOTTOM + WIDTH; i++) {
      this.canvas.line(i, BOTTOM, i, 0, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT + LEFT + BOTTOM + WIDTH; i++) {
      this.canvas.line(i, 0, i, HEIGHT + BOTTOM, '#BEBEBE', 1);
      this.canvas.line(LEFT, i, HEIGHT + LEFT, i, '#BEBEBE', 1);
    }
    for (let i = 0; i > BOTTOM; i--) {
      this.canvas.line(LEFT + BOTTOM, i, WIDTH + LEFT, i, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT - LEFT + BOTTOM + WIDTH; i++) {
      this.canvas.line(LEFT, i, 0, i, '#BEBEBE', 1);
    }
    //Оси
    this.canvas.line(0, BOTTOM, 0, HEIGHT + BOTTOM, 'black', 3);
    this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, 'black', 3);
  }
/*
  printNums = (streakLength = this.WIN.HEIGHT / (this.WIN.WIDTH + 30)) => {
    const len = streakLength / 2;
    const shiftY = -this.WIN.HEIGHT / 200 - 0.4;
    const shiftX = this.WIN.WIDTH / 200;
    for (let i = Math.round(this.WIN.LEFT); i < this.WIN.LEFT + this.WIN.WIDTH; i++) {
      this.canvas.line(i, len, i, -len, 'black', 2.5);
      this.canvas.text(i, i + shiftX, shiftY);
      // y на оси
      this.canvas.text('y', 0 + 0.4, this.WIN.BOTTOM + this.WIN.HEIGHT - 0.5, 'black');
    }
    for (let i = Math.round(this.WIN.BOTTOM); i < this.WIN.BOTTOM + this.WIN.HEIGHT; i++) {
      this.canvas.line(len, i, -len, i, 'black', 2.5);
      this.canvas.text(i, shiftX, i + shiftY);
      // x на оси
      this.canvas.text('x', this.WIN.LEFT + this.WIN.WIDTH - 0.4, 0 + 0.3, 'black');
    }
  };
*/
  printRect(event) {
    const x = Math.floor(this.canvas.x(event.offsetX));
    const y = Math.ceil(this.canvas.y(event.offsetY));
    this.canvas.drawRect(x, y, 1, 1, '#1be');

    const shiftY = this.WIN.HEIGHT * 0.01;
    const shiftX = this.WIN.WIDTH * 0.01 + 0.02;

    const nums = [
      { x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
      { x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
      { x: 1, y: 0, shiftX: 0, shiftY: shiftY },
      { x: 1, y: -1, shiftX: 0, shiftY: -shiftY },
    ];
    nums.forEach((coord) => {
      this.canvas.text(
        `(${coord.x + x}; ${coord.y + y})`,
        x + coord.x + coord.shiftX,
        y + coord.y + coord.shiftY,
        'black'
      );
    });
  }
}

export default Graph2DComponent;

/*
import React from 'react';
import Graph from '../../modules/Graph/Graph';
import FuncMath from './FuncMath';
import UIComponent from './UI/UIComponent';

import './styleCanvas.css';

const Graph2DComponent = (funcs) => {


    const WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    };

    derevativeX = 0;
    funcs = [];
    canMove = false;
    canvas = null;

    const componentDidMount = () => {
      const canvasRef = useRef(null);
      const uiRef = useRef(null);
      const [canvas, setCanvas] = useState(null);
      const [ui, setUI] = useState(null);
    
      useEffect(() => {
        const newCanvas = new Graph({
          WIN: WIN,
          id: 'canvas',
          width: 600,
          height: 600,
          callbacks: {
            wheel: (event) => wheel(event),
            mouseMove: (event) => mouseMove(event),
            mouseUp: () => mouseUp(),
            mouseDown: () => mouseDown(),
            mouseLeave: () => mouseLeave(),
          },
        });
        const newUI = new UIComponent({
          id: 'ui',
          parent: this.id,
          callbacks: {
            delFunction: (num) => delFunction(num),
            addFunction: (f, num, width, color, sLine, eLine, printDerevative) =>
              addFunction(f, num, width, color, sLine, eLine, printDerevative),
          },
        });
        const newFuncMath = new FuncMath({ WIN: WIN, canvas: newCanvas });
        setCanvas(newCanvas);
        setUI(newUI);
      }, []);
}

  function renderCanvas(event = null) {
    canvas.clear();
    printXY();
    if (event) {
      printRect(event);
    }
    funcs.forEach((f) => {
      if (f) {
        printFunction(f.f, f.color, f.width);
      }
    });

    funcs.forEach((f) => {
      if (f && f.printDerevative) {
        funcMath.printTangent(f.f, derevativeX);
      }
    });

    //Integral
    funcs.forEach((f) => {
      if (f) {
        printIntegral(f.f, f.sLine - 0, f.eLine - 0);
      }
    });
    return null;
  }

  function addFunction(f, num, width = 9, color = 'red', sLine, eLine, printDerevative) {
    funcs[num] = { f, color, width, sLine, eLine, printDerevative };
    renderCanvas();
  }

  function delFunction(num) {
    funcs[num] = null;
    renderCanvas();
  }

  function mouseMove(event) {
    if (this.canMove) {
      WIN.LEFT -= canvas.sx(event.movementX);
      WIN.BOTTOM -= canvas.sy(event.movementY);
    }
    derevativeX = WIN.LEFT + canvas.sx(event.offsetX);
    renderCanvas(event);
  }

  function mouseLeave() {
    canMove = false;
  }

  function mouseUp() {
    canMove = false;
  }

  function mouseDown() {
    canMove = true;
  }

  function wheel(event) {
    event.preventDefault();
    let delta = event.deltaY > 0 ? -0.3 : +0.3;
    if (WIN.BOTTOM + delta < -6) {
      WIN.WIDTH -= delta;
      WIN.HEIGHT -= delta;
      WIN.LEFT += delta / 2;
      WIN.BOTTOM += delta / 2;
    }
    renderCanvas();
  }

  function printFunction(f, color, width) {
    let x = WIN.LEFT;
    let dx = WIN.WIDTH / 1000;
    while (x < WIN.LEFT + WIN.WIDTH) {
      canvas.line(x, f(x), x + dx, f(x + dx), color, width);
      x += dx;
    }
  }

  function printIntegral(f, a, b, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    const points = [];
    points.push({ x, y: 0 });
    while (x < b) {
      points.push({ x, y: f(x) });
      x += dx;
    }
    points.push({ x: b, y: 0 });
    canvas.polygon(points, 'rgba(154, 205, 50, 0.7)');
  }

  function printXY() {
    const { LEFT, BOTTOM, WIDTH, HEIGHT } = WIN;

    //Стрелки
    canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, 0.15, 'black', 2);
    canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, -0.15, 'black', 2);
    canvas.line(0, HEIGHT + BOTTOM, -0.15, HEIGHT + BOTTOM - 0.4, 'black', 2);
    canvas.line(0, HEIGHT + BOTTOM, 0.15, HEIGHT + BOTTOM - 0.4, 'black', 2);

    //Клетки
    for (let i = 0; i > LEFT; i--) {
      canvas.line(i, BOTTOM + LEFT, i, HEIGHT + BOTTOM, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT + LEFT - BOTTOM + WIDTH; i++) {
      canvas.line(i, BOTTOM, i, 0, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT + LEFT + BOTTOM + WIDTH; i++) {
      canvas.line(i, 0, i, HEIGHT + BOTTOM, '#BEBEBE', 1);
      canvas.line(LEFT, i, HEIGHT + LEFT, i, '#BEBEBE', 1);
    }
    for (let i = 0; i > BOTTOM; i--) {
      canvas.line(LEFT + BOTTOM, i, WIDTH + LEFT, i, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT - LEFT + BOTTOM + WIDTH; i++) {
      canvas.line(LEFT, i, 0, i, '#BEBEBE', 1);
    }
    //Оси
    canvas.line(0, BOTTOM, 0, HEIGHT + BOTTOM, 'black', 3);
    canvas.line(LEFT, 0, WIDTH + LEFT, 0, 'black', 3);
  }

  function printNums (streakLength = WIN.HEIGHT / (WIN.WIDTH + 30)){
    const len = streakLength / 2;
    const shiftY = -WIN.HEIGHT / 200 - 0.4;
    const shiftX = WIN.WIDTH / 200;
    for (let i = Math.round(WIN.LEFT); i < WIN.LEFT + WIN.WIDTH; i++) {
      canvas.line(i, len, i, -len, 'black', 2.5);
      canvas.text(i, i + shiftX, shiftY);
      // y на оси
      canvas.text('y', 0 + 0.4, WIN.BOTTOM + WIN.HEIGHT - 0.5, 'black');
    }
    for (let i = Math.round(WIN.BOTTOM); i < WIN.BOTTOM +WIN.HEIGHT; i++) {
      canvas.line(len, i, -len, i, 'black', 2.5);
      canvas.text(i, shiftX, i + shiftY);
      // x на оси
      canvas.text('x', WIN.LEFT + WIN.WIDTH - 0.4, 0 + 0.3, 'black');
    }
  };

  function printRect(event) {
    const x = Math.floor(canvas.x(event.offsetX));
    const y = Math.ceil(canvas.y(event.offsetY));
    canvas.drawRect(x, y, 1, 1, '#1be');

    const shiftY = WIN.HEIGHT * 0.01;
    const shiftX = WIN.WIDTH * 0.01 + 0.02;

    const nums = [
      { x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
      { x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
      { x: 1, y: 0, shiftX: 0, shiftY: shiftY },
      { x: 1, y: -1, shiftX: 0, shiftY: -shiftY },
    ];
    nums.forEach((coord) => {
      canvas.text(
        `(${coord.x + x}; ${coord.y + y})`,
        x + coord.x + coord.shiftX,
        y + coord.y + coord.shiftY,
        'black'
      );
    });
  }

  return (
    <div className="flex">
      <div className="canvas">
        <canvas id="canvas"></canvas>
      </div>
      <button id="addFunction" onClick={() => this.ui.addFunction()}>
        Add function
      </button>
      <div id="funcsInputs"></div>
    </div>
  );
}

export default Graph2DComponent;
*/