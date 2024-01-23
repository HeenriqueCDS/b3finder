import { useQuery } from "@tanstack/react-query"
import request, { gql } from "graphql-request"

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

// interface HistoryQuery {
//     history: {
//         date: number
//         open: number
//         high: number
//         low: number
//         close: number
//         volume: number
//     }[]
//     }
export const Quote = () => {
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
    const { data, isLoading } = useQuery({
        queryKey: [`${symbol}`], queryFn: async () => {
            const { quote } = await request<QuoteQuery>('http://localhost:4000', getQuoteQueryDocument, { symbol })
            return quote
        }
    })
    isLoading && <div>Loading...</div>
    return <div>{data?.shortName} {data?.regularMarketPrice}</div>;
}