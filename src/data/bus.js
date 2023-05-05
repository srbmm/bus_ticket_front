import API from "../axios/api";
const all = ({likeName, name, is_active, id}) => {
    const temp = []
    if(id !== undefined) temp.push(`id=${id}`)
    if (likeName !== undefined) temp.push(`like_name=${likeName}`)
    if (name !== undefined) temp.push(`name=${name}`)
    if (is_active !== undefined) temp.push(`is_active=${is_active}`)
    return temp
}
const bus = new API('bus',{
    getCondition: all,
    editCondition: all,
    deleteCondition: all
});
export default bus;