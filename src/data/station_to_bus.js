import API from "../axios/api";
const all = ({driverId, busId, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (busId !== undefined) temp.push(`bus_id=${busId}`)
    if (driverId !== undefined) temp.push(`driver_id=${driverId}`)
    return temp
}
const station_to_bus = new API('station_to_bus',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default station_to_bus;