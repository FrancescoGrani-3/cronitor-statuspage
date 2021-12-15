import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { Service, Pings, Ping } from './index.styled'
import Text from '../typography/Text';
import Heading from '../typography/Heading';

const Uptime = ({ monitor }) => {
    const calculateUptime = () => {
        const length = Array.from(monitor.pings).filter(a => a.status).length;

        return Array.from(monitor.pings)
            .filter(a => a.status)
            .reduce((acc, curr) => {
                return curr.status === 'ok' ? acc + (1 / length) : acc
            }, 0) * 100
    }

    const renderTooltip = (props, activity) => {

        return (
            <Tooltip {...props}>
                {activity.status === 'ok' ? 'Operational' : 'Down'}
                <br />
                {new Date(parseFloat(activity.stamp) * 1000).toLocaleTimeString('en', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}
            </Tooltip>
        )
    };

    return (
        <Service className=''>
            <Heading variant={6} className='mb-1'>
                Uptime
            </Heading>
            <Text muted={true} className='pb-2'>{calculateUptime().toFixed(3)}% uptime</Text>
            <Pings>
                {[...monitor.pings].reverse().map((activity, index) => (
                    <OverlayTrigger
                        key={index} 
                        placement="top"
                        delay={{ show: 100, hide: 100 }}
                        overlay={(e) => renderTooltip(e, activity)}
                    >
                        <Ping status={activity.status} />
                    </OverlayTrigger>
                ))}
            </Pings>
        </Service>
    )
}

export default Uptime;