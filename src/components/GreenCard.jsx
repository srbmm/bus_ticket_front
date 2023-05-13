import station_to_bus from "../data/station_to_bus.js";
import useLoadData from "../hooks/useLoadData.jsx";
import Loading from "./Loading.jsx";
import {useState} from "react";
import bus from "../data/bus.js";

const GreenCard = ({data}) => {
    const [busesId, isLoadBusesId] = useLoadData(station_to_bus.get({stationId: data.station_id}), [])
    let requested = false
    const [names, setNames] = useState([])
    if (isLoadBusesId) {
        if (!requested) {
            busesId.forEach(item => {
                bus.getOne(item.bus_id).then(({data}) => {
                    setNames([...names, data.name])
                })
            })
            requested = true
        }
    return (
            <div className="bg-green-300 text-gray-700 p-1 rounded">
                <div className="flex justify-between">
                    <div>اتوبوس ها: {names.join(", ")}</div>
                    <div>نام ایستگاه: {data.name}</div>
                </div>
            </div>);
    }
    else return <Loading />
};

export default GreenCard;
