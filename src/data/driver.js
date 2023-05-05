import API from "../axios/api";
const all = ({likeName, username, minBalance, maxBalance, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (likeName !== undefined) temp.push(`like_name=${likeName}`)
    if (username !== undefined) temp.push(`username=${username}`)
    if (minBalance !== undefined) temp.push(`minbalacne=${minBalance}`)
    if (maxBalance !== undefined) temp.push(`maxbalance=${maxBalance}`)
    return temp
}
const driver = new API('driver',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default driver;