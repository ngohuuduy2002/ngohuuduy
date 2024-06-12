import React, { createContext, useContext, useState } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { TextValidator, ValidatorComponent, ValidatorForm } from 'react-material-ui-form-validator';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './LoginServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();

    const [dataState, setDataState] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;
        setDataState((pre) => ({ ...pre, [name]: value }));
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let formData = new FormData();
            formData.append("username", dataState?.username);
            formData.append("password", dataState?.password);
            const data = await login(formData);
            localStorage.setItem("currentuser", JSON.stringify(data?.data?.profile));
            localStorage.setItem("accessToken", data?.data?.accessToken);
            toast.success("Logged in successfully")
            setTimeout(() => {
                if (data?.data?.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }, 2000)
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center h-screen items-center bg-[#111827] bg-login'>
            {/* dark:bg-gray-800 */}
            <div className="w-full max-w-sm p-4 bg-[#1f293799] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Log in</h5>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                        <input value={dataState?.username} onChange={handleChange} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={dataState?.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember password</label>
                        </div>
                        <Link to="/forget-pass" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot your password?</Link>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in to your account</button>
                    <div className="flex items-start">
                        <Link to="/register" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Register an account?</Link>
                    </div>
                </form>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Login
