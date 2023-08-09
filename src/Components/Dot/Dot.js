import './Dot.css'
export default function Dot({status, size, className}){
    const color = status === 'on' ? '#7A9D54' 
                : status === 'off' ? '#D8D9DA'
                : status === 'error' ? '#D2001A'
                : status === 'warning' ? '#FFD93D'
                :  '#D8D9DA';
    const _size = size === 'sm' ? '6px'
                : size === 'md' ? '12px'
                : size === 'lg' ? '24px'
                : size === 'xl' ? '48px'
                : '6px';

    return (
        <div className={`dot ${className}`} style={{backgroundColor: color, width: _size, height: _size}}/>
    )
}