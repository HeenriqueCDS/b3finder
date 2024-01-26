import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

interface History {
    date: number
    open: number
    high: number
    low: number
    adjustedClose: number
    volume: number

}
interface ChartProps {
    history: History[]
    width: number
}
export const Chart = ({ history, width }: ChartProps) => {
    return (
        <LineChart className="w-full" width={width}  height={250} data={history}>
            <XAxis dataKey="name" />
            <YAxis domain={['auto', 'auto']}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="adjustedClose" dot={false} name="close" stroke="#8884d8" />
        </LineChart>
    )
}