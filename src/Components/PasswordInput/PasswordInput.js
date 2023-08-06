import { useState } from "react";
import { TextField, InputAdornment, IconButton} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInput(props){
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
                label="Password"
                {...props}
        />
    )
}