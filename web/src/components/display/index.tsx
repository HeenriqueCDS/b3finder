interface DisplayProps {
    value: string
    label: string
    isFull?: boolean
}

export const Display = ({label, value, isFull}: DisplayProps) => {
    const width = isFull ? 'w-full' : 'w-[calc(50%-0.5rem)]'
    return (
        <article className={`flex flex-col border-2 py-4 border-neutral-900 rounded-md items-center justify-center ${width}`}>
            <h4 className="text-base text-neutral-500">{label}</h4>
            <span className="text-base">{value}</span>
        </article>
    )
}