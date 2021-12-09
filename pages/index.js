import { Container, Card, } from 'react-bootstrap'
import styled from 'styled-components'


import { listMonitorActivities, listMonitorPings, listMonitors } from '../api/monitors'
import Text from '../components/typography/Text';
import Heading from '../components/typography/Heading';
import Uptime from '../components/services/Uptime';
import ResponseTime from '../components/services/ResponseTime';
import StatusIndicator from '../components/services/StatusIndicator';

const StyledCardBody = styled(Card.Body)`
  padding: 0;
  border-radius: ${p => p.theme.sizes.card.radius}px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  overflow: hidden;
`


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const StyledCard = styled(Card)`
  border-radius: ${p => p.theme.sizes.card.radius}px;
  border: none;
  box-shadow: 2px 2px 5px #2222;

  .card-header {
    border-radius: ${p => p.theme.sizes.card.radius}px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 1rem 2rem;
    border: none;
    display: flex;
  }

  .card-footer {
    border-radius: ${p => p.theme.sizes.card.radius}px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`


const Landing = (props) => {
  const { monitors } = props.data

  const getMonitorsStatus = () => {
    return monitors.reduce((acc, curr) => {
      return (curr.latest_event.event === 'req-ok') && acc
    }, true)
  }

  return (
    <Container>
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

      {monitors.map((monitor) => (
        <StyledCard className='mb-4' key={monitor.key}>
          <Card.Header>
            <StatusIndicator size='1x' up={monitor.latest_event.event === 'req-ok'} />
            <Heading variant={6} className='mx-2'>{monitor.name}</Heading>
          </Card.Header>
          <StyledCardBody>
            <Uptime monitor={monitor} />
            <ResponseTime monitor={monitor} />
          </StyledCardBody>
        </StyledCard>))
      }
    </Container >
  )
}

export const getStaticProps = async () => {
  const results = await listMonitors()

  const pings = await Promise.all(results.data.monitors.map(monitor => {
    return listMonitorPings(monitor.key)
  }))

  const activities = await Promise.all(results.data.monitors.map(monitor => {
    return listMonitorActivities(monitor.key)
  }))

  const monitors = results.data.monitors.map((monitor, index) => {

    return {
      ...monitor,
      pings: pings[index].data[monitor.key],
      activities: activities[index].data,
    }
  })

  return {
    props: {
      data: { ...results.data, monitors },
    }
  }
}

export default Landing;
