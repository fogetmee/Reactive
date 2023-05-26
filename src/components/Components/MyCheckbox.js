// import React from 'react';
//
// export default class MyCheckBox extends React.Component {
//     constructor(props) {
//         super(props);
//         const {text, checked, onClick} = props;
//         this.text = text;
//         this.checked = checked;
//         this.onClick = onClick;
//         this.id = `checkbox-${Math.round(Math.random() * 1000000)}`;
//
//     }
//
//     render() {
//         return (
//             <>
//             <input
//                 id={this.id}
//                 defaultChecked={this.checked}
//                 type = 'checkbox'
//                 onClick={(event) => this.onClick(event.target.checked)}
//                 />
//             <label htmlFor={this.id}>{this.text}</label>
//             </>
//         );
//     }
// }
const MyCheckBox = ({text,checked,onClick}) =>{
    const id = `checkbox-${Math.round(Math.random() * 1000000)}`;
    return(
        <>
            <input
                id = {id}
                defaultChecked = {checked}
                type = 'checkbox'
                onClick = {(event) => onClick(event.target.checked)}
        />
            <label htmlFor={id}>{text}</label>
        </>

    )

}
export default MyCheckBox;