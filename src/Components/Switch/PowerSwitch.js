import './PowerSwitch.css'
import { CircularProgress } from '@mui/joy'

export default function PowerSwitch({loading, checked, onChange}) {
    return (
        <div className='sw-p-wrapper'>
            <label className={`switch ${loading? "loading":""}`}>
                <input type="checkbox" disabled={loading} checked={checked} onChange={onChange}/>
                <span className="check"></span>
            </label>
            {loading? 
                (<CircularProgress color="primary" size="sm" sx={{ml: 1}}/>)
                :
                (<></>)
            }
            
        </div>
    )
}