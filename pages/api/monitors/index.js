import { listMonitors } from '../../../apis/monitors'

export default async function handler(req, res) {
  try {
    const { data, status } = await listMonitors()
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59')
    res.status(status).json(data)
  } catch (error) {
    console.log(error)
    // const { data, status } = error.response
    // res.status(status).json(data)
  }
}
