import {useState} from "react";
import {Card, Pagination} from "flowbite-react";
import useLoadData from "../hooks/useLoadData.jsx";
import Loading from "./Loading.jsx";
import {NUMBERS_IN_PAGE} from "../constants/NUMBERS.js";
const RenderData = ({column, Card, condition, orderBy="", reverse="ASC"}) => {
    const [page, setPage] = useState(1);
    const [toggle, setToggle] = useState(false);
    const updateData = () => {
        setToggle(!toggle)
    }
    const [data, isLoad] = useLoadData(column.get(condition, page, NUMBERS_IN_PAGE, orderBy, reverse), [page, condition, toggle, orderBy, reverse])
    if (isLoad) {
        let render = []
        if (data.countAll) render = data.query.map(item => <Card data={item} update={updateData} className="basis-1/4"/>)
        return (
            <>
                <div className="flex flex-col items-center gap-2" style={{overflow: "auto"}}>
                    <div className="flex flex-wrap gap-2 justify-center w-full rtl">
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