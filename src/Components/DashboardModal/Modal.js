import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import { useContext } from 'react';
import { MDashboard } from '../Context/Modal_Context';
import { useNavigate } from 'react-router-dom';

export default function DashboardModal() {
    const navigate = useNavigate();
    const {mDashboard, setMDashboard} = useContext(MDashboard);
    const hClose =()=>{
        if(mDashboard.navigate !== ''){
            navigate(mDashboard.navigate);
        }
        setMDashboard(prev=>{
            return {
                ...prev,
                open : false,
                navigate: ''
            }
        })
    }
    return (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc" 
          open={mDashboard.open} 
          onClose={hClose} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <ModalDialog
            variant="outlined"
            color={mDashboard.error? "danger" : "success"}
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
              }}
            />
            <Typography
              component="h2"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {mDashboard.title}
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              {mDashboard.message}
            </Typography>
          </ModalDialog>
        </Modal>
    );
}
  