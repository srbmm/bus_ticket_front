import API from "../axios/api";
const all = ({likeNumber, stdNumber, minBalance, maxBalance, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (likeNumber !== undefined) temp.push(`like_number=${likeNumber}`)
    if (stdNumber !== undefined) temp.push(`std_number=${stdNumber}`)
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