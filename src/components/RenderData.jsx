import {useState} from "react";
import {Card, Pagination, Button, Modal} from "flowbite-react";
import useLoadData from "../hooks/useLoadData.jsx";
import Loading from "./Loading.jsx";
import {NUMBERS_IN_PAGE} from "../constants/NUMBERS.js";

const RenderData = ({column, Card, condition, name}) => {
    const [page, setPage] = useState(1);
    const [toggle, setToggle] = useState(false);
    const updateData = () => {
        setToggle(!toggle)
    }
    const [data, isLoad] = useLoadData(column.get(condition, page, NUMBERS_IN_PAGE), [page, condition, toggle])
    if (isLoad) {
        let render = []
        if (data.countAll) render = data.query.map(item => <Card data={item} update={updateData} className="basis-1/4"/>)
        return (
            <>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap gap-2 justify-center w-full">
                        {...render}
                    </div>
                    {data.countAll ? <Pagination
                        currentPage={page}
                        onPageChange={val => setPage(val)}
                        showIcons={true}
                        nextLabel="بعدی"
                        previousLabel="قبلی"
                        totalPages={Math.ceil(data.countAll / NUMBERS_IN_PAGE)}
                    /> : ""}
                </div>
            </>
        )

    } else {
        return <Loading/>
    }
}
export default RenderData;