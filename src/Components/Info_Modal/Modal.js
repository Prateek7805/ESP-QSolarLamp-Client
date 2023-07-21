import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useContext } from 'react';
import { Info } from '../Context/Modal_Context';

export default function InfoModal() {
    const {mInfo, setMInfo} = useContext(Info);
    const hClose =()=>{
        setMInfo(prev=>{
            return {
                ...prev,
                open : false
            }
        })
    }
    return (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={mInfo.open}
          onClose={hClose}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
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
              {mInfo.title}
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              {mInfo.message}
            </Typography>
          </Sheet>
        </Modal>
    );
}
  