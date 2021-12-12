import fetchAPI, { fetchInternalAPI } from './'

export const listMonitors = async () => {
    return await fetchAPI.get('/monitors')
}

export const listMonitorPings = async (monitor) => {
    return await fetchAPI.get(`/monitors/${monitor}/pings`)
}

export const listMonitorActivities = async (monitor) => {
    return await fetchAPI.get(`/monitors/${monitor}/activity`)
}

export const listMonitorsInternal = async () => {
    return await fetchInternalAPI.get(`/monitors`)
}

export const listMonitorPingsInternal = async (monitor) => {
    return await fetchInternalAPI.get(`/monitors/${monitor}/pings`)
}