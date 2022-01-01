import { Check, X } from 'react-feather';

import { Circle } from './index.styled'

const StatusIndicator = ({ up, size, noPulse }) => {
    const getSize = () => {
        switch (size) {
            case '1x':
                return {
                    circle: 20,
                    icon: 12
                };               
            case '2x':
                return {
                    circle: 50,
                    icon: 30
                };    
            case '3x':
                return {
                    circle: 75,
                    icon: 40
                };               
            default:
                return {
                    circle: 100,
                    icon: 50
                };
        }
    }

    return (
        <Circle className={!noPulse ? 'pulse' : ''} size={getSize().circle} up={up}>
            {
                up
                    ? <Check size={getSize().icon} color={"#fff"} strokeWidth={'0.2rem'} />
                    : <X size={getSize().icon} color={"#fff"} strokeWidth={'0.2rem'} />
            }
        </Circle>
    )
}

export default StatusIndicator;