import {
    FlexibleWidthXYPlot,
    HorizontalGridLines,
    LineSeries,
    XAxis,
    YAxis,
    AreaSeries,
    GradientDefs,
} from 'react-vis';

import { Service, } from './index.styled'
import Text from '../typography/Text';
import Heading from '../typography/Heading';
import { useTheme } from 'styled-components';
import { IS_SERVER } from '../../constants';


const ResponseTime = ({ monitor }) => {
    const theme = useTheme()

    const calculateResponseTime = () => {
        const length = Array.from(monitor.pings).filter(a => a.status).length;
        return Array.from(monitor.pings)
            .filter(a => a.status)
            .reduce((acc, curr) => {
                return acc + (curr.duration / length);
            }, 0) * 1000
    }

    const calculateX = (stamp, index) => {
        if (stamp) return stamp
        return parseFloat(monitor.pings[0].stamp) - (index * 60)
    }

    return (
        <Service>
            <Heading variant={6} className='pb-1'>Response time</Heading>
            <Text muted={true} className='pb-2'>{calculateResponseTime().toFixed(0)}ms</Text>
            <FlexibleWidthXYPlot
                height={100}>

                <GradientDefs>
                    <linearGradient id='fade-gradient' x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={theme.colors.green} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={theme.colors.green} stopOpacity={0.0} />
                    </linearGradient>
                </GradientDefs>
                <HorizontalGridLines tickTotal={2}
                    style={{
                        stroke: theme.colors.lightGray,
                    }} />
                <XAxis tickTotal={5} tickFormat={v => new Date(v).toLocaleTimeString('en', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}
                    style={{
                        line: {
                            stroke: theme.colors.lightGray,
                        },
                        text: {
                            fill: theme.colors.muted,
                        }
                    }}
                />
                <YAxis tickTotal={2}
                    tickSize={0}
                    style={{
                        line: {
                            strokeWidth: 0
                        },
                        text: {
                            fill: theme.colors.muted,
                        }
                    }} />
                <AreaSeries
                    getNull={d => d.y}
                    color={`url(#fade-gradient)`}
                    curve={'curveMonotoneX'}
                    style={{ strokeLinejoin: "round" }}
                    data={monitor.pings.map((activity, index) => ({
                        x: parseFloat(activity.stamp) * 1000, y: (activity.duration || 0) * 1000
                    }))} />
                <LineSeries
                    getNull={d => d.y}
                    color={theme.colors.green}
                    style={{ strokeLinejoin: "round", background: 'transparent' }}
                    strokeWidth={2}
                    curve={'curveMonotoneX'}
                    data={monitor.pings.map((activity, index) => ({
                        x: calculateX(parseFloat(activity.stamp), index) * 1000, y: (activity.duration || 0) * 1000
                    }))} />
            </FlexibleWidthXYPlot>
        </Service>
    )
}

export default ResponseTime;