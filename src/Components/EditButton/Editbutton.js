import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckIcon from '@mui/icons-material/Check';

const EditBtn = styled(Button)({
    '&:hover': {
        border: '1px solid #AB0F23',
    },
});

export default function EditButton(props){
    const {edit, ...restProps} = props;
    return (
        <EditBtn {...restProps}>
            {edit? ( 
                <ModeEditOutlineIcon sx={{ color: '#AB0F23' }} />
            ) : (
                <CheckIcon sx={{ color: '#AB0F23' }}/>
            )}
           
        </EditBtn>
    )
}