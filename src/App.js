import React from 'react';

import Header from './components/Header/Header';
import Calculator from './components/Calculator/Calculator';
import Graph2D from './components/Graph2D/Graph2D';
import Graph3D from './components/Graph3D/Graph3D';

import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showComponent: 'Graph3D' };
    }

    showComponent(name) {
        this.setState({ showComponent: name });
    }

    render() {
        return (
            <>
                <Header showComponent={(name) => this.showComponent(name)} />
                {this.state.showComponent === 'Calculator' ?
                    <Calculator /> :
                    this.state.showComponent === 'Graph2D' ?
                        <Graph2D /> :
                        this.state.showComponent === 'Graph3D' ?
                            <Graph3D /> : <></>
                }
            </>
        );
    }
}
