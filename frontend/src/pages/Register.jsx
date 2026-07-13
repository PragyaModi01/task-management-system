import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Register = () => {

    const { error, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {

         const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
        navigate("/login");
    }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h2>

                <input
                    placeholder="Name"
                    className="w-full border p-3 rounded mb-3"
                    {...register("name")}
                />

                <input
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-3"
                    {...register("email")}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-3"
                    {...register("password")}
                />

                {
    error && (
        <p className="text-red-500 text-sm mb-3">
            {error}
        </p>
    )
}
                <button className="w-full bg-green-600 text-white p-3 rounded">
                    Register
                </button>

                <p className="text-center mt-5">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600"
                    >
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Register;