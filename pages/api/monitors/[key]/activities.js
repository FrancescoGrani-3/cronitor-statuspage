import { listMonitorActivities } from '../../../../api/monitors'

export default async function handler(req, res) {
  const { key } = req.query
  const { data } = await listMonitorActivities(key)
  res.status(200).json(data)
}
