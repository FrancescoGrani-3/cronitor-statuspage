import { listMonitorPings } from '../../../../api/monitors'

export default async function handler(req, res) {
  const { key } = req.query
  try {
    const { data, status } = await listMonitorPings(key)
    res.status(status).json(data)
  } catch (error) {
    const { data, status } = error.response
    res.status(status).json(data)
  }
}
