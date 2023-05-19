import {useState} from "react";
import {UserContext} from "./context/UserContext.js";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "./pages/main"
import "./App.css"
import Admin from "./pages/admin/auth";
import Client from "./pages/client/auth";
import ClientCharge from "./pages/client/charge";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Students from "./pages/admin/students.jsx";
import Devices from "./pages/admin/devices.jsx";
import Buses from "./pages/admin/buses.jsx";
import Stations from "./pages/admin/stations.jsx";
import Tickets from "./pages/admin/tickets.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/admin",
        element: <Admin/>,
    },
    {
        path: "/admin/students",
        element: <Students />,
    },
    {
        path: "/admin/buses",
        element: <Buses />,
    },
    {
        path: "/admin/devices",
        element: <Devices />,
    },
    {
        path: "/admin/stations",
        element: <Stations />,
    },
    {
        path: "/admin/tickets",
        element: <Tickets />,
    },
    {
        path: "/client",
        element: <Client/>,
    },
    {
        path: "/charge",
        element: <ClientCharge/>,
    }
]);
let temp = window.localStorage.getItem('student');
if (temp) {
    temp = JSON.parse(temp)
}else {
    temp = {}
}
let temp2 = window.localStorage.getItem('admin');
if (temp2) {
    temp2 = JSON.parse(temp2)
}else {
    temp2 = {}
}
const App = () => {
    const [student, setStudent] = useState(temp);
    const [admin, setAdmin] = useState(temp2);
    return (
        <>
            <UserContext.Provider value={{student, admin, setStudent, setAdmin}}>
                <ToastContainer
                    position="bottom-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <RouterProvider router={router}/>
            </UserContext.Provider>
        </>
    )
}
export default App;
