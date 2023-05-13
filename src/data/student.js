import API from "../axios/api";
const all = ({likeNumber, minBalance, maxBalance, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (likeNumber !== undefined) temp.push(`like_number=${likeNumber}`)
    if (minBalance !== undefined) temp.push(`minbalacne=${minBalance}`)
    if (maxBalance !== undefined) temp.push(`maxbalance=${maxBalance}`)
    return temp
}
const student = new API('student',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default student;