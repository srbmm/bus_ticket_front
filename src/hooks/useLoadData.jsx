import {useEffect, useState} from "react";

const useLoadData = (req, effects) => {
    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        setIsLoad(false);
        req.then((res) => setData(res.data)).finally(() => setIsLoad(true))
    }, effects)
    return [data, isLoad]
}
export default useLoadData;