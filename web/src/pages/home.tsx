import { useQuery } from "@tanstack/react-query"
import request, { gql } from "graphql-request"
import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
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
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['quotes'], queryFn: async () => {
            const { quotes } = await request<QuotesQuery>('http://localhost:4000', listQuotesQueryDocument)
            return quotes
        }
    })

    if (isLoading || isFetching) return <div>Loading...</div>

    return (
        <div className="flex flex-col p-4 gap-4 h-[calc(100%-130px)] sm:h-[calc(100%-78px)]">
            <h1 className="text-neutral-400 text-2xl">Quotes</h1>
            <div className="flex flex-col gap-3 overflow-auto max-h-full">
                {data?.sort((a, b) => {
                    if (a.regularMarketPrice > b.regularMarketPrice) {
                        return -1
                    }
                    if (a.regularMarketPrice < b.regularMarketPrice) {
                        return 1
                    }
                    return 0
                }).map((quote) => {
                    return (
                        <article onClick={() => navigate(`/${quote.symbol}`)} className=" max-w-full inline-flex justify-between p-3 items-center border-2 rounded-md transition-all border-neutral-900 hover:-translate-y-1 cursor-pointer">
                            <div className="flex gap-3 w-[calc(100%-80px)] overflow-hidden truncate">
                                <img src={quote.logoUrl} className="h-10 w-10 rounded-md"/>
                                <div className="flex flex-col gap-1 w-[calc(100%-45px)]">
                                    <h2 className="text-base text-neutral-300 truncate">{quote.symbol}</h2>
                                    <h2 className="text-base text-neutral-500 truncate">{quote.longName}</h2>
                                </div>
                            </div>
                            <h3 className="text-green-300 text-base w-20 text-end">
                                {quote.regularMarketPrice}{' '}
                                <span className="text-neutral-300 text-xs">
                                    {quote.currency}
                                </span>
                                </h3>
                        </article>
                        )
                })}
            </div>

        </div>
    )
}