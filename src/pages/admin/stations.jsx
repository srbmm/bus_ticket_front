import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {Link, useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button, Card, Modal, TextInput} from "flowbite-react";
import RenderData from "../../components/RenderData.jsx";
import station from "../../data/station.js";
import {useState} from "react";
import Form from "../../components/Form.jsx";
import {toast} from "react-toastify";

const MyCard = ({data, className, update}) => {
    const [modal, setIsModal] = useState(false);

    return (<>
            <Modal show={modal} className="rtl">
                <Modal.Body>
                    <Form inputs={[
                        {name: "name", type: "text", defaultValue: data.station_name, placeholder: "نام ایستگاه"},
                        {
                            name: "nearby_places",
                            type: "text",
                            defaultValue: data.nearby_places,
                            placeholder: "مکان های نزدیک"
                        },
                    ]} btn="ویرایش" onSubmit={(value) => {
                        station.editOne(data.station_id, value).then(({data}) => {
                            if (data === "edited") {
                                update();
                                toast.success("با موفقیت ویرایش شد");
                                setIsModal(false);
                            } else {
                                toast.error("مشکلی در ویرایش کردن است.")
                            }
                        }).catch(err => {
                            toast.error("مشکلی در ویرایش کردن است.")
                        })
                    }}/>
                </Modal.Body>
                <Modal.Footer className="flex flex-col gap-2">
                    <Button color="failure" onClick={() => setIsModal(false)}>لغو</Button>
                </Modal.Footer>
            </Modal>
            <Card className={className}>
                <div className="flex justify-between">
                    {data.station_name} <Button color="warning" onClick={() => setIsModal(true)}>ویرایش</Button>
                </div>
            </Card>
        </>
    )
}
const Stations = () => {
    const [condition, setCondition] = useState({})
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [isLogin, isLoad] = useAdminLogin()
    const [isModal, setIsModal] = useState(false)
    if (isLoad) {
        if (isLogin) {
            return (
                <>
                    <Modal show={isModal}>
                        <Modal.Body>
                            <Form inputs={[
                                {name: "station_name", type: "text", defaultValue: "", placeholder: "نام ایستگاه"},
                                {name: "nearby_places", type: "text", defaultValue: "", placeholder: "مکان های نزدیک"},
                            ]} btn="افزودن" onSubmit={(value) => {
                                    station.add(value)
                                        .then(({data}) => {
                                            console.log(value)
                                            if (data) {
                                                setCondition({...condition})
                                                toast.success("ایستگاه با موفقیت اضافه شد.")
                                                setIsModal(false)
                                            } else {
                                                toast.error("عملیات با خطا مواجه شد.")
                                            }
                                        }).catch(() => toast.error("عملیات با خطا مواجه شد."))
                                }
                            }/>
                        </Modal.Body>
                        <Modal.Footer><Button color="failure" onClick={() => setIsModal(false)}>لغو</Button></Modal.Footer>
                    </Modal>
                    <div className="flex h-screen w-screen justify-center">
                        <BG/>
                        <div className="z-10 flex flex-col gap-2 m-2 w-full">
                            <Button className="w-full">
                                <Link to="/admin">بازگشت به پنل ادمین</Link>
                            </Button>
                            <TextInput placeholder="نام ایستگاه" className="mb-2" value={search} onChange={(e) => {
                                setSearch(e.target.value)
                                if (e.target.value) {
                                    setCondition({...condition, likeName: e.target.value})
                                } else {
                                    setCondition({...condition, likeName: undefined})
                                }
                            }}/>
                            <Button onClick={() => setIsModal(true)}>افزودن ایستگاه</Button>
                            <RenderData column={station} condition={condition} Card={MyCard}/>
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

export default Stations;
