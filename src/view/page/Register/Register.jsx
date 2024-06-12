import React, { createContext, useContext, useState } from 'react'
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { TextValidator, ValidatorComponent, ValidatorForm } from 'react-material-ui-form-validator';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from './RegisterServices';

function Register() {
    const [dataState, setDataState] = useState({});
    const [loading, setLoading] = useState(false);
    const [isReg, setIsReg] = useState(false);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setDataState((pre) => ({ ...pre, [name]: value }));
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!isReg) {
                setLoading(true)
                let formData = new FormData();
                formData.append("username", dataState?.username);
                formData.append("password", dataState?.password);
                formData.append("email", dataState?.email);
                const data = await register(formData);
                if (data?.data) {
                    toast.success("Please check your email to verify your account.")
                    setIsReg(true)
                }
            } else {
                setIsReg(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center h-screen items-center bg-[#111827] bg-login'>
            {/* dark:bg-gray-800 */}
            <div className="w-full max-w-sm p-4 bg-[#1f293799] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Log in</h5>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                            <input value={dataState?.username} onChange={handleChange} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input value={dataState?.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <small>(Used to recover password)</small></label>
                            <input value={dataState?.email} onChange={handleChange} type="email" name="email" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        {
                            loading
                                ?
                                <div className='flex justify-center'><CircularProgress /></div>
                                :
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isReg ? "Kiểm tra email để xác thực tài khoản" : "Đăng ký"}</button>}
                    </>
                    <div className="flex items-start">
                        <Link to="/login" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Already have an account? Log in.</Link>
                    </div>
                </form>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Register
