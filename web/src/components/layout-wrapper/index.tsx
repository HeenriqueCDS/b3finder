import { Header } from "../header";

interface  LayoutWrapperProps {
    children?: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    return (
        <div className="h-screen w-screen text-neutral-300 bg-neutral-950 overflow-hidden ">
            <Header/>
            {children}
        </div>
    )
};