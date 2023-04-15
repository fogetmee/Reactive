import React from "react";

import Graph from "";

import Math3D, {Point,Light,Cube,Polygon} from "";

import './Graph3D.scss'

export default class Graph3D extends React.Component{
    constructor(props){
        super(props);
            this.showPoints = false;
            this.showEdges = false;
            this.showPolygons = true;

    }

    componentDidMount(){
        this.graph = new Graph();
        const animLoop = () => {
            this.request = window.requestAnimationFrame(animLoop);
            this.interval = serInterval();
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        window.cancelAnimationFrame(this.request);
        this.graph = null;
    }

    showHidePoints(){
        this.showPoints = Value;
    }

    showHideEdges(){
        this.showEdges = Value;
    }

    showHidePolygons(){
        this.showPolygons = Value;
    }

    render(){
        return(<div className="graph3D">
            <Graph3DUI
            showHidePoints = {(Value) => 
                this.showHidePoints(Value)}
            showHideEdges = {(Value) => 
                this.showHideEdges(Value)}
            showHidePolygons = {(Value) => 
                this.showHidePolygons(Value)}
            ></Graph3DUI>

        <canvas id ='canvas3D'></canvas>
        </div>)
    }
}