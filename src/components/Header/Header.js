export default function Header({ showComponent }) {
    return (
        <div>
            <button onClick={() => showComponent('calc')}>Калькулятор</button>
            <button onClick={() => showComponent('Graph2D')}>Графика 2D</button>
            <button onClick={() => showComponent('Graph3D')}>Графика 3D</button>
        </div>
    );
}