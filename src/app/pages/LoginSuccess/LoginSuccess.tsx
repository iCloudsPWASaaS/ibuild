import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getuserdata } from "../../../api/baseapi";
import { toast } from "react-toastify";
import { messageData } from "../../../helper/data";
import { USER_DASHBOARD_ROUTE } from "../../../helper/routes";

const LoginSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const handleLogin = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const token = params.get("token");
                if (!token) {
                    setStatus("error");
                    toast.error("Invalid login attempt");
                    return navigate("/login");
                }

                // ✅ 1. Save token FIRST
                localStorage.setItem("accessToken", token);

                // ✅ 3. Call user API
                const res = await getuserdata(token);

                if (res?.user) {
                    if (res.user.status === 0) {
                        toast.error("Your account has been banned. Please contact support.");
                        localStorage.removeItem("accessToken");
                        setStatus("error");
                        return navigate("/login");
                    }

                    // ✅ 4. Save user
                    localStorage.setItem("userData", JSON.stringify(res.user));

                    setStatus("success");

                    // ✅ 5. Redirect
                    setTimeout(() => {
                        navigate(USER_DASHBOARD_ROUTE);
                    }, 500);

                } else {
                    throw new Error(res?.message || messageData?.error3);
                }

            } catch (error:any) {

                localStorage.removeItem("accessToken");

                setStatus("error");
                toast.error(error?.message || messageData?.error3);

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        };

        handleLogin();
    }, [location.search]);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-[350px]">

                {status === "loading" && (
                    <>
                        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                        <h2 className="mt-4 text-lg font-semibold">Logging you in...</h2>
                        <p className="text-gray-500 text-sm">Please wait</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="text-red-500 text-5xl">✖</div>
                        <h2 className="mt-4 text-lg font-semibold">Login Failed</h2>
                        <p className="text-gray-500 text-sm">Redirecting...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="text-green-500 text-5xl">✔</div>
                        <h2 className="mt-4 text-lg font-semibold">Login Successful</h2>
                        <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
                    </>
                )}

            </div>
        </div>
    );
};

export default LoginSuccess;