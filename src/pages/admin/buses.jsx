import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button, Card, TextInput, ToggleSwitch, Modal} from "flowbite-react";
import {Link} from "react-router-dom";
import RenderData from "../../components/RenderData.jsx";
import bus from "../../data/bus.js";
import {useState} from "react";
import Form from "../../components/Form.jsx";
import {toast} from "react-toastify";
import Select from "react-select"
import useLoadData from "../../hooks/useLoadData.jsx";
import station from "../../data/station.js";
import station_to_bus from "../../data/station_to_bus.js";

const MyCard = ({data, update, className}) => {
    const [change, setChange] = useState(data.is_active);
    const [modal, setIsModal] = useState(false);
    const [isModalStation, setIsModalStation] = useState(false);
    const [stations, isLoadStations] = useLoadData(station.get({}), [])
    const [stationChoice, isLoadStationChoice] = useLoadData(station_to_bus.get({busId: data.bus_id}), [])
    if (isLoadStations && isLoadStationChoice) {
        const selected = []
        const options = stations.map(station => {
               const choice = {value: station.station_id, label: station.station_name}
               if (stationChoice.find(item => item.station_id === station.station_id)){
                   selected.push(choice)
               }
               return choice
            })
        return (<>
            <Modal show={isModalStation}>
                <Modal.Body>
                    <Select onChange={val => {
                        if (selected.length > val.length){
                            const dif = selected.find(itemSelect => val.find(itemVal => itemVal.value === itemSelect.value) === undefined)
                            const item = stationChoice.find((item)=> item.station_id === dif.value)
                            station_to_bus.deleteOne(item.stations_to_buses).then(({data}) => {
                                if (data === "deleted"){
                                    toast.success("با موفقیت حذف شد")
                                    update()
                                }else {
                                    toast.error("درخواست شما با مشکلی مواجه شده است")
                                }
                            }).catch(err => {
                                toast.error("درخواست شما با مشکلی مواجه شده است")
                            })
                        }else if (selected.length < val.length) {
                            const dif = val.find(itemVal => selected.find(itemSelect => itemVal.value === itemSelect.value) === undefined)
                            station_to_bus.add({station_id: dif.value, bus_id: data.bus_id}).then(({data}) => {
                                console.log({station_id: dif.value, bus_id: dif.value})
                                if (data){
                                    toast.success("ایستگاه با موفقیت اضافه شد")
                                    update()
                                }else {
                                    toast.error("درخواست شما با مشکلی مواجه شده است")
                                }
                            }).catch(err => {
                                toast.error("درخواست شما با مشکلی مواجه شده است")
                            })
                        }
                    }} defaultValue={selected} options={options}  isMulti />
                </Modal.Body>
                <Modal.Footer className="rtl">
                    <Button color="failure" onClick={() => {
                        setIsModalStation(false)
                    }}>بستن</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={modal}>
                <Modal.Body className="flex flex-col gap-2">
                    <Form inputs={[
                        {name: "name", type: "text", defaultValue: data.bus_name, placeholder: "نام اتوبوس"},
                    ]} btn="ویرایش" onSubmit={(value) => {
                        bus.editOne(data.bus_id, value).then(({data}) => {
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
                <Modal.Footer><Button color="failure" onClick={() => setIsModal(false)}>لغو</Button></Modal.Footer></Modal>
            <Card className={className}>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center justify-between">
                        <div>{data.bus_name}</div>
                        <Button color="warning" onClick={() => setIsModal(true)}>ویرایش اتوبوس</Button>
                        <span><ToggleSwitch
                            className="ltr"
                            checked={change}
                            label={change ? "✔️" : "❌"}
                            onChange={(value) => {
                                bus.editOne(data.bus_id, {is_active: value}).then(isOk => setChange(value))
                                update()
                            }}
                        /></span>
                    </div>
                    <Button color="warning" onClick={() => setIsModalStation(true)}>ویرایش ایستگاه</Button>
                </div>
            </Card>
        </>)
    }else {
        return <Loading />
    }
}

const BusSelect = [{value:"all", label:"همه"},
    {value: "active", label: "فعال"}, {value: "disabled", label: "غیرفعال"}]
const Buses = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isLogin, isLoad] = useAdminLogin();
    const [condition, setCondition] = useState({});
    if (isLoad) {
        if (isLogin) {
            return (
                <>
                    <Modal show={isOpenModal}>
                        <Modal.Body>
                            <div className="space-y-6 rtl">
                                <Form inputs={[
                                    {name: "bus_name", type: "text", defaultValue: "", placeholder: "نام اتوبوس"},
                                ]} btn="افزودن" onSubmit={(value) => {
                                    value.is_active = false;
                                    bus.add(value)
                                        .then(({data}) => {
                                            if (data) {
                                                setCondition({...condition})
                                                toast.success("اتوبوس با موفقیت اضافه شد.")
                                                setIsOpenModal(false)
                                            } else {
                                                toast.error("عملیات با خطا مواجه شد.")
                                            }
                                        }).catch((err) => {
                                        toast.error("عملیات با خطا مواجه شد.")
                                    })
                                }
                                }/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="rtl">
                            <Button color="failure" onClick={() => {
                                setIsOpenModal(false)
                            }}>لغو</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="flex h-screen w-screen justify-center">
                        <BG/>
                        <div className="z-10 flex flex-col gap-2 m-2 w-full">
                            <Button className="">
                                <Link to="/admin">بازگشت به پنل ادمین</Link>
                            </Button>
                            <div>
                                <TextInput placeholder="نام اتوبوس" className="mb-2" value={search} onChange={(e) => {
                                    setSearch(e.target.value)
                                    if (e.target.value) {
                                        setCondition({...condition, likeName: e.target.value})
                                    } else {
                                        setCondition({...condition, likeName: undefined})
                                    }
                                }}/>
                                    <Select defaultValue={BusSelect[0]} onChange={e => {
                                        if (e.value === "all") {
                                            setCondition({...condition, is_active: undefined})
                                        } else if (e.value === "active") {
                                            setCondition({...condition, is_active: true})
                                        } else if (e.value === "disabled") {
                                            setCondition({...condition, is_active: false})
                                        }
                                    }}
                                            options={BusSelect}/>
                            </div>
                            <Button className="w-full" onClick={() => setIsOpenModal(true)}>افزودن اتوبوس</Button>
                            <RenderData column={bus} condition={condition} Card={MyCard}/>
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

export default Buses;
