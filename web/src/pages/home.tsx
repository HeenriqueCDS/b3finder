/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Loading } from "../components/loading"
import { QuoteCard } from "../components/quote-card"
import { Search } from "../components/search"
import { useQuotes } from "../hooks/use-quotes"
import { pusher } from "../services/pusher"


export const Home = () => {
    const { data, isLoading, refetch } = useQuotes()
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        const channel = pusher.subscribe(`stock-update`);
        channel.bind('scheduled-event', function () {
          refetch()
        });
        return () => {
            pusher.unsubscribe(`stock-update`)
        }
    }, [])
    
    if (isLoading) return <Loading loading={isLoading} />
    if (!data) return <h1>Error</h1>
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
                {search.length > 3 && <QuoteCard logoUrl='https://cdn-icons-png.flaticon.com/512/4315/4315609.png' symbol={search} longName="Not found? click this card to try to add the new ticker! (Only works with b3 tickers)" />}
                {filteredData.length === 0 && <div className="text-neutral-400 text-xl">No results found</div>}
            </div>
        </div>
    )
}