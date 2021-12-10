import { listMonitors } from '../../../api/monitors'

export default async function handler(req, res) {
    const { data } = await listMonitors()
    res.status(200).json(data)
  }
  