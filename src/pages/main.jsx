import {Button} from "flowbite-react";
import {Link} from "react-router-dom";
import BG from "../components/BG.jsx";

const Main = () => {
    return (
        <>
            <div className="flex justify-around h-screen items-center">
               <BG />
                <Button color="dark" className="z-10">
                    <Link to="admin" className="text-2xl">
                        ورود مدیر
                    </Link>
                </Button>
                <Button className="z-10">
                    <Link to="client" className="text-2xl">
                        ورود کاربر
                    </Link>
                </Button>
            </div>
        </>

    );
};

export default Main;
