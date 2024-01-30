import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "../components/button"
import { Chart } from "../components/chart"
import { Display } from "../components/display"
import { VStack } from "../components/vstack"
import { useHistory } from "../hooks/use-history"
import { useQuote } from "../hooks/use-quote"
import { formatMoney } from "../utils/formatMoney"

export const Quote = () => {
  const chartsRef = useRef<HTMLDivElement>(document.getElementById('main') as HTMLDivElement)
  const [width, setWidth] = useState<number>(0)
  const [chartRange, setChartRange] = useState<'1wk' | '1mo' | '3mo' | '' >('')
  const symbol = window.location.pathname.replace('/', '')

  const resize = useCallback(() => {
    setTimeout(() => {
      setWidth(chartsRef.current?.offsetWidth - 32)
    }, 300)
  }, [])

  useEffect(() => {
    resize()
  }, [resize])
  window.addEventListener('resize', resize)


  const { data, isLoading } = useQuote(symbol)

  const { data: historyData, refetch } = useHistory({symbol, chartRange})


  useEffect(() => {
    refetch()
  }, [chartRange, refetch])



  return (
    <div id="main" className="flex flex-col p-4 gap-4 h-[calc(100%-130px)] sm:h-[calc(100%-78px)] overflow-auto" ref={chartsRef}>
      {isLoading ?
        <h1>Loading...</h1> :
        !data ? <h1>Not found</h1> :
          <>
            <div className="flex justify-between">
              <VStack>
                <h1 className="text-2xl">{data.symbol}</h1>
                <h2 className="text-base text-neutral-500">{data.longName} | Stock Quote</h2>
              </VStack>
              <img src={data.logoUrl} className="h-14 w-14 rounded-md" />
            </div>
            <div className="flex justify-between">
              <VStack>
                <h4 className="text-xs text-neutral-500">Price</h4>
                <span className="text-base">{formatMoney(data.regularMarketPrice)}</span>
              </VStack>
              <VStack>
                <h4 className="text-xs text-neutral-500">Variation (day)</h4>
                <span className={`${data.regularMarketChangePercent > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {formatMoney(data.regularMarketPrice * (data.regularMarketChangePercent / 100))}
                </span>
              </VStack>
            </div>
            {historyData &&
              <>
                <div className="flex gap-3">
                  <Button value="1wk" onClick={setChartRange} state={chartRange}/>
                  <Button value="1mo" onClick={setChartRange} state={chartRange}/>
                  <Button value="3mo" onClick={setChartRange} state={chartRange}/>
                </div>
                <Chart history={historyData} width={width} />
              </>
            }
            <div className="flex gap-3">
              <VStack>
                <h4 className="text-xs text-neutral-500">Min. 52 weeks</h4>
                <span className="text-base">R$ {data.fiftyTwoWeekLow}</span>
              </VStack>
              <VStack>
                <h4 className="text-xs text-neutral-500">Max. 52 weeks</h4>
                <span className="text-base">{formatMoney(data.fiftyTwoWeekHigh)}</span>
              </VStack>
            </div>
            <h1>Overview</h1>
            <div className="flex w-full flex-wrap gap-4">
              <Display label="Current price" value={formatMoney(data.regularMarketPrice)} />
              <Display label="Market value" value={formatMoney(data.marketCap)} />
              <Display label="Opening" value={formatMoney(data.regularMarketOpen)} />
              <Display label="Max price" value={formatMoney(data.regularMarketDayHigh)} />
              <Display label="Min price" value={formatMoney(data.regularMarketDayLow)} />
              <Display label="Volume" value={formatMoney(data.regularMarketVolume)} />
              <Display label="Previous close" isFull value={formatMoney(data.regularMarketPreviousClose)} />
            </div>
          </>
      }
    </div>
  )
}