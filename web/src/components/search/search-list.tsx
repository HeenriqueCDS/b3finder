import { NavLink } from "react-router-dom"
import { Quote } from "../../types/quote"

interface SearchListProps {
    data: Partial<Quote>[]
    search: string
}

const SearchItem = ({ quote }: { quote: Partial<Quote> }) => {
    return (
        <NavLink to={`/${quote.symbol}`} className="flex justify-between items-center p-2 border-b border-neutral-900 cursor-pointer" >
            <div className="flex gap-2">
                <img src={quote.logoUrl} className="h-8 w-8 rounded-md" />
                <div className="flex flex-col">
                    <h1 className="text-base">{quote.symbol}</h1>
                    <h2 className="text-xs text-neutral-500">{quote.longName}</h2>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-base">{quote.regularMarketPrice}</h1>
            </div>
        </NavLink>
    )
}

export const SearchList = ({ data, search }: SearchListProps) => {
    return (
        <div className="absolute border-neutral-900 rounded-l-md rounded-r-md rounded-b-md w-full overflow-auto h-32 z-50 left-0 top-[48px] border-2 bg-neutral-950">
            {data?.filter((quote) => quote.symbol?.includes(search.toLocaleUpperCase())).map((quote) => {
                return (
                    <SearchItem key={quote.symbol} quote={quote} />
                )
            })}
        </div>
    )
}