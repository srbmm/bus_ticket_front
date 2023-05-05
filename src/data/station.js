import API from "../axios/api";
const all = ({likeName, likeNear, busId, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (likeName !== undefined) temp.push(`like_name=${likeName}`)
    if (likeNear !== undefined) temp.push(`like_near=${likeNear}`)
    if (busId !== undefined) temp.push(`bus_id=${busId}`)
    return temp
}
const station = new API('station',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default station;