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
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [data, isLoad] = useLoadData(column.get(condition, page, NUMBERS_IN_PAGE), [page, condition, toggle])
    if (isLoad) {
        let render = []
        if (data.countAll) render = data.query.map(item => <Card data={item} update={updateData}/>)
        return (
            <>
                <Modal show={isOpenModal}>
                    <Modal.Body>
                        <div className="space-y-6 rtl">
                            <h1>افزودن {name} جدید</h1>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            تست ۱
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            تست ۲
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="rtl">
                        <Button color="failure" onClick={() => {
                            setIsOpenModal(false)
                        }}>بستن</Button>
                    </Modal.Footer>
                    </Modal>
                <div className="flex flex-col gap-2">
                    <Button className="w-96" onClick={() => setIsOpenModal(true)}>افزودن {name}</Button>
                    {...render}
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