import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showComponent = props.showComponent;
    }

    render() {
        return (
            <div>
                <button onClick={() => this.showComponent('Calculator')}>Калькулятор</button>
                <button onClick={() => this.showComponent('Graph2D')}>Графика 2D</button>
                <button onClick={() => this.showComponent('Graph3D')}>Графика 3D</button>
            </div>
        );
    }
}