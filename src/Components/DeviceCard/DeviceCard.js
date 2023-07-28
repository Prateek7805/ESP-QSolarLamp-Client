import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: '#000000',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  }));
  const AddDevice = () => {
    return (
        <ColorButton variant="contained" sx={{width: '100%',minHeight: '200px', display: 'grid', placeItems:'center'}}>
                
                    <Typography variant="h5" color="text.secondary" sx={{mx: 2}}>
                        Add a device
                    </Typography>
                
        </ColorButton>
    )
}
const Device = (props) => {
    const {name, power, brightness} = props;
    return (
    <Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',minHeight: '200px'}}>
            <CardContent>
                <Typography varient="h4" sx={{mb:2}}>
                    {name}
                </Typography>
                <div className='d-flex mb-1'>
                    <Typography varient="body2" color="text.secondary">Power:</Typography>
                    <Typography varient="body2" color="text.secondary" sx={{ml:1}}>{power? 'On' : 'Off'}</Typography>
                </div>
                <div className='d-flex mb-1'>
                    <Typography varient="body2" color="text.secondary">Brightness:</Typography>
                    <Typography varient="body2" color="text.secondary" sx={{ml:1}}>{brightness}%</Typography>
                </div>
            </CardContent>
            
    </Card>
    );
}
export default function DeviceCard(props) {
    const newCard = props.newCard;
    
    if(newCard){
        return <AddDevice/>
    }
    return <Device {...props}/>
}