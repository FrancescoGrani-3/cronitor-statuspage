import { Card } from 'react-bootstrap'

import Uptime from './Uptime'
import ResponseTime from './ResponseTime'
import StatusIndicator from './StatusIndicator'
import { StyledCardBody, StyledCard } from "./index.styled"
import Heading from '../typography/Heading'

const Service = ({ monitor }) => {

    return (
        <StyledCard className='mt-4 mb-4'>
          <Card.Header>
            <div className='status'>
              <StatusIndicator size='1x' up={monitor.latest_event?.event === 'req-ok'} />
              <Heading variant={5} className='mx-2'>{monitor.name}</Heading>
            </div>
          </Card.Header>
          {monitor.pings && <StyledCardBody>
            <Uptime monitor={monitor} />
            <ResponseTime monitor={monitor} />
          </StyledCardBody>}
        </StyledCard>
    )
}

export default Service