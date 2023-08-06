import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
export default function ModalPassword(props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const hShowPassword = () => setIsPasswordVisible(show => !show);
    return (
        <TextField variant="outlined"
            type={isPasswordVisible ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={hShowPassword}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                        >
                            {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            size="small"
            {...props}
        />
    )
}