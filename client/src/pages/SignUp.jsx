import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                toast.error(data.message);
                return;
            }
            setLoading(false);
            toast.success('Signup Successfully');
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);

        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
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
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
                <div className="flex items-center my-2 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                    <p className="text-center font-semibold mx-4">OR</p>
                </div>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={"/sign-in"}>
                    <span className="text-blue-700">SIGN IN</span>
                </Link>
            </div>
        </div>


    )
}

export default SignUp;