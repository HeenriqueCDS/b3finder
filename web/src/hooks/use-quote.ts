import { useQuery } from "@tanstack/react-query"
import request, { gql } from "graphql-request"
import { Quote as QuoteType } from "../types/quote"

interface QuoteQuery {
    quote: QuoteType
  }

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

const useQuote = (symbol: string) => useQuery({
    queryKey: [`${symbol}`], queryFn: async () => {
      const { quote } = await request<QuoteQuery>('http://localhost:4000', getQuoteQueryDocument, { symbol })
      return quote
    }
  })

export { useQuote }
