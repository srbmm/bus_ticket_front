import API from "../axios/api";
const all = ({busId, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (busId !== undefined) temp.push(`bus_id=${busId}`)
    return temp
}
const cardReader = new API('card_reader',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default cardReader;