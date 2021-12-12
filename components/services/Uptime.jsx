import { Service, Pings, Ping } from './index.styled'
import Text from '../typography/Text';
import Heading from '../typography/Heading';
import StatusIndicator from '../services/StatusIndicator';

const Uptime = ({ monitor }) => {
    const calculateUptime = () => {
        const length = Array.from(monitor.pings).filter(a => a.status).length;
        return Array.from(monitor.pings)
            .filter(a => a.status)
            .reduce((acc, curr) => {
                return curr.status === 'ok' ? acc + (1 / length) : acc
            }, 0) * 100
    }

    return (
        <Service className=''>
            <Heading variant={6} className='mb-1'>
                Uptime
            </Heading>
            <Text muted className='pb-2'>{calculateUptime().toFixed(3)}% uptime</Text>
            <Pings>
                {monitor.pings.map((activity, index) => (
                    <Ping key={index} status={activity.status} />
                ))}
            </Pings>
        </Service>
    )
}

export default Uptime;