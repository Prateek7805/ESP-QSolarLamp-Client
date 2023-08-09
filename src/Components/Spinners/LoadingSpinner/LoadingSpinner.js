import ValueSpinner from "../ValueSpinner/ValueSpinner";
export default function LoadingSpinner(props){
    const {nowrap, color, size} = props;
    return (
        <div className='d-flex justify-content-center align-items-center' style={nowrap?{}:{width: '100vw', height: "100vh"}}>
            <ValueSpinner color={color} size={size}/>
        </div>
    )
}