import { MagnifyingGlass } from "@phosphor-icons/react"

export const SearchButton = () => {
    return (
        <button className="bg-transparent text-neutral-300 p-2 border-l-2 border-l-neutral-900 min-w-10 flex justify-center items-center">
            <MagnifyingGlass className="text-neutral-700  w-5 h-5" />
        </button>
    )
}