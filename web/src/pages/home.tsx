import { MagnifyingGlass } from "@phosphor-icons/react"
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

    isLoading && <div>Loading...</div>
    return (
        <div className="h-screen w-screen text-neutral-300 bg-neutral-950">
            <header className="w-screen p-4 border-b-neutral-900 border-b-2 flex flex-col gap-4">
                <h1 className="text-3xl text-neutral-400"><span className="text-green-400">[B]</span><span className="text-yellow-400">³</span> Finder</h1>
                <div className="flex rounded-md border-neutral-900 border-2 justify-between">
                    <input className="bg-transparent text-neutral-300 p-2 focus:outline-none" type="text" placeholder="Search..." />
                    <button className="bg-transparent text-neutral-300 p-2 border-l-2 border-l-neutral-900 min-w-10 flex justify-center items-center"><MagnifyingGlass className="text-neutral-700  w-5 h-5"/></button>
                </div>
            </header>
            {data?.map((quote) => { return <li><a href={`/${quote.symbol}`}>{quote.symbol}</a></li> })}
        </div>
    )
}