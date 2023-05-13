import { useState, useCallback } from "react";

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

import MyCheckbox from "../../components/MyCheckbox/MyCheckbox";

export default function Graph3DUI({
    showHidePoints,
    showHideEdges,
    showHidePolygons,
    show,
    updateScene,
}) {
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

    const showHidePanel = useCallback(
        () => setShowPanel(!showPanel),
        [showPanel, setShowPanel]
    );

    const selectFigure = useCallback((event) => {
        updateScene(figures[event.target.value])
    }, [figures, updateScene])

    return (
        <div>
            <button onClick={showHidePanel}>{showPanel ? '<-' : '->'}</button>
            {showPanel && (
                <>
                    <MyCheckbox
                        text={'Точки'}
                        checked={show.showPoints}
                        onClick={(checked) => showHidePoints(checked)}
                    />
                    <MyCheckbox
                        text={'Грани'}
                        checked={show.showEdges}
                        onClick={(checked) => showHideEdges(checked)}
                    />
                    <MyCheckbox
                        text={'Полигоны'}
                        checked={show.showPolygons}
                        onClick={(checked) => showHidePolygons(checked)}
                    />
                    <div>
                        <select onChange={selectFigure}>
                            {Object.keys(figures).map((key, index) => (
                                <option 
                                    key={index}
                                    className="figur" 
                                    value={key}
                                >{key}</option>
                            ))}
                        </select>
                        <input type="color" id="color" placeholder="color" className="color"></input>
                        <div id='Sphere' className='paramsFigures hidden'>
                            <input type='text' id='radiusSphere' placeholder='Radius: 10'></input>
                            <input type='text' id='countSphere' placeholder='Count: 50'></input>
                            <button id='buttonSphere'>Отрисовать</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}