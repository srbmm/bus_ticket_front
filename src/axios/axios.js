import axios from "axios";
import {api_address} from "./constant";

const myAxios = axios.create({
    baseURL: api_address,
    headers: {
        'Authorization': 'Bearer myToken',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
}
});

export default myAxios