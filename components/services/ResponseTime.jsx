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


const ResponseTime = ({ monitor }) => {
    const theme = useTheme()
    
    // console.log(theme);

    const calculateResponseTime = () => {
        const length = Array.from(monitor.activities).filter(a => a.status).length;
        return Array.from(monitor.activities)
            .filter(a => a.status)
            .reduce((acc, curr) => {
                return acc + (curr.duration / length);
            }, 0) * 1000
    }

    return (
        <Service>
            <Heading variant={6} className='pb-1'>Response time</Heading>
            <Text muted className='pb-2'>{calculateResponseTime().toFixed(0)}ms</Text>
            <FlexibleWidthXYPlot
                height={100}>

                <GradientDefs>
                    <linearGradient id='fade-gradient' x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={theme.colors.green} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={theme.colors.green} stopOpacity={0.0} />
                    </linearGradient>
                </GradientDefs>
                <HorizontalGridLines />
                <AreaSeries
                    color={`url(#fade-gradient)`}
                    curve={'curveMonotoneX'}
                    style={{ strokeLinejoin: "round" }}
                    data={monitor.activities.map((activity, index) => ({
                        x: index, y: activity.duration
                    }))} />
                <LineSeries
                    color={theme.colors.green}
                    style={{ strokeLinejoin: "round", background: 'transparent' }}
                    strokeWidth={2}
                    curve={'curveMonotoneX'}
                    data={monitor.activities.map((activity, index) => ({
                        x: index, y: activity.duration
                    }))} />
                <XAxis />
                <YAxis />
            </FlexibleWidthXYPlot>
        </Service>
    )
}

export default ResponseTime;