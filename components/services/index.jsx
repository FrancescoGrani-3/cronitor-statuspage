import { RefreshCw } from 'react-feather'

import { Header, Date, Wrapper } from './index.styled'
import Text from '../typography/Text';
import Heading from '../typography/Heading';
import Button from '../button';
import StatusIndicator from './StatusIndicator';
import Service from './Service';

const Services = ({ monitors, status, ...props }) => {

    return (<Wrapper>
        <Header className='pt-4 my-5'>
            {
                monitors.length > 0
                    ? <>
                        <StatusIndicator noPulse up={status} />
                        <Heading className='mt-4 mb-2 text-center'>
                            {
                                status
                                    ? 'All services are operational'
                                    : 'Some services might be down due to an incident'
                            }
                        </Heading>
                        <Date>
                            <Text className='text-center' muted={true}>
                                As of
                                {' '}
                                {
                                    new Intl.DateTimeFormat('en-US', {
                                        dateStyle: 'full', timeStyle: 'short'
                                    }).format(monitors[monitors.length - 1].latest_event.stamp * 1000)
                                }
                            </Text>
                        </Date>
                    </>
                    : <>
                        <StatusIndicator noPulse up={false} />
                        <Heading className='mt-4 mb-2'>No monitors is available</Heading>
                        <Text muted={true}>Start using the status page by adding your first monitor in Cronitor dashboard</Text>
                    </>
            }
        </Header>
        <Button
            icon={(p) => <RefreshCw {...p} />}
            variant='transparent'
            onClick={() => props.refresh()}
            className='mt-2 align-self-end'
            iconRotating={props.refreshLoading}
            loading={props.refreshLoading}
            loadingText='Refreshing...'
        >
            Refresh
        </Button>
        {
            monitors.map((monitor) => (
                <Service monitor={monitor} key={monitor.key} />
            ))
        }
    </Wrapper>)
}

export default Services