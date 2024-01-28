type FilterOptions = '1wk' | '1mo' | '3mo'

interface ButtonProps {
    state: string
    onClick: (value : FilterOptions) => void
    value: FilterOptions
}

export const Button = ({ state, onClick, value }: ButtonProps) => {
    return (
        <button
            className="rounded-md transition-all border-2 border-neutral-900 hover:border-[#8884d8] w-16 h-10 flex items-center justify-center p-4 disabled:bg-[#8884d8] disabled:text-neutral-50"
            disabled={state === value}
            onClick={() => onClick(value)}
        >
            {value}
        </button>
    )
}