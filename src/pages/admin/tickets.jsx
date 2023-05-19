import {DatePicker} from "react-advance-jalaali-datepicker";
import BG from "../../components/BG.jsx";
import {Button} from "flowbite-react";
import {Link} from "react-router-dom";
import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import {useEffect, useState} from "react";
import ticket from "../../data/ticket.js";
import Chart from "../../components/Chart.jsx";
import Select from "react-select";
import student from "../../data/student.js";
import bus from "../../data/bus.js";


const Tickets = () => {
    const [isLogin, isLoad] = useAdminLogin();
    const [condition, setCondition] = useState({bus: true})
    const [data, setData] = useState([])
    const [optionsStd, setOptionsStd] = useState([])
    const [optionsBus, setOptionsBus] = useState([])
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        const counter = {}
        data.forEach(item => {
            console.log(item)
            if (counter[item.bus_id] === undefined){
                counter[item.bus_id] = { count: 1, name: item.bus_name}
            }else {
                counter[item.bus_id].count += 1
            }
        })
        setChartData(Object.values(counter).map(item => {return {name: `${item.name} (${item.count})`, count: item.count}}))
    },[data])
    useEffect(() => {
        student.get({}).then(({data}) => {
            setOptionsStd(data.map(student => {
                    return ({
                        value: student.std_id, label: <div className="flex justify-between">
                            <div>{student.std_id}</div>
                            <div>{student.first_name} {student.last_name}</div>
                        </div>
                    })
                }
            ))
            setOptionsStd(data.map(student => {
                    return ({
                        value: student.std_id, label: <div className="flex justify-between">
                            <div>{student.std_id}</div>
                            <div>{student.first_name} {student.last_name}</div>
                        </div>
                    })
                }
            ))
        })
        bus.get({}).then(({data}) => {
                setOptionsBus(data.map(bus => {
                    return ({
                        value: bus.bus_id, label: <div className="flex justify-between">
                            <div>{bus.bus_id}</div>
                            <div>{bus.bus_name}</div>
                        </div>
                    })
                }))
        })
    }, [])

    useEffect(() => {
        ticket.get(condition).then(({data}) => {
            setData(data)
        })
    }, [condition]);
    const navigate = useNavigate();
    if (isLoad) {
        if (isLogin) {
            return (
                <div className="flex h-screen w-screen justify-center">
                    <BG/>
                    <div className="z-10 flex flex-col gap-2 m-2 w-full">
                        <Button className="">
                            <Link to="/admin">بازگشت به پنل ادمین</Link>
                        </Button>
                        <div className="rtl flex gap-6 justify-around">
                            <DatePicker
                                placeholder="تاریخ شروع"
                                format="jYYYY/jMM/jDD"
                                onChange={(value) => {
                                    if (value) setCondition({...condition, startTime: Number(new Date(value)) * 1000})
                                    else setCondition({...condition, startTime: undefined})
                                }}
                                id="datePicker"
                                preSelected=""
                            />
                            <DatePicker
                                placeholder="تاریخ پایان"
                                format="jYYYY/jMM/jDD"
                                onChange={(value) => {
                                    if (value) setCondition({...condition, endTime: Number(new Date(value)) * 1000})
                                    else setCondition({...condition, endTime: undefined})
                                }}
                                id="datePicker"
                                preSelected=""
                            />
                        </div>
                        <div className="flex justify-around">
                            <Select options={optionsStd} className="w-96" onChange={val => {
                                setCondition({...condition, stdId: val.value})
                            }}/>
                            <Select options={optionsBus} className="w-96" onChange={val => {
                                setCondition({...condition, busId: val.value})
                            }}/>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-white p-5 m-2  rounded-lg">
                                <Chart data={chartData}/>
                            </div>
                        </div>
                    </div>
                </div>

            );
        } else {
            navigate("/admin")
            return <div></div>;
        }
    } else {
        return <Loading/>;
    }
}

export default Tickets;
