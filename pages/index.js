import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Head from 'next/head'

import Services from '../components/services'
import {
  listMonitors, listMonitorPings,
  listMonitorPingsInternal, listMonitorsInternal
} from '../apis/monitors'
import configs from '../configs'

let liveStatsInterval = null;
const Landing = (props) => {
  const [monitors, setMonitors] = useState(props.data.monitors)

  useEffect(() => {
    liveStatsInterval = setInterval(() => {
      fetchMonitorsData()
      fetchMonitorsPingsData()
    }, 60000)

    return () => {
      clearInterval(liveStatsInterval)
    }
  }, [])

  const fetchMonitorsData = () => {
    listMonitorsInternal().then(res => {
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

  const fetchMonitorsPingsData = () => {
    monitors.forEach(monitor => {

      listMonitorPingsInternal(monitor.key).then(res => {
        if (res.status !== 200) return
        setMonitors(monitors => monitors.map(m => {

          if (m.key === monitor.key) {
            const data = res.data[monitor.key]
            m = {
              ...m,
              pings: data.concat([...new Array(50 - data.length).fill({})])
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
  try {
    const results = await listMonitors()

    const pings = await Promise.all(results.data.monitors.map(monitor => {
      return listMonitorPings(monitor.key)
    }))

    const monitors = results.data.monitors.map((monitor, index) => {
      const pingsData = pings[index].data[monitor.key]

      return {
        ...monitor,
        pings: pingsData.concat([...new Array(50 - pingsData.length).fill({})]),
      }
    })

    return {
      props: {
        data: { ...results.data, monitors },
      },
      revalidate: 1,
    }
  } catch (e) {

    return {
      props: {
        data: {
          monitors: [],
        }
      },
    }
  }
}

export default Landing;
