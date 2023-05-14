import Link from "../components/Link.jsx";
import BG from "../components/BG.jsx";
import {useState} from "react";
import GreenCard from "../components/GreenCard.jsx";
import YellowCard from "../components/YellowCard.jsx";
import station_to_bus from "../data/station_to_bus.js";

const Main = () => {
    const [search, setSearch] = useState("")
    const [mainTags, setMainTags] = useState([])
    const [nearTags, setNearTags] = useState([])
    return (
        <>
            <div className="flex justify-around h-screen items-center flex-col">
                <BG/>
                <div className="z-10 w-full flex items-center flex-col overflow-x-auto overflow-y-auto ">
                    <div className="flex gap-6">
                        <Link to="admin" className="text-2xl" type="dark">
                            <label className="text-2xl">
                                ورود مدیر
                            </label>
                        </Link>
                        <Link to="client">
                            <label className="text-2xl">
                                ورود کاربر
                            </label>
                        </Link>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full md:w-2/4 rtl m-t-2 z-20">
                            <input className="w-full p-2 rounded-t focus:outline-none focus:bg-gray-200" value={search} onChange={e => {
                                setSearch(e.target.value)
                                if (!e.target.value) {
                                    setMainTags([])
                                    setNearTags([])
                                } else {
                                    setMainTags([])
                                    setNearTags([])
                                    station_to_bus.get({
                                        likeNameStation: e.target.value,
                                        station: true,
                                        bus: true
                                    }).then(({data}) => {
                                        setMainTags(data.map((item) => <GreenCard data={item}/>))
                                    })
                                    station_to_bus.get({
                                        likeNearby: e.target.value,
                                        station: true,
                                        bus: true
                                    }).then(({data}) => {
                                        setNearTags(data.map((item) => <YellowCard data={item}/>))
                                    })
                                }
                            }} placeholder="از کجا میخوایی سوار شی؟"/>
                        </div>
                        {mainTags.length || nearTags.length ?
                            <div
                                className="flex flex-col absolute m-10 gap-1 w-full md:w-2/4 overflow-x-auto overflow-y-auto bg-gray-200 p-2 rounded-b-xl max-h-50">
                                {...mainTags}
                                {...nearTags}
                            </div> : ""}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Main;
