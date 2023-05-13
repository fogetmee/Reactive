export default function MyCheckbox({ text, checked, onClick }) {
    const id = `checkbox-${Math.round(Math.random() * 1000000)}`;

    return (
        <>
            <input
                id={id}
                defaultChecked={checked}
                type="checkbox"
                onClick={(event) => onClick(event.target.checked)}
            />
            <label htmlFor={id}>{text}</label>
        </>
    );
}