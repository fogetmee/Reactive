import { useState, useCallback } from 'react';
import {
    Cone, 
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
    twoSheetedHyperboloid
} from '../../../modules/Math3D';

import MyCheckBox from "../../Components/MyCheckbox";

const Graph3DUI = ({ 
    show, 
    updateVarPoints, 
    updateVarPolygons, 
    updateVarEdges, 
    updateScene 
}) => {
    const [showPanel, setShowPanel] = useState(false);
    const figures = {  //Занос новых фигур 
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
    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel)
    },
        [setShowPanel, showPanel]
    );
    const selectFigure = useCallback((event) => {
        updateScene(figures[event.target.value])
    },
        [updateScene, figures]);
    return (
        <div>
            <button onClick={showHidePanel}>
                {showPanel ? '<-' : '->'}
            </button>
            {showPanel && (<div>
                    <MyCheckBox
                        text='Точки'
                        checked={show.pointCheck}
                        onClick={updateVarPoints}
                    />
                    <MyCheckBox
                        text='Ребра'
                        checked={show.edgCheck}
                        onClick={updateVarEdges}
                    />
                    <MyCheckBox
                        text='Полигоны'
                        checked={show.plgnCheck}
                        onClick={updateVarPolygons}
                    />
                </div>)
            }
            <div>
                <select onChange={selectFigure}>
                    {Object.keys(figures).map((key, index) => (
                        <option
                            key={index}
                            className="figur"
                            value={key}>{key}</option>

                    ))}
                </select>
            </div>
        </div>
    )
}
export default Graph3DUI;