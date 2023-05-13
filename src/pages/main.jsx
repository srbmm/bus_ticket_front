import Link from "../components/Link.jsx";
import BG from "../components/BG.jsx";
import {TextInput} from "flowbite-react";
import {useState} from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import station from "../data/station.js";
import Loading from "../components/Loading.jsx";
import station_to_bus from "../data/station_to_bus.js";
import GreenCard from "../components/GreenCard.jsx";
import YellowCard from "../components/YellowCard.jsx";

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
                        <Link to="client" >
                            <label className="text-2xl">
                                ورود کاربر
                            </label>
                        </Link>
                    </div>
                    <div className="w-full md:w-2/4 rtl m-2"><TextInput value={search} onChange={e => {
                        setSearch(e.target.value)
                        if (!e.target.value){
                            setMainTags([])
                            setNearTags([])
                        }else {
                            setMainTags([])
                            setNearTags([])
                            console.log(e.target.value)
                            station.get({likeName: e.target.value}).then(({data}) => {
                                console.log(data)
                             setMainTags([...mainTags, <GreenCard data={data} />])
                            })
                            station.get({likeNear: e.target.value}).then(({data}) => {
                                setNearTags([...nearTags, <YellowCard data={data} />])
                            })
                        }
                    }} placeholder="از کجا میخوایی سوار شی؟"/></div>
                    <div className="flex flex-col gap-1 w-full md:w-2/4 overflow-x-auto overflow-y-auto">
                        {...mainTags}
                        {...nearTags}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Main;
