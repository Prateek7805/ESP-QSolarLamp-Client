import { CircularProgress } from '@mui/joy';
import './ColorPicker.css';
export default function ColorPicker(props){
    const {onChange, value, loading} = props;
    return (
        <div className="color-wrap">
            <input type="color" className="input-color" value={value} onChange={onChange}/>
            {
                loading? (
                    <CircularProgress size="sm" sx={{ml:1, color:"#2E94B9"}}/>
                ):(<></>)
            }
        </div>
    )
}