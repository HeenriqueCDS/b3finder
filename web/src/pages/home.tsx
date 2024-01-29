import { useState } from "react"
import { QuoteCard } from "../components/quote-card"
import { Search } from "../components/search"
import { useQuotes } from "../hooks/use-quotes"


export const Home = () => {

    const { data, isLoading } = useQuotes()
    const [search, setSearch] = useState<string>('')

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Something went wrong</div>

    const filteredData = data.filter(item =>
        item.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.longName?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
        item.longName !== null
    )

    return (
        <div className="flex flex-col p-4 gap-4 h-[calc(100%-130px)] sm:h-[calc(100%-78px)]">
            <div className="flex flex-col  gap-4 sm:flex-row justify-between">
                <h1 className="text-neutral-400 text-2xl">Quotes</h1>
                <Search search={search} setSearch={setSearch} />
            </div>
            <div className="flex flex-col gap-3 overflow-auto max-h-full">
                {filteredData.map((quote) => {
                    return <QuoteCard key={quote.symbol} {...quote} />
                })}
                {filteredData.length === 0 && <div className="text-neutral-400 text-xl">No results found</div>}
            </div>
        </div>
    )
}