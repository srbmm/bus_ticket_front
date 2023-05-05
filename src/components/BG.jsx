import busPicture from "../assets/bus.jpg";

const BG = () => {
    return (<>
        <div className="bg-slate-500 opacity-60 z-10 h-screen w-screen absolute"></div>
        <div className="absolute blur-sm">
            <img src={busPicture} className="h-screen w-screen object-cover"/>
        </div>
    </>);
};

export default BG;
