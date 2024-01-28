interface SearchInputProps {
    search: string
    setSearch: (value: string) => void

}

export const SearchInput = ({search, setSearch}: SearchInputProps) => {
    return (
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-neutral-300 p-2 focus:outline-none" type="text" placeholder="Search..."
        />
    )
}