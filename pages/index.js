import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Head from 'next/head'
import useSetState from 'react-use-setstate'

import Services from '../components/services'
import {
  listMonitors, listMonitorPings,
  listMonitorPingsInternal, listMonitorsInternal
} from '../apis/monitors'
import configs from '../configs'

let liveStatsInterval = null;
const Landing = (props) => {
  const [state, setState] = useSetState({
    monitors: props.data.monitors,
    loading: false,
  })

  useEffect(() => {
    setState({ loading: 0 })
    liveStatsInterval = setInterval(() => {
      fetchData()
    }, 60000)

    return () => {
      clearInterval(liveStatsInterval)
    }
  }, [])

  const fetchData = () => {
    setState({ loading: true })
    Promise.allSettled([
      listMonitorsInternal(),
      ...state.monitors.map(monitor => {
        return listMonitorPingsInternal(monitor.key)
      })
    ]).then(results => {
      handleFetchedMonitors(results[0])
      results.slice(1).forEach(res => {
        handleFetchedMonitorsPings(res)
      })
      setState({ loading: false })
    })
  }

  const handleFetchedMonitors = (res) => {
    if (res.status !== 200) return
    setState(prevState => ({
      monitors: prevState.monitors.map(m => {
        const data = res.data.monitors.find(d => d.key === m.key)
        m = {
          ...m,
          ...data
        }

        return m
      }),
      loading: prevState.loading - 1
    }))
  }

  const handleFetchedMonitorsPings = (res) => {
    if (res.status !== 200) return
    setState(prevState => ({
      monitors: prevState.monitors.map(m => {

        if (m.key === monitor.key) {
          const data = res.data[monitor.key]
          m = {
            ...m,
            pings: data.concat([...new Array(50 - data.length).fill({})])
          }
        }

        return m
      }),
      loading: prevState.loading - 1
    }))
  }

  return (<>
    <Head>
      <title>{configs.NAME} Status Page</title>
      <meta name="description"></meta>
      <link rel='icon' href='favicon.ico' type='image/x-icon' />
    </Head>
    <Container>
      <Services
        monitors={state.monitors}
        refresh={fetchData}
        refreshLoading={state.loading}
      />
    </Container>
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
