import React from 'react'

export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.showComponent = props.showComponent;
    }

    render()
{
    return(<div className='header'>
        <button onClick={()=>this.showComponent(
            'Calculator')}>Calculator</button>
        <button onClick={()=>this.showComponent(
            'Graph2D')}>Graph2D</button>
        <button onClick={()=>this.showComponent(
            'Graph3D')}>Graph3D</button>
    </div>)
}
}
