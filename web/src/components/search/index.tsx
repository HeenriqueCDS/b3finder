import { useState } from "react"
import { useQuotes } from "../../hooks/use-quotes"
import { SearchButton } from "./button"
import { SearchInput } from "./input"
import { SearchList } from "./search-list"

export const Search = () => {
    const [search, setSearch] = useState<string>('')
    const showSearchList = search.length > 1
    const { data } = useQuotes()

    return (
        <div className="flex rounded-md border-neutral-900 border-2 justify-between max-w-80 relative">
            <SearchInput search={search} setSearch={setSearch} />
            <SearchButton />
            {showSearchList &&
                <SearchList data={data!} search={search} />
            }
        </div>
    )
}