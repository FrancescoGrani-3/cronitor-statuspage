import { listMonitorPings } from '../../../../apis/monitors'

export default async function handler(req, res) {
  const { key } = req.query
  try {
    const { data, status } = await listMonitorPings(key)
    // res.setHeader('Cache-Control', 's-maxage=0, stale-while-revalidate=0')
    res.status(status).json(data)
  } catch (error) {
    const { data, status } = error.response
    res.status(status).json(data)
  }
}
