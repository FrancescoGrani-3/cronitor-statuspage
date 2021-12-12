import fetchAPI from './'

export const listMonitors = async () => {
    return await fetchAPI.get('/monitors')
}

export const listMonitorPings = async (monitor) => {
    return await fetchAPI.get(`/monitors/${monitor}/pings`)
}

export const listMonitorActivities = async (monitor) => {
    return await fetchAPI.get(`/monitors/${monitor}/activity`)
}