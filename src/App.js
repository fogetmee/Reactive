import { useState } from 'react';

import Header from './components/Header/Header';
import CalculatorComponent from './components/Calculator/CalculatorComponent';
import Graph2DComponent from './components/Graph2D/Graph2DComponent';
import Graph3D from './components/Graph3D/Graph3D';

import './App.css';

export default function App() {
    const [showComponent, setShowComponent] = useState('Graph3D');

    return (
        <>
            <Header showComponent={setShowComponent} />
            {showComponent === 'calc' ?
                <CalculatorComponent /> :
                showComponent === 'Graph2D' ?
                    <Graph2DComponent /> :
                    showComponent === 'Graph3D' ?
                        <Graph3D /> : <></>
            }
        </>
    );
}
