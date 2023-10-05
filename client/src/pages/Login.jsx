import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import loginImage from "../assets/auth.jpg";

const Login = () => {

    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                toast.error(data.message);
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
            toast.error(error.message);
        }
    }



    return (
        <section>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">

                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img
                        src={loginImage}
                        alt="key"
                        className="w-full rounded-2xl h-[400px] hidden md:block"
                    />
                </div>

                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />

                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} placeholder='Password' className='border p-3 rounded-lg w-full' id='password' onChange={handleChange} />
                            {showPassword ? (
                                <AiFillEyeInvisible
                                    className="absolute right-3 top-3 text-xl cursor-pointer"
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                />
                            ) : (
                                <AiFillEye
                                    className="absolute right-3 top-3 text-xl cursor-pointer"
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                />
                            )}
                        </div>
                        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
                        <div className="flex items-center my-2 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                            <p className="text-center font-semibold mx-4">OR</p>
                        </div>
                        <OAuth />
                    </form>

                    <div className='flex gap-2 mt-5'>
                        <p>Don't have an account?</p>
                        <Link to={"/sign-up"}>
                            <span className="text-blue-700">SIGN UP</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;