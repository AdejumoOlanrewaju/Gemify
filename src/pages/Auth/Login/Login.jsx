import React, { useState } from 'react'
import BrandLogo from '/src/assets/svg/brand-logo.svg?react';
import GoogleLogo from '/src/assets/svg/google-icon.svg?react';
import { FiCheck } from 'react-icons/fi';
import { data, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS
import { Bounce } from 'react-toastify';
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [frmErrors, setFrmErrors] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getCSRFToken = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; csrftoken=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    };

    const handleFormErrs = () => {
        let formErrors = {};
        if (formData.email === "") formErrors.email = "Email is required";
        if (!formData.email.includes('@')) formErrors.email = "Please enter a valid email";
        if (formData.password === "") formErrors.password = "Password is required";
        if (formData.password.length < 6) formErrors.password = "Password must be at least 6 characters";
        return formErrors
    }

    const handleLogin = async (e) => {
        if (Object.keys(handleFormErrs()).length > 0) {
            let formErr = handleFormErrs()
            setFrmErrors(formErr)
            console.log(frmErrors)
            Object.values(frmErrors).forEach(err => {
                toast.error(err, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "dark",
                  transition: Bounce,
                })
              })
            return

        } else {
            setFrmErrors({})
            console.log(formData)
        }

        setLoading(true);
        const baseUrl = "http://goldapi-usnx.onrender.com/"
        const csrftoken = getCSRFToken()

        try {
            const response = await axios.post(`${baseUrl}login`,
                { data: formData },
                {
                    headers: {
                        'X-CSRFToken': csrftoken,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage(response.data.message);
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
              })
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
              })
            console.log(message)
        }

        setLoading(false);

    };

    return (
        
        <div className='lg:flex px-4 py-6 lg:h-screen'>
              <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                  />
            <div className='sm:px-4 lg:w-1/2'>
                <Link to="/" className='logo-container flex items-center gap-1'>
                    <BrandLogo stroke="gold" width={25} height={25} />
                    <span className='text-xl font-medium text-gray-700'>GEMIFY</span>
                </Link>

                <div className='lg:h-[calc(100vh-30px)] mt-16 lg:mt-0 flex flex-col justify-center'>
                    <div className='form-container mt-3 lg:w-[80%] lg:mx-auto'>
                        <h3 className='text-5xl font-semibold text-center'>Welcome back, Olivia</h3>
                        <p className='text-gray-500 text-center mt-4'> Please enter your details to proceed</p>
                        <div className="google-cta flex justify-center items-center gap-2 border border-gray-400 p-2 mt-6 rounded cursor-pointer hover:bg-gray-200">
                            <GoogleLogo width={20} height={20} />
                            <span className="font-semibold">Login with Google</span>
                        </div>
                        <div className="mt-6 relative flex justify-center items-center h-4">
                            <span className="h-[1px] w-full bg-gray-400 block "></span>
                            <span className="block absolute top-1/2 -translate-y-1/2 px-2 font-semibold bg-white">or</span>
                        </div>
                        <form action="" className="mt-6">
                            <div className="input-container mt-4">
                                <label className='after:content-["*"] after:absolute after:text-red-500' htmlFor="name">
                                    Email
                                </label>
                                <input name="email" value={formData.email} onChange={handleChange} className='border border-gray-400 block w-full mt-2 rounded py-2 px-3 placeholder:text-gray-500' type="email" placeholder='Enter your email' />
                            </div>

                            <div className="input-container mt-4">
                                <label className='after:content-["*"] after:absolute after:text-red-500' htmlFor="name">
                                    Password
                                </label>
                                <input name="password" value={formData.password} onChange={handleChange} className='border border-gray-400 block w-full mt-2 rounded py-2 px-3 placeholder:text-gray-500' type="password" placeholder='Enter your password' />
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3 justify-between">
                                <label htmlFor="term-check" className="flex items-center cursor-pointer  relative">
                                    <input type="checkbox" id="term-check" className="hidden peer" />

                                    {/* Checkbox Wrapper */}
                                    <div className="w-6 h-6 border border-gray-400 rounded flex justify-center items-center 
                        transition-all duration-300 peer-checked:bg-blue-500 peer-checked:border-blue-500">

                                        {/* Check Icon */}
                                    </div>
                                    <FiCheck className="w-4 h-4 text-white scale-0 absolute left-1 peer-checked:scale-100 transition-transform duration-300" />

                                    <span className="font-semibold ml-2">Remember in 30 days</span>
                                </label>

                                <Link to="/forgot_password" className='underline'>Forgot Password</Link>
                            </div>

                            <button type='button' onClick={handleLogin} className='bg-black text-white font-medium rounded-3xl px-2 py-3 mt-4 w-full active:scale-[.8] transition-transform duration-300 relative'>
                                {loading ? <div className='flex justify-center items-center'>
                                    <FiLoader className='animate-spin w-6 h-6 text-white' />
                                </div> : <span>Log in</span>}
                            </button>
                            <div className='flex gap-2 items-center mt-4'>
                                <p className='font-semibold'>Don't have an account? <Link to="/signup" className='text-green-800 hover:underline'>Sign up for free</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='lg:w-1/2 hidden p-2 pb-28 relative z-[1] overflow-hidden bg-[url("/src/assets/img/banner-1.jpg")] bg-cover bg-center h-full rounded-lg lg:flex flex-col justify-end items-center text-center'>
                <div className="absolute inset-0 -z-[1] bg-black/40"></div>
                <div className='lg:w-[85%]'>
                    <h4 className='text-[2.5rem] leading-tight text-white font-semibold mb-5'>Pure Gold, Timeless Value – Buy Raw & Crafted Gold with Confidence!</h4>
                    <p className='text-xl text-white/65'>From raw brilliance to masterful craftsmanship—secure your gold, secure your future.</p>
                </div>
            </div>
        </div>
    )
}

export default Login
