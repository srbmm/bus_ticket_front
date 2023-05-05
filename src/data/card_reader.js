import API from "../axios/api";
const all = ({driverId, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (driverId !== undefined) temp.push(`driver_id=${driverId}`)
    return temp
}
const cardReader = new API('card_reader',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default cardReader;