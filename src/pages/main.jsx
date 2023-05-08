import Link from "../components/Link.jsx";
import BG from "../components/BG.jsx";

const Main = () => {
    return (
        <>
            <div className="flex justify-around h-screen items-center">
                <BG/>
                <div className="z-10 flex gap-6">
                    <Link to="admin" className="text-2xl" type="dark">
                        <label className="text-2xl">
                        ورود مدیر
                        </label>
                    </Link>
                    <Link to="client" >
                        <label className="text-2xl">
                            ورود کاربر
                        </label>
                    </Link>
                </div>

            </div>
        </>

    );
};

export default Main;
