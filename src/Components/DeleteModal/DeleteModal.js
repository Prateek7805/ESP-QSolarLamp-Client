import { useContext, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import { MDashboard, MDelete } from '../Context/Modal_Context';
import deviceAPI from '../../Assets/API/Device';
import { DeviceList } from '../Context/Dashboard_Context';

export default function DeleteModal() {
    const { mDelete, setMDelete } = useContext(MDelete);
    const { setDevices } = useContext(DeviceList);
    const {setMDashboard} = useContext(MDashboard);
    
    const [loading, setLoading] = useState(false);
    const setError = (message, navigate) => {
        setMDashboard(prev => {
            return {
                ...prev,
                open: true,
                error: true,
                title: "Error",
                message: message,
                navigate: navigate || ''
            }
        });
    };

    const hClose = () => {
        setMDelete(prev => {
            return {
                ...prev,
                open: false
            }
        })
    };

    const hSubmit = async () => {
        try {
            setLoading(true);
            const response = await deviceAPI.unregister(mDelete.name);
            if (response.error) {
                setError(`Error in deleting ${mDelete.name}`, "/");
                return;
            }
            setDevices(prev => {
                const index = prev.findIndex(item => { return item.name === mDelete.name });
                if (index === -1) {
                    return [...prev];
                }
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
            });
            setLoading(false);
            hClose();
        } catch (error) {
            setLoading(false);
            hClose();
            setError(`Error in deleting ${mDelete.name}`);
        }
    };

    return (
        <Modal open={mDelete.open} onClose={hClose}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
            >
                <Typography
                    id="alert-dialog-modal-title"
                    level="h2"
                    startDecorator={<WarningRoundedIcon />}
                >
                    Confirmation
                </Typography>
                <Divider />
                <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                    Are you sure you want to delete {mDelete.name}?
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                    <Button variant="plain" color="neutral" onClick={hClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        color="danger"
                        loading={loading}
                        loadingPosition='end'
                        onClick={hSubmit}
                    >
                        Delete
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
}