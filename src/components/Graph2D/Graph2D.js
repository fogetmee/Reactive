import React from "react";

import Graph from '../../modules/Graph/Graph';

import Graph2DUI from './Graph2DUI/Graph2DUI';

export default class Graph2D extends React.Component {
    constructor(props) {
        super(props);

        this.WIN = {
            left: -10,
            bottom: -10,
            width: 20,
            height: 20
        };
      
}
    
componentDidMount() {
    this.graph = new Graph({
        id: 'canvas2D',
        WIN: this.WIN,
        width: 700,
        height: 700,
        callbacks: {
            wheel: (event) => this.wheel(event),
            mouseup: () => this.mouseup(),
            mousedown: () => this.mousedown(),
            mousemove: (event) => this.mousemove(event),
            mouseleave: () => this.mouseleave()
        }
    });
}

mouseup() {
    this.canRotate = false;
}

mousedown() {
    this.canRotate = true;
}

mouseleave() {
    this.canRotate = false;
}

mousemove(event) {
    if (this.canRotate) {
        const { movementX, movementY } = event;
        this.scene.forEach(figure => {
            figure.points.forEach(point => {
                this.math3D.rotateOY(movementX / 180, point);
                this.math3D.rotateOX(movementY / 180, point);
            });
        });
    }
}
/*
printOXY() {
    for (let i = 0; i <= this.WIN.left + this.WIN.width; i++) {
        this.graph.line({ x1: i, y1: this.WIN.bottom, x2: i, y2: this.WIN.bottom + this.WIN.height, color: "#13bdd4" });
    }
    
    for (let i = 0; i >= this.WIN.left; i--) {
        this.graph.line({ x1: i, y1: this.WIN.bottom, x2: i, y2: this.WIN.bottom + this.WIN.height, color: "#13bdd4" });
    }

    for (let i = 0; i <= this.WIN.bottom + this.WIN.height; i++) {
        this.graph.line({ x1: this.WIN.left, y1: i, x2: this.WIN.left + this.WIN.width, y2: i, color: "#13bdd4" });
    }

    for (let i = 0; i >= this.WIN.bottom; i--) {
        this.graph.line({ x1: this.WIN.left, y1: i, x2: this.WIN.left + this.WIN.width, y2: i, color: "#13bdd4" });
    }

    this.graph.line({ x1: this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left, y2: 0});

    this.graph.line({ x1: 0, y1: this.WIN.bottom, x2: 0, y2: this.WIN.bottom + this.WIN.height});

    this.graph.line({ x1: this.WIN.width + this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left - 0.4, y2: 0.15, color: "#4cc9f0" });

    this.graph.line({ x1: this.WIN.width + this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left - 0.4, y2: -0.15, color: "#4cc9f0" });

    this.graph.line({ x1: 0, y1: this.WIN.height + this.WIN.bottom, x2: -0.15, y2: this.WIN.height + this.WIN.bottom - 0.4, color: "#4cc9f0"});

    this.graph.line({ x1: 0, y1: this.WIN.height + this.WIN.bottom, x2: 0.15, y2: this.WIN.height + this.WIN.bottom - 0.4, color: "#4cc9f0"});
}
*/


    render() {
        //this.printOXY();
        return (
            <div className="graph2D">
                <Graph2DUI
                    printDerivative={(value) => this.printDerivative(value)}
                />
                <center><canvas id='canvas2D'></canvas></center>
            </div>
        );
    }
}