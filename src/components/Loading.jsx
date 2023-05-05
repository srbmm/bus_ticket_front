import "./Loading.css"
const Loading = () => {
    return (<div className="flex h-screen w-screen items-center justify-center">
        <div>
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    </div>)
}

export default Loading;