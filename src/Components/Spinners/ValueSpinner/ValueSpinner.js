import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

// Inspired by the former Facebook spinners.
export default function ValueSpinner(props) {
    const {color,size,variant,value, className} = props;
    const _size = size === 'sm' ? 24 : size === 'md'? 32 : size === 'lg'? 48 : 32;
    const colorfn = (theme) => (color? color : theme.palette.mode === 'light' ? '#2E94B9' : '#F8DE22');
    const _variant = variant === 'determinate' || variant === 'indeterminate' ? variant : 'indeterminate';
    const _value = typeof(value) === 'number'? value>=0 && value<=100 ? value: 0 : 0;

  return (
    <div className={`position-relative d-flex ${className || ''}`}>
      <CircularProgress
        sx={{
          color: (theme) =>
                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
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
          top:0,
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