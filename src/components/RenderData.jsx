import {useState} from "react";
import {Card, Pagination} from "flowbite-react";
import useLoadData from "../hooks/useLoadData.jsx";
import Loading from "./Loading.jsx";

const RenderData = ({column, Card}) =>{
    const [page, setPage] = useState(1);
    const [data, isLoad] = useLoadData(column.get({}, page, 3), [page])
    if(isLoad){
        const render = data.query.map(item => <Card data={item}/>)
        return (<div>
            <div>
                {...render}
                <Pagination
                    currentPage={page}
                    onPageChange={val => setPage(val)}
                    showIcons={true}
                    nextLabel="بعدی"
                    previousLabel="قبلی"
                    totalPages={Math.ceil(data.countAll/3)}
                />
            </div>
        </div>)
    }else {
        return <Loading />
    }
}
export default RenderData;