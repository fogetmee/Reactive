import React from 'react';

import Graph from '../../modules/Graph/Graph';
import Math3D, { Point, Light, Cube } from '../../modules/Math3D';

import Graph3DUI from './Graph3DUI/Graph3DUI';

export default class Graph3D extends React.Component {
    constructor(props) {
        super(props);

        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            FOCUS: new Point(0, 0, 30),
            CAMERA: new Point(0, 0, 50)
        };
        this.math3D = new Math3D({ WIN: this.WIN });
        this.scene = [new Cube()];
        this.LIGHT = new Light(-25, 10, 10);

        this.showPoints = false;
        this.showEdges = false;
        this.showPolygons = true;
        this.canRotate = false;
    }

    componentDidMount() {
        this.graph = new Graph({
            id: 'canvas3D',
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

        //FPS
        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now();
        const animLoop = () => {
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            this.renderScene();
            this.request = window.requestAnimationFrame(animLoop);
        }

        animLoop();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.request);
        this.graph = null;
    }

    wheel(event) {
        const delta = 1 + event.wheelDelta / 1200;
        this.scene.forEach(figure => {
            figure.points.forEach(point => {
                this.math3D.zoom(delta, point);
            });
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

    updateScene(newFigure) {
        this.scene = [newFigure];
    }

    changeColor(color) {
        this.scene[0].polygons.forEach(poly => {
            poly.color = poly.hexToRgb(color);
        });
    }

    renderScene() {

        this.graph.clear();

        if (this.showPolygons) {
            const polygons = [];
            this.scene.forEach((figure, index) => {
                this.math3D.calcCenters(figure);
                this.math3D.calcRadius(figure);
                this.math3D.calcDitance(figure, this.WIN.CAMERA, 'distance');
                this.math3D.calcDitance(figure, this.LIGHT, 'lumen');
                figure.polygons.forEach(polygon => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            this.math3D.sortByArtistAlgoritm(polygons);
            polygons.forEach(polygon => {
                const figure = this.scene[polygon.figureIndex];
                const points = [
                    figure.points[polygon.points[0]],
                    figure.points[polygon.points[1]],
                    figure.points[polygon.points[2]],
                    figure.points[polygon.points[3]]
                ];
                let { r, g, b } = polygon.color;
                const { isShadow, dark } = this.math3D.calcShadow(polygon, this.scene, this.LIGHT);
                const lumen = this.math3D.caclIllumination(polygon.lumen, this.LIGHT.lumen * +(isShadow ? dark : 1));
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph.polygon(
                    points.map(point => {
                        return {
                            x: this.math3D.xs(point),
                            y: this.math3D.ys(point)
                        }
                    }), polygon.rgbToHex(r, g, b)
                );
            });
        }

        this.scene.forEach(figure => {
            //edges 
            if (this.showEdges) {
                figure.edges.forEach(({ p1, p2 }) => {
                    const point1 = figure.points[p1];
                    const point2 = figure.points[p2];
                    this.graph.line(
                        this.math3D.xs(point1),
                        this.math3D.ys(point1),
                        this.math3D.xs(point2),
                        this.math3D.ys(point2)
                    );
                });
            }
            //point
            if (this.showPoints) {
                figure.points.forEach(point => {
                    this.graph.point(
                        this.math3D.xs(point),
                        this.math3D.ys(point)
                    );
                });
            }
        });
    }

    showHidePoints(value) {
        this.showPoints = value;
    }

    showHideEdges(value) {
        this.showEdges = value;
    }
    
    showHidePolygons(value) {
        this.showPolygons = value;
    }

    render() {
        return (
            <div className='graph3D'>
                <Graph3DUI
                    showHidePoints={(value) => this.showHidePoints(value)}
                    showHideEdges={(value) => this.showHideEdges(value)}
                    showHidePolygons={(value) => this.showHidePolygons(value)}
                    
                />
                <center><canvas id='canvas3D'></canvas></center>
            </div>
        );
    }
}
