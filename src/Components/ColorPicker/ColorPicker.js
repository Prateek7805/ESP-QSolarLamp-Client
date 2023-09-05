import './ColorPicker.css';
export default function ColorPicker(props){
    const {onChange, value} = props;
    return (
        <div className="color-wrap">
            <input type="color" className="input-color" value={value} onChange={onChange}/>
        </div>
    )
}