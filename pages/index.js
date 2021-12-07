import { Container, Row, Col, Card, } from 'react-bootstrap'
import styled, { createGlobalStyle } from 'styled-components'
import { Check, X } from 'react-feather';
import {
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis,
  AreaSeries,
  GradientDefs,
} from 'react-vis';

import { listMonitorActivities, listMonitorPings, listMonitors } from '../api/monitors'
import theme from '../constants/theme';
import Text from '../components/typography/Text';
import Heading from '../components/typography/Heading';

const StyledCardBody = styled(Card.Body)`
  padding: 0;
  border-radius: ${p => p.theme.sizes.card.radius}px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  overflow: hidden;
`

const Service = styled.div`
  background-color: ${p => p.theme.colors.card.body};
  ${p => !p.noBorder && `border-bottom: 1px solid #ccc;`}
  padding: 1rem 2rem;

  &:last-child {
    border: none;
  }
`

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: ${p => p.theme.colors.green};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Ping = styled.span`
  background-color: ${p => p.status === 'ok' ? p.theme.colors.green : p.theme.colors.red};
  margin-right: 2px;
  display: inline-flex;
  height: 40px;
  border-radius: 5px;
  padding: 0 1px;
  width: 100%;
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
  }

  .card-footer {
    border-radius: ${p => p.theme.sizes.card.radius}px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

const Pings = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 0;
`

const Landing = (props) => {
  const { monitors } = props.data

  console.log(monitors);

  return (
    <Container>
      <Header className='my-5'>
        <Circle>
          <Check size={40} color={"#fff"} strokeWidth={'0.25rem'} />
        </Circle>
        <Heading className='mt-4 mb-2'>All services are online</Heading>
        <Text muted>As of December 7th, 2:08 PM EST</Text>
      </Header>
      <StyledCard>
        <Card.Header>
          <Heading variant={6} className='pt-1'>Current status by service</Heading>
        </Card.Header>
        <StyledCardBody>
          {monitors.map((monitor) => (<>
            <Service key={monitor.key}>
              <Heading variant={6} className='pt-1 pb-3'>{monitor.name}</Heading>
              <Heading variant={6} className='pt-1'>Uptime</Heading>
              <Text muted className='pb-2'>100.000% uptime</Text>
              <Pings>
                {monitor.activities.map((activity, index) => (
                  <Ping key={index} status={activity.status} />
                ))}
              </Pings>
              <Heading variant={6} className='pt-4'>Response time</Heading>
              <Text muted className='pb-2'>349ms</Text>
              <FlexibleWidthXYPlot
                height={100}>

                <GradientDefs>
                  <linearGradient id='fade-gradient' x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={theme.colors.green} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={theme.colors.green} stopOpacity={0.0} />
                  </linearGradient>
                </GradientDefs>
                <HorizontalGridLines />
                <AreaSeries
                  color={`url(#fade-gradient)`}
                  curve={'curveMonotoneX'}
                  style={{ strokeLinejoin: "round" }}
                  data={monitor.activities.map((activity, index) => ({
                    x: index, y: activity.duration
                  }))} />
                <LineSeries
                  color={theme.colors.green}
                  style={{ strokeLinejoin: "round", background: 'transparent' }}
                  strokeWidth={2}
                  curve={'curveMonotoneX'}
                  data={monitor.activities.map((activity, index) => ({
                    x: index, y: activity.duration
                  }))} />
                <XAxis />
                <YAxis />
              </FlexibleWidthXYPlot>
            </Service>
          </>))}
        </StyledCardBody>
      </StyledCard>
    </Container>
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
