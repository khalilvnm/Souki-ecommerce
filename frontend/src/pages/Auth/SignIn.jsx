import { useContext, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppContext } from '../../context/AppContext';
import axios from "axios";
import Loading from '../../components/Loading/Loading';

const SignIn = () => {
  const { token, setToken, backend_url } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState("password");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Show Password Handler
  const showPasswordHandler = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };
  // Schema 
  const schema = z.object({
    email: z.string({ required_error: "Email Is Requried." }).email({ message: "Please Write a Valid Email." }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be AT least 6 Characters." }).max(200)
  });
  // Form Register
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });

  // OnSubmit Handler
  const onSubmitHandler = async (data) => {
    try {
      setLoading(true);
      const userDetails = {
        email: data.email,
        password: data.password
      };
      const response = await axios.post(backend_url + "/api/users/signin", userDetails);
      if (response.data.success) {
        window.localStorage.setItem("token", response.data.user.token);
        setToken(response.data.user.token);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitError(error.response.data.message);
      setLoading(false);
    }
  };
  return loading ? <Loading /> : (
    <div className='my-10 min-h-[70vh] flex items-center justify-center px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='w-full sm:w-[450px] border border-gray-300 p-5 rounded-md'>
        <p className='text-2xl mb-5 font-gray-700 font-semibold'>Sign In</p>
        <div className='flex flex-col gap-5'>
          {/* Email */}
          <div>
            <label htmlFor='email' className='text-gray-600 font-semibold ml-1 mb-1'>Email</label>
            <input type='email' id='email' placeholder='Email' className="block wifull border border-gray-400 shadow-sm rounded-md py-2 px-3 w-full outline-primary" {...register('email')} />
            {errors.email && <p className='text-red-700 text-sm font-medium mt-1 ml-1'>{errors.email.message}</p>}
          </div>
          {/* Password */}
          <div>
            <label htmlFor='password' className='text-gray-600 font-semibold ml-1 mb-1'>Password</label>
            <div className='relative'>
              <input type={showPassword} id='password' placeholder='Password' className="block wifull border border-gray-400 shadow-sm rounded-md py-2 px-3 w-full outline-primary" {...register('password')} />
              {showPassword === "password" ?
                <IoEyeSharp className='absolute top-[50%] right-[20px] -translate-y-[50%] cursor-pointer text-xl text-gray-700' onClick={showPasswordHandler} /> :
                <FaEyeSlash className='absolute top-[50%] right-[20px] -translate-y-[50%] cursor-pointer text-xl text-gray-700' onClick={showPasswordHandler} />}
            </div>
            {errors.password && <p className='text-red-700 text-sm font-medium mt-1 ml-1'>{errors.password.message}</p>}
            {/* Button */}
          </div>
          <button type='submit' className='mt-5 bg-black text-white py-2 px-3 rounded-md text-[15px] font-semibold text-center block w-full transition-all duration-300 hover:bg-gray-700'>Sign In</button>
        </div>
        {/* Submit Error */}
        {
          submitError &&
          <div className='my-4 p-3 flex items-center justify-center text-center bg-[#ddd] border border-gray-300 rounded-md'>
            <p className='text-sm font-medium text-red-700'>{submitError}</p>
          </div>
        }
        <p className='text-sm mt-6 text-gray-800 font-medium'>Don't Have an Account?
          <Link to={"/signup"} className='text-base font-semibold text-primary ml-2'>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
