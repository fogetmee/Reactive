import { useRef } from 'react';
//import { Calculator, PolynomialCalculator } from '../Calculator';

import './styleCalc.css';

export default function CalculatorComponent() {
  const refA = useRef(null);
  const refB = useRef(null);
  const refC = useRef(null);

  const onClickPlus = () => {
    if (refA && refB && refC) {
      const A = refA.current.value - 0;
      const B = refB.current.value - 0;
      refC.current.value = A + B;
    }
  }

  const onClickMult = () => {
    if (refA && refB && refC) {
      const A = refA.current.value - 0;
      const B = refB.current.value - 0;
      refC.current.value = A * B;
    }
  }

  const onClickDel = () => {
    if (refA && refB && refC) {
      const A = refA.current.value - 0;
      const B = refB.current.value - 0;
      refC.current.value = A / B;
    }
  }

  const onClickPow = () => {
    if (refA && refB && refC) {
      const A = refA.current.value - 0;
      const B = refB.current.value - 0;
      refC.current.value = 3;
    }
  }

  return (
  <div className='CalcBody'>
    <div className='InputNumbers'>
    <input ref={refA} placeholder='A' />
    <input ref={refB} placeholder='B' />
    <output ref={refC} placeholder='C' />
    </div>
    <div className='ButtonsCalculator'>
    <button onClick={onClickPlus}>+</button>
    <button onClick={onClickMult}>*</button>
    <button onClick={onClickDel}>/</button>
    <button onClick={onClickPow}>^</button>
    <button onClick={onClickPlus}>Compl * a</button>
    </div>
  </div>
  );
}
