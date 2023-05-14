import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {Link, useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button, Modal, Card} from "flowbite-react";
import RenderData from "../../components/RenderData.jsx";
import card_reader from "../../data/card_reader.js";
import {useState} from "react";
import useLoadData from "../../hooks/useLoadData.jsx";
import bus from "../../data/bus.js";
import Form from "../../components/Form.jsx";
import {toast} from "react-toastify";

const MyCard = ({className, update, data}) => {
    const [modal, setModal] = useState(false)
    const [allBus, isLoadAll] = useLoadData(bus.get({}), [])
    if (isLoadAll) {
        const choices = allBus.map(data => {return {value: data.bus_id, text: data.bus_name}})
        return (<>
            <Modal show={modal} className="rtl">
                <Modal.Body>
                    <Form inputs={[
                        {name: "ticket_price", type: "text", defaultValue: data.ticket_price, placeholder: "قیمت بلیط"},
                        {name: "bus_id", type: "select", defaultValue: data.bus_id, choices, required: false}
                    ]} btn="ویرایش" onSubmit={(value) => {
                        card_reader.editOne(data.card_reader_id, value).then(({data}) => {
                            if (data === "edited") {
                                setModal(false)
                                toast.success("با موفقیت ویرایش شد.")
                                update()
                            }
                            else toast.error("عملیات با مشکل مواجه شد.")
                        }).catch(err => toast.error("عملیات با مشکل مواجه شد."))
                    }
                    }/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={() => setModal(false)}>لفو</Button>
                </Modal.Footer>
            </Modal>
            <Card className={className}>
                <div className="flex justify-between w-full items-center">
                    <div>{data.card_reader_id}</div>
                    <div>{data.bus_name}</div>
                    <Button color="warning" onClick={() => setModal(true)}>ویرایش</Button>
                </div>
                <div>قیمت بلیط: {data.ticket_price}</div>
            </Card>
        </>)
    }else {
        return <Loading />
    }

}
const Devices = () => {
    const [allBus, isLoadAll] = useLoadData(bus.get({}), [])
    const navigate = useNavigate();
    const [isLogin, isLoad] = useAdminLogin();
    const [editAllModal, setEditAllModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [condition, setCondition] = useState({bus});
    if (isLoad && isLoadAll) {
        if (isLogin) {
            const choices = allBus.map(data => {return {value: data.bus_id, text: data.name}})
            return (
                <>
                    <Modal show={editAllModal}>
                        <Modal.Body><Form inputs={[
                            {name: "ticket_price", type: "text", defaultValue: "", placeholder: "قیمت بلیط"},
                        ]} btn="ویرایش همه" onSubmit={(value) => {
                            card_reader.edit(value, {})
                                .then(({data}) => {
                                    if (data) {
                                        setCondition({...condition})
                                        toast.success("دستگاه با موفقیت اضافه شد.")
                                        setEditAllModal(false)
                                    } else {
                                        toast.error("عملیات با خطا مواجه شد.")
                                    }
                                }).catch(() => toast.error("عملیات با خطا مواجه شد."))
                        }
                        }/></Modal.Body>
                        <Modal.Footer><Button color="failure" onClick={() => setEditAllModal(false)}>بستن</Button></Modal.Footer>
                    </Modal>
                    <Modal show={addModal}>
                        <Modal.Body>
                            <Form inputs={[
                                {name: "ticket_price", type: "text", defaultValue: "", placeholder: "قیمت بلیط"},
                                {name: "bus_id", type: "select", defaultValue: "", choices}
                            ]} btn="افزودن" onSubmit={(value) => {
                                    card_reader.add(value)
                                        .then(({data}) => {
                                            if (data) {
                                                setCondition({...condition})
                                                toast.success("دستگاه با موفقیت اضافه شد.")
                                                setAddModal(false)
                                            } else {
                                                toast.error("عملیات با خطا مواجه شد.")
                                            }
                                        }).catch(() => toast.error("عملیات با خطا مواجه شد."))
                            }
                            }/>
                        </Modal.Body>
                        <Modal.Footer><Button color="failure" onClick={() => setAddModal(false)}>بستن</Button></Modal.Footer>
                    </Modal>
                <div className="flex h-screen w-screen justify-center">
                    <BG/>
                    <div className="z-10 flex flex-col gap-2 m-2 w-full">
                        <Button className="w-full">
                            <Link to="/admin">بازگشت به پنل ادمین</Link>
                        </Button>
                        <Button color="success" onClick={()=>setAddModal(true)}>افزودن دستگاه</Button>
                        <Button color="warning" onClick={()=>setEditAllModal(true)}>ویرایش همه قیمت بلیط ها</Button>
                        <RenderData column={card_reader} condition={condition} Card={MyCard}/>
                    </div>
                </div>
                </>
            );
        } else {
            navigate("/admin")
            return <div></div>
        }
    } else {
        return <Loading/>
    }

};

export default Devices;
