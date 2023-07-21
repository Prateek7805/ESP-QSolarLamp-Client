import './Dashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';

export default function Dashboard(){
    return (
        <div className="ds-main-container co">
            <div className='ds-appbar co2'>
                <Sidebar />
            </div>
        </div>
    )
}