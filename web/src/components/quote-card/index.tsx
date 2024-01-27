import { useNavigate } from "react-router-dom"
import { Quote } from "../../types/quote"

interface QuoteCardProps extends Partial<Quote> {}

export const QuoteCard = ({currency,logoUrl, longName, regularMarketPrice, symbol}: QuoteCardProps) => {
    const navigate = useNavigate()
    return (
        <article onClick={() => navigate(`/${symbol}`)} className=" max-w-full inline-flex justify-between p-3 items-center border-2 rounded-md transition-all border-neutral-900 hover:-translate-y-1 cursor-pointer">
            <div className="flex gap-3 w-[calc(100%-80px)] overflow-hidden truncate">
                <img src={logoUrl} className="h-10 w-10 rounded-md" />
                <div className="flex flex-col gap-1 w-[calc(100%-45px)]">
                    <h2 className="text-base text-neutral-300 truncate">{symbol}</h2>
                    <h2 className="text-base text-neutral-500 truncate">{longName}</h2>
                </div>
            </div>
            <h3 className="text-green-300 text-base w-20 text-end">
                {regularMarketPrice}{' '}
                <span className="text-neutral-300 text-xs">
                    {currency}
                </span>
            </h3>
        </article>
    )
}