import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, token, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Mini Jira
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-3"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />

                <p className="text-red-500 text-sm">
                    {errors.email?.message}
                </p>

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mt-3"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />

                <p className="text-red-500 text-sm">
                    {errors.password?.message}
                </p>

                {error && (
                    <p className="text-red-500 mt-3">
                        {error}
                    </p>
                )}

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded mt-5"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-5 text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600"
                    >
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Login;