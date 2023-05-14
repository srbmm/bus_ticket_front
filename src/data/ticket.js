import API from "../axios/api";
const all = ({busId, stdId, startTime, endTime,id, student=false, bus=false}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if(student) temp.push(`student=true`)
    if(bus) temp.push(`bus=true`)
    if (busId !== undefined) temp.push(`bus_id=${busId}`)
    if (stdId !== undefined) temp.push(`std_id=${stdId}`)
    if (startTime !== undefined) temp.push(`start_time=${startTime}`)
    if (endTime !== undefined) temp.push(`end_time=${endTime}`)
    return temp
}
const ticket = new API('ticket',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default ticket;