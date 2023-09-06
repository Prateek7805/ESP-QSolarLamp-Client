import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

// Inspired by the former Facebook spinners.
export default function ValueSpinner(props) {
  const _compColor = (color) =>{
    const _color = color.substring(1); 
    const c1 = "0x" + _color.substring(0,2);
    const c2 = "0x" + _color.substring(2,4);
    const c3 = "0x" + _color.substring(4,6);
    const h1 = 0xFF - parseInt(c1, 16);
    const h2 = 0xFF - parseInt(c2, 16);
    const h3 = 0xFF - parseInt(c3, 16);
    const compColor = "#" + h1.toString(16) + h2.toString(16) + h3.toString(16);
    return compColor;
  }

  const { color, size, variant, value, className } = props;
  const _size = size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 48 : 32;
  const colorfn = (theme) => (color ? color : theme.palette.mode === 'light' ? '#2E94B9' : '#F8DE22');
  const compColorFn = (theme) => (theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]);
  const _variant = variant === 'determinate' || variant === 'indeterminate' ? variant : 'indeterminate';
  const _value = typeof (value) === 'number' ? value >= 0 && value <= 100 ? value : 0 : 0;
  
  return (
    <div className={`position-relative d-flex ${className || ''}`}>
      <CircularProgress
        sx={{
          color: compColorFn
        }}
        size={_size}
        thickness={5.5}
        variant="determinate"
        value={100}
      />
      <CircularProgress
        variant={_variant}
        value={_value}
        sx={{
          color: colorfn,
          animationDuration: '1000ms',
          position: 'absolute',
          left: 0,
          top: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          },
        }}
        size={_size}
        thickness={5.5}
      />
    </div>
  );
}