import { ScaleLoader } from "react-spinners"
interface LoadingProps {
    loading: boolean
}

export const Loading = ({loading}: LoadingProps) => {
    const rendededClassName = "flex absolute top-0 left-0 z-50 justify-center items-center w-full h-full bg-black opacity-80"
    const hiddenClassName = "display-none hidden"
    return (
        <div className={loading ? rendededClassName : hiddenClassName} >
            <ScaleLoader color="#fff" loading={loading} />
        </div>
    )
}