import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button, Card, Select, TextInput, ToggleSwitch} from "flowbite-react";
import {Link} from "react-router-dom";
import RenderData from "../../components/RenderData.jsx";
import bus from "../../data/bus.js";
import {useState} from "react";
const MyCard = ({data, update}) => {
    const [change, setChange] = useState(data.is_active);
    return (<Card className="w-96"><div><div className="flex gap-2 items-center justify-between">{data.name}
        <span><ToggleSwitch
        checked={change}
        label={change? "✔️": "❌"}
        onChange={(value) => {
            bus.editOne(data.bus_id, {is_active: value}).then(isOk => setChange(value))
            update()
        }}
    />
    </span></div></div></Card>)
}
const Buses = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isLogin, isLoad]= useAdminLogin();
    const [selectVal, setSelectVal]= useState("all");
    const [condition, setCondition] = useState({});
    if (isLoad){
        if (isLogin){
            return (
                <div className="flex h-screen w-screen justify-center">
                    <BG />
                    <div className="z-10 flex flex-col gap-2 m-2 items-center">
                        <Button className="w-96">
                            <Link to="/admin">بازگشت به پنل ادمین</Link>
                        </Button>
                        <div>
                            <TextInput placeholder="نام اتوبوس" className="mb-2" value={search} onChange={(e) => {
                                setSearch(e.target.value)
                                if (e.target.value){
                                    setCondition({...condition, likeName: e.target.value})
                                }else {
                                    setCondition({...condition, likeName: undefined})
                                }
                            }}/>
                            <div id="select" className="w-96">
                                <Select
                                    id="value"
                                    value={selectVal}
                                    onChange={e => {
                                        if(e.target.value === "all"){
                                            setCondition({...condition, isActive: undefined})
                                        }else if(e.target.value === "active"){
                                            setCondition({...condition,is_active: true})
                                        }else if(e.target.value === "disabled"){
                                            setCondition({...condition,is_active: false})
                                        }
                                        setSelectVal(e.target.value)
                                    }}
                                >
                                    <option value="all">
                                        همه
                                    </option>
                                    <option value="active">
                                        فعال
                                    </option>
                                    <option value="disabled">
                                        غیر فعال
                                    </option>
                                </Select>
                            </div>
                        </div>
                        <RenderData column={bus} condition={condition} name="اتوبوس" Card={MyCard}/>
                    </div>
                </div>
            );
        }else {
            navigate("/admin")
            return <div></div>
        }
    }else {
        return <Loading />
    }

};

export default Buses;
