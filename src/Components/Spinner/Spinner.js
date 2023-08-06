import { CircularProgress } from "@mui/joy"
export default function Spinner(props){
    const box = props.box;
    return (
        <div className='d-flex justify-content-center align-items-center' style={box?{}:{width: '100vw', height: "100vh"}}>
            <CircularProgress sx={{color: "#2E94B9"}}/>
        </div>
    )
}