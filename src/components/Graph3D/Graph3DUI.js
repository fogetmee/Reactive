import React from "react";

export default Graph3DUI extends React

Component{
    constructor(props){
        super(props);
        this.showHidePoints = props.showHidePoints;
        this.showHideEdges = props.showHideEdges;
        this.showHidePolygons = props.showHidePolygons;
        this.state = {showPanel: false};
    }

    showHidePanel()
    {
        this.setState({showPanel: !this.state.showPanel});
    }

    render
}
