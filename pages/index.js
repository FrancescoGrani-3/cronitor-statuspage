import { listMonitorActivities, listMonitorPings, listMonitors } from '../api/monitors'

const Landing = (props) => {

  return (
    <div>
      {props.data.monitors.map((monitor) => (
        <div key={monitor.key} style={{
          marginBottom: '10px',
        }}>
          {monitor.name}
          <div>
            {monitor.activities.map((activity, index) => (
              <span key={index} style={{
                backgroundColor: activity.status === 'ok' ? 'limegreen' : 'orangered',
                marginRight: '2px',
                display: 'inline-flex',
                width: '10px',
                height: '30px',
                borderRadius: '5px',
              }}>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
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
