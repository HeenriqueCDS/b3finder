import { SearchButton } from "./button"
import { SearchInput } from "./input"

interface SearchProps {  
    search: string
    setSearch: (value: string) => void

}

export const Search = ({search, setSearch}: SearchProps) => {

    return (
        <div className="flex rounded-md border-neutral-900 border-2 justify-between max-w-80 relative">
            <SearchInput search={search} setSearch={setSearch} />
            <SearchButton />
        </div>
    )
}