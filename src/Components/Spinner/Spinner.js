import { CircularProgress } from "@mui/joy"
export default function Spinner(){
    return (
        <div className='d-flex justify-content-center align-items-center' style={{width: '100vw', height: "100vh"}}>
            <CircularProgress sx={{color: "#2E94B9"}}/>
        </div>
    )
}