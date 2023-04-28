import React from "react";

import MyCheckbox from "../../components/MyCheckbox/MyCheckbox";

export default class Graph2DUI extends React.Component {
    constructor(props) {
        super(props);
        this.showHidePoints = props.showHidePoints;
        this.state = { showPanel: false };
    }

    showHidePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    render() {
        return (
            <div>
                <button onClick={() => this.showHidePanel()}>{this.state.showPanel ? '<-' : '->'}</button>
                {this.state.showPanel && (
                    <>
                        <MyCheckbox
                            text={'Показывать нули функции'}
                            checked={false}
                            onClick={(checked) => this.showHidePoints(checked)}
                        />
                        <MyCheckbox
                            text={'Показывать производную'}
                            checked={false}
                            onClick={(checked) => this.showHideEdges(checked)}
                        />
                        <input className="GraphName" placeholder="Функция"></input>
                    </>
                )}
            </div>
        );
    }
}