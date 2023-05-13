import React, { useState } from 'react';
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
    twoSheetedHyperboloid,
} 
from '../../../modules/Math3D';

const SelectEntities = ({ callbacks }) => {
    const { updateScene, changeColor } = callbacks;
    const [figures] = useState({
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
        twoSheetedHyperboloid: new twoSheetedHyperboloid(),
});

return (
    <select id="selectУntities" onchange="{changeEntity}">
        <option value="Cube">Куб</option>
        <option value="Sphere">Сфера</option>
        <option value="Ellipsoid">Эллипсоид</option>
        <option value="Cone">Конус</option>
        <option value="cylinder">Цилиндр</option>
        <option value="ellipticalCylinder">Эллиптический цилиндр</option>
        <option value="ellipticalParaboloid">Эллиптический параболоид</option>
        <option value="hyperbolicCylinder">Гиперболический цилиндр</option>
        <option value="hyperbolicParaboloid">Гиперболический параболоид</option>
        <option value="oneSheetedHyperboloid">Однополостный гиперболоид</option>
        <option value="parabolicCylinder">Параболический цилиндр</option>
        <option value="tor">Тор</option>
        <option value="twoSheetedHyperboloid">Двуполостный гиперболоид</option>
    </select>
);
};
export default SelectEntities;

/*
const changeEntity = (entity) => {
updateScene(figures[entity.target.value]);
};

const changeEntityColor = (event) => {
const color = event.target.value;
changeColor(color);
};

const addSphere = () => {
const radius = document.getElementById('radiusSphere').value - 0;
const countStacks = document.getElementById('countStacks').value - 0;
const countSlices = document.getElementById('countSlices').value - 0;
updateScene(new Sphere(radius, countStacks, countSlices));
};

const addCone = () => {
const height = document.getElementById('heightCone').value - 0;
const radius = document.getElementById('radiusCone').value - 0;
const countSlices = document.getElementById('countSlicesCone').value - 0;
updateScene(new Cone(height, radius, countSlices));
};
*/