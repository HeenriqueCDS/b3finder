/* eslint-disable @typescript-eslint/no-explicit-any */
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { formatMoney } from "../../utils/formatMoney"

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

interface CustomTooltipProps {
    active?: boolean
    payload?: any
    label?: string
}
export const Chart = ({ history, width }: ChartProps) => {
    const data = history.map((item) => {
        return {
            ...item,
            date: new Date(item.date * 1000).toLocaleDateString()
        }
    })

    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps)  => {
        if (active && payload && payload.length) {
          const dataItem = data.find(item => item.date === label);
          const formattedValue = formatMoney(payload[0].value)
          return (
            <div className="flex flex-col bg-neutral-950 border-neutral-600 border-[1px] p-2 text-sm rounded-md gap-1 items-center">
              <p className="label text-xs">{dataItem?.date}</p>
              <p className="label text-[#8884d8]">{formattedValue}</p>
            </div>
          );
        }
      
        return <></>;
      };

    return (
        <LineChart className="w-full bg-c" width={width}  height={250} data={data}>
            <XAxis className="text-xs" dataKey="date" />
            <YAxis className="text-xs" domain={['auto', 'auto']}/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend />
            <Line type="monotone" dataKey="adjustedClose" dot={false} name="close" stroke="#8884d8" />

        </LineChart>
    )
}