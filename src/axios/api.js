import myAxios from "./axios";

class API{
    constructor(address, {getCondition= () => [], editCondition = () => [], removeCondition = () => []}) {
        this.address = address;
        this.getCondition = getCondition;
        this.editCondition = editCondition;
        this.removeCondition = removeCondition;
    }
    get(condition, page, count = 10, orderBy="", reverse="ASC"){
        condition = this.getCondition(condition).join("&")
        if (page) condition += "&page=" + String(page) + "&count=" + String(count)
        if (orderBy) condition += "&order_by=" + String(orderBy) + "&count=" + String(reverse)
        if (condition) condition = '?' + condition
        return myAxios.get(this.address + condition)
    }
    edit(data,condition){
        condition = this.editCondition(condition).join("&")
        if (condition) condition = '?' + condition
        return myAxios.put(this.address + condition, data)
    }
    remove(condition){
        condition = this.removeCondition(condition).join("&")
        if (condition) condition = '?' + condition
        return myAxios.delete(this.address + condition)
    }
    add(data){
        return myAxios.post(this.address, data)
    }
    getOne(id){
        return myAxios.get(this.address + '/' + id)
    }
    editOne(id,data){
        return myAxios.put(this.address + '/' + id, data)
    }
    deleteOne(id){
        return myAxios.delete(this.address + '/' + id)
    }
    login(username, password){
        return myAxios.post(this.address + '/login', {username, password})
    }
}

export default API;