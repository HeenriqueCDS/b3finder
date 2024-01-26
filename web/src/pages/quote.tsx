import { useQuery } from "@tanstack/react-query"
import request, { gql } from "graphql-request"
import { useCallback, useEffect, useRef, useState } from "react"
import { Chart } from "../components/chart"
import { Display } from "../components/display"
import { VStack } from "../components/vstack"
import { formatMoney } from "../utils/formatMoney"

interface QuoteQuery {
  quote: {
    symbol: string
    currency: string
    shortName: string
    longName: string
    regularMarketPrice: number
    regularMarketChange: number
    regularMarketChangePercent: number
    logoUrl: string
    updatedAt: Date | string
    fiftyTwoWeekLow: number
    fiftyTwoWeekHigh: number
    marketCap: number
    regularMarketVolume: number
    regularMarketOpen: number
    regularMarketDayHigh: number
    regularMarketDayLow: number
    regularMarketPreviousClose: number
  }
}

export interface HistoryQuery {
  history: {
    date: number
    open: number
    high: number
    low: number
    adjustedClose: number
    volume: number
  }[]
}

export const Quote = () => {
  const chartsRef = useRef<HTMLDivElement>(document.getElementById('main') as HTMLDivElement)
  const [width, setWidth] = useState<number>(0)

  const resize = useCallback(() => {
    setTimeout(() => {
      setWidth(chartsRef.current?.offsetWidth - 32)
    }, 300)
  }, [])

  useEffect(() => {
    resize()
  }, [chartsRef.current, resize])

  window.addEventListener('resize', resize)

  window.addEventListener('resize', resize)
  const symbol = window.location.pathname.replace('/', '')
  const getQuoteQueryDocument = gql`
    query quote ($symbol: String!) {
      quote (symbol: $symbol) {
        symbol,
        currency,
        shortName,
        longName,
        regularMarketPrice,
        regularMarketChange,
        regularMarketChangePercent,
        logoUrl,
        updatedAt,
        fiftyTwoWeekLow,
        fiftyTwoWeekHigh,
        marketCap,
        regularMarketVolume,
        regularMarketOpen,
        regularMarketDayHigh,
        regularMarketDayLow,
        regularMarketPreviousClose
      }
    }   
  `
  const getHistoryQueryDocument = gql`
    query history ($quoteSymbol: String!) {
      history (quoteSymbol: $quoteSymbol) {
        date,
        open,
        high,
        low,
        adjustedClose,
        volume
      }
    }   
  `

  const { data, isLoading } = useQuery({
    queryKey: [`${symbol}`], queryFn: async () => {
      const { quote } = await request<QuoteQuery>('http://localhost:4000', getQuoteQueryDocument, { symbol })
      return quote
    }
  })

  const { data: historyData } = useQuery({
    queryKey: [`${symbol}-history`], queryFn: async () => {
      const { history } = await request<HistoryQuery>('http://localhost:4000', getHistoryQueryDocument, { quoteSymbol: symbol })
      return history
    }
  })





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
      {historyData && <Chart history={historyData} width={width} />}
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