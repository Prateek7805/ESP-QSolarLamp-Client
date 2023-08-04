import { CircularProgress } from '@mui/joy'
import './BrightnessSlider.css'
import Slider from '@mui/material/Slider';

export default function BrightnessSlider({defaultValue,onChange, loading, value }){
    return (
        <div className="sl-br-wrap">
            <Slider 
                defaultValue={defaultValue} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                sx={{ width: '80%', color: "#2E94B9" }} 
                value={value}
                onChange={onChange}
            />
            {
                loading? (
                    <CircularProgress size="sm" sx={{ml:1,color: "#2E94B9"}}/>
                ):(<></>)
            }
        </div>
    )
}