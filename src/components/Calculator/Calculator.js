import { useRef } from 'react';

import useCalculator from './useCalculator';

import './Calculator.css';

const Calculator = () => {
    const refA = useRef(null);
    const refB = useRef(null);
    const refC = useRef(null);

    const calculator = useCalculator(refA, refB, refC);

    return (<>
        <input ref={refA} placeholder='A' />
        <input ref={refB} placeholder='B' />
        <input ref={refC} placeholder='C' />
        <button onClick={() => calculator('add')}>+</button>
        <button onClick={() => calculator('sub')}>-</button>
        <button onClick={() => calculator('mult')}>*</button>
        <button onClick={() => calculator('div')}>/</button>
    </>);
}
export default Calculator;