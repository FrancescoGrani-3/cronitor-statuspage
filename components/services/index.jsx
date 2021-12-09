import { Header } from './index.styled'
import Text from '../typography/Text';
import Heading from '../typography/Heading';
import StatusIndicator from './StatusIndicator';
import Service from './Service';

const Services = ({ monitors }) => {
    const getMonitorsStatus = () => {
        return monitors.reduce((acc, curr) => {
            return (curr.latest_event.event === 'req-ok') && acc
        }, true)
    }

    return (<>
        <Header className='my-5'>
            {
                monitors.length > 0
                    ? <>
                        <StatusIndicator up={getMonitorsStatus()} />
                        <Heading className='mt-4 mb-2'>All services are operational</Heading>
                        <Text muted>As of {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(monitors[0].latest_event.stamp * 1000)}</Text>
                    </>
                    : <>
                        <StatusIndicator up={false} />
                        <Heading className='mt-4 mb-2'>No monitors is available</Heading>
                        <Text muted>Start using the status page by adding your first monitor in Cronitor dashboard</Text>
                    </>
            }
        </Header>
        {
            monitors.map((monitor) => (
                <Service monitor={monitor} key={monitor.key} />
            ))
        }
    </>)
}

export default Services