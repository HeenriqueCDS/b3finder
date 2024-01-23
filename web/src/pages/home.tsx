import { useQuery } from "@tanstack/react-query"
import request, { gql } from "graphql-request"

export const Home = () => {
    interface QuotesQuery {
        quotes: {
            symbol: string
            shortName: string
            regularMarketPrice: number
            currency: string
        }[]
    }
    const listQuotesQueryDocument = gql`
    query quotes {
      quotes {
        symbol,
        shortName,
        regularMarketPrice,
        currency
      }
    }   
  `
    const { data, isLoading } = useQuery({
        queryKey: ['quotes'], queryFn: async () => {
            const { quotes } = await request<QuotesQuery>('http://localhost:4000', listQuotesQueryDocument)
            return quotes
        }
    })
    console.log(data)
    isLoading && <div>Loading...</div>
    return (
        <ul>
            {data?.map((quote) => { return <li><a href={`/${quote.symbol}`}>{quote.symbol}</a></li> })}
        </ul>
    )
}