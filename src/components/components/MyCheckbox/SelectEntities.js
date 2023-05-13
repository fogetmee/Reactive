import React from "react";
import {   Cone,
    Cube,
    Sphere,
    cylinder,
    Ellipsoid,
    ellipticalCylinder,
    ellipticalParaboloid,
    hyperbolicCylinder,
    hyperbolicParaboloid,
    oneSheetedHyperboloid,
    parabolicCylinder,
    tor,
    twoSheetedHyperboloid } from '../../../modules/Math3D';
    
export default class SelectEntities extends React.Component {
    constructor(props) {
        super(props);
        this.callbacks = props.callbacks
        this.figures = {  //Занос новых фигур 
            Cube: new Cube(),
            Sphere: new Sphere(),
            Ellipsoid: new Ellipsoid(),
            Cone: new Cone(),
            cylinder: new cylinder(),
            ellipticalCylinder: new ellipticalCylinder(),
            ellipticalParaboloid: new ellipticalParaboloid(),
            hyperbolicCylinder: new hyperbolicCylinder(),
            hyperbolicParaboloid: new hyperbolicParaboloid(),
            oneSheetedHyperboloid: new oneSheetedHyperboloid(),
            parabolicCylinder: new parabolicCylinder(),
            tor: new tor(),
            twoSheetedHyperboloid: new twoSheetedHyperboloid()
        };
       // console.log(document.getElementById('selectentities'))
         this.addEventListeners()
    }


    addEventListeners() {
         //chekbox
        // console.log(1)
        const selector = document.getElementById('selectentities');
        selector.addEventListener('change', () => {
                //console.log(this.callbacks)
                //console.log('1000')
                this.callbacks.updateScene(this.figures[selector.value]);
            });
       
        //цвет
         document.getElementById('color').addEventListener(
                 'input',
                 (event) => {
                     const color = event.target.value;
                     this.callbacks.changeColor(color);
                });
        //сфера размер
        document.getElementById("buttonSphere").addEventListener("click", () => {
                    this.callbacks.updateScene(new Sphere(
                        document.getElementById("radiusSphere").value - 0,
                        document.getElementById("countSphere").value - 0
                    ));
                });
    } 
}