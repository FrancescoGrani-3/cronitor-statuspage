import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import Head from 'next/head'

import Services from '../components/services'
import { listMonitorActivities, listMonitors } from '../api/monitors'
import configs from '../configs'

let liveStatsInterval = null;
const Landing = (props) => {
  const [monitors, setMonitors] = useState(props.data.monitors)

  useEffect(() => {
    liveStatsInterval = setInterval(() => {
      fetchMonitorsData()
      fetchMonitorsActivitiesDate()
    }, 60000)

    return () => {
      clearInterval(liveStatsInterval)
    }
  }, [])

  const fetchMonitorsData = () => {
    axios.get(`api/monitors`).then(res => {
      if (res.status !== 200) return
      setMonitors(monitors => monitors.map(m => {
        const data = res.data.monitors.find(d => d.key === m.key)
        m = {
          ...m,
          ...data
        }

        return m
      }))
    })
  }

  const fetchMonitorsActivitiesDate = () => {
    monitors.forEach(monitor => {

      axios.get(`api/monitors/${monitor.key}/activities`).then(res => {
        if (res.status !== 200) return
        setMonitors(monitors => monitors.map(m => {
          if (m.key === monitor.key) {
            m = {
              ...m,
              activities: res.data
            }
          }

          return m
        }))
      })
    });
  }

  return (<>
    <Head>
      <title>{configs.NAME} Status Page</title>
      <meta name="description"></meta>
      <link rel='icon' href='favicon.ico' type='image/x-icon' />
    </Head>
    <Container>
      <Services monitors={monitors} />
    </Container >
  </>)
}

export const getStaticProps = async () => {
  const results = await listMonitors()

  const activities = await Promise.all(results.data.monitors.map(monitor => {
    return listMonitorActivities(monitor.key)
  }))


  const monitors = results.data.monitors.map((monitor, index) => {
    const activitiesData = activities[index].data

    return {
      ...monitor,
      activities: activitiesData.concat([...new Array(50 - activitiesData.length).fill({})]),
    }
  })

  return {
    props: {
      data: { ...results.data, monitors },
    }
  }
}

export default Landing;
