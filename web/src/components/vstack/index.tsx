interface VStackProps {
    children: React.ReactNode
    className?: string

}
export const VStack = ({ children, className }: VStackProps) => {
    return (
        <article className={`flex flex-col ${className}`}>
            {children}
        </article>
    )
}