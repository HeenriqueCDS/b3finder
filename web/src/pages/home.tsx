import { QuoteCard } from "../components/quote-card"
import { useQuotes } from "../hooks/use-quotes"


export const Home = () => {

    const { data, isLoading } = useQuotes()

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