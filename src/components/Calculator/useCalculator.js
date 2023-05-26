import Calculator from "../../modules/Calculator";

const useCalculator = (refA, refB, refC) => {
    const calc = new Calculator;

    return (operand) => {
        if (refA && refB && refC) {
            const A = refA.current.value;
            const B = refB.current.value;
            refC.current.value = calc[operand](
                calc.getEntity(A), 
                calc.getEntity(B)
            ).toString();
        }
    }
}

export default useCalculator;