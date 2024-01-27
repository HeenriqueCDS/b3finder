import { useQuery } from "@tanstack/react-query"
import request, { gql } from "graphql-request"
import { QuoteCard } from "../components/quote-card"
interface QuotesQuery {
    quotes: {
        symbol: string
        longName: string
        logoUrl: string
        regularMarketPrice: number
        currency: string
    }[]
}

export const Home = () => {
    const listQuotesQueryDocument = gql`
    query quotes {
      quotes {
        symbol,
        longName,
        regularMarketPrice,
        logoUrl,
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

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="flex flex-col p-4 gap-4 h-[calc(100%-130px)] sm:h-[calc(100%-78px)]">
            <h1 className="text-neutral-400 text-2xl">Quotes</h1>
            <div className="flex flex-col gap-3 overflow-auto max-h-full">
                {data?.map((quote) => {
                    return <QuoteCard key={quote.symbol} {...quote} />
                })}
            </div>

        </div>
    )
}