import { Container } from 'react-bootstrap'

import { listMonitorActivities, listMonitorPings, listMonitors } from '../api/monitors'

const Landing = (props) => {
  const { monitors } = props.data

  return (
    <Container>
      <Services monitors={monitors} />
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
