import { useNavigate } from 'react-router-dom'
import { SearchInput } from "../search-input"


export const Header = () => {
    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate('/')
    }
    return (
        <header className="w-screen p-4 border-b-neutral-900 border-b-2 flex flex-col gap-4 sm:flex-row sm:justify-between cursor-pointer">
            <h1 className="text-3xl text-neutral-400" onClick={() => handleLogoClick()}><span className="text-green-400">[B]</span><span className="text-yellow-400">³</span> Finder</h1>
            <SearchInput />
        </header>
    )
}