import API from "../axios/api";
const all = ({busId, likeNameStation, likeNearby, id, bus=false, station=false}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if(bus) temp.push(`bus=true`)
    if(station) temp.push(`station=true`)
    if (likeNameStation !== undefined) temp.push(`like_station_name=${likeNameStation}`)
    if (likeNearby !== undefined) temp.push(`like_nearby=${likeNearby}`)
    if (busId !== undefined) temp.push(`bus_id=${busId}`)
    return temp
}
const station_to_bus = new API('station_to_bus',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default station_to_bus;