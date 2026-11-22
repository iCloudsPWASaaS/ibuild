// /impersonate-login
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getuserdata } from "../../api/baseapi";
import { USER_DASHBOARD_ROUTE } from "../../helper/routes";


const ImpersonateLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleLogin = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const token = params.get("token");
                if (!token) {
                    localStorage.removeItem("accessToken");
                    return navigate("/login");
                }

                // ✅ 1. Save token FIRST
                localStorage.setItem("accessToken", token);

                // ✅ 3. Call user API
                const res = await getuserdata(token);

                if (res?.user) {
                    // ✅ 4. Save user
                    localStorage.setItem("userData", JSON.stringify(res.user));
                    navigate(USER_DASHBOARD_ROUTE);

                } else {
                    localStorage.removeItem("accessToken");
                    return navigate("/login");
                }

            } catch (error: any) {

                localStorage.removeItem("accessToken");
                return navigate("/login");
            }
        };

        handleLogin();
    }, []);

    return null;
};

export default ImpersonateLogin;