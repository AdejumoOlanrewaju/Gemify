import React, { useState } from 'react'
import BrandLogo from '/src/assets/svg/brand-logo.svg?react';
import GoogleLogo from '/src/assets/svg/google-icon.svg?react';
import { FiCheck, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS
import { Bounce } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
    if (formData.name === "") formErrors.name = "Name is required";
    if (formData.email === "") formErrors.email = "Email is required";
    if (!formData.email.includes('@')) formErrors.email = "Please enter a valid email";
    if (formData.password === "") formErrors.password = "Password is required";
    if (formData.password.length < 6) formErrors.password = "Password must be at least 6 characters";
    return formErrors
  }

  const handleSignup = async (e) => {
    e.preventDefault()
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
      const response = await axios.post(`${baseUrl}signup`,
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

        <div className='lg:h-[calc(100%-30px)] mt-16 lg:mt-0 flex flex-col justify-center'>
          <div className='form-container mt-3 lg:w-[80%] lg:mx-auto'>
            <h3 className='text-5xl font-semibold text-center'>Create your account</h3>
            <p className='text-gray-500 text-center mt-2'> Let's get started with your 30 days free trial</p>
            <div className="google-cta flex justify-center items-center gap-2 border border-gray-400 p-2 mt-6 rounded cursor-pointer hover:bg-gray-200">
              <GoogleLogo width={20} height={20} />
              <span className="font-semibold">Login with Google</span>
            </div>
            <div className="mt-6 relative flex justify-center items-center h-4">
              <span className="h-[1px] w-full bg-gray-400 block "></span>
              <span className="block absolute top-1/2 -translate-y-1/2 px-2 font-semibold bg-white">or</span>
            </div>
            <form action="" className="mt-6">
              <div className="input-container">
                <label className='after:content-["*"] after:absolute after:text-red-500' htmlFor="name">
                  Name
                </label>
                <input name="name" value={formData.name} onChange={handleChange} className='border border-gray-400 block w-full mt-2 rounded py-2 px-3 placeholder:text-gray-500' type="text" placeholder='Enter your name' />
              </div>

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

              <div className="check-container mt-8 flex gap-2">
                <label htmlFor="term-check" className="flex items-center cursor-pointer  relative">
                  <input type="checkbox" id="term-check" className="hidden peer" />

                  {/* Checkbox Wrapper */}
                  <div className="w-6 h-6 border border-gray-400 rounded flex justify-center items-center 
                        transition-all duration-300 peer-checked:bg-blue-500 peer-checked:border-blue-500">

                    {/* Check Icon */}
                  </div>
                  <FiCheck className="w-4 h-4 text-white scale-0 absolute left-1 peer-checked:scale-100 transition-transform duration-300" />

                  <span className="font-semibold ml-2">I agree to all Term, Privacy Policy and Fees</span>
                </label>
              </div>

              <button type='submit' onClick={handleSignup} className='bg-black text-white font-medium rounded-3xl px-2 py-3 mt-4 w-full active:scale-[.8] transition-transform duration-300 relative'>
                {loading ? <div className='flex justify-center items-center'>
                  <FiLoader className='animate-spin w-6 h-6 text-white' />
                </div> : <span>Sign up</span>}
              </button>

              <div className='flex gap-2 items-center mt-4'>
                <p className='font-semibold'>Already have an account? <Link to="/login" className='text-green-800 hover:underline'>Log in</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='lg:w-1/2 hidden p-2 pb-28 relative z-[1] overflow-hidden bg-[url("/src/assets/img/banner-2.jpg")] bg-cover bg-center h-full rounded-lg lg:flex flex-col justify-end items-center text-center'>
        <div className="absolute inset-0 -z-[1] bg-black/40"></div>
        <div className='lg:w-[85%]'>
          <h4 className='text-[2.5rem] leading-tight text-white font-semibold mb-5'>Pure Gold, Timeless Value – Buy Raw & Crafted Gold with Confidence!</h4>
          <p className='text-xl text-white/65'>From raw brilliance to masterful craftsmanship—secure your gold, secure your future.</p>
        </div>
      </div>
    </div>
  )
}

export default Signup
