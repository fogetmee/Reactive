import { useRef } from "react";

import /* Условно */ UniversalCalculator from '../Calculator';

const Calculator = () => {
    const calc = new UniversalCalculator();
    const refA = useRef(null);
    const refB = useRef(null);
    const refC = useRef(null);
    const operation = (operand) => {
        if (refA && refB && refC){
            const A = refA.current.value;
            const B = refB.current.value;
            refC.current.value = calc[operand]( calc.toValue(A), cacl.toValue(B));
        }
    }

    return(<div>
        <input ref = {refA} />
        <input ref = {refB} placeholder="B" />
        <input ref = {refC} />
        <button onClick={() => calc('add')}> T </button>
    </div>)
}