import React, { createContext, useContext, useState } from 'react'
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { TextValidator, ValidatorComponent, ValidatorForm } from 'react-material-ui-form-validator';
import { Link, useNavigate } from 'react-router-dom';
import { generateOtp, validateOtp } from './LoginServices';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { STATUS } from '../../../appConst';
import { changePassword } from '../Profile/ProfileServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, color: "#fff" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function ForgetPass() {
    const navigate = useNavigate();

    const [dataState, setDataState] = useState({});

    const [value, setValue] = useState(0);
    const [isTypeOtp, setIsTypeOtp] = useState(false);
    const [isUpdatePass, setIsUpdatePass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeTab = (event, newValue) => {
        if (!isTypeOtp) {
            return;
        }
        setValue(newValue);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setDataState((pre) => ({ ...pre, [name]: value }));

        if (name === "email" && value === "") {
            setIsTypeOtp(false);
            return;
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            if (value === 0) {

                let formData = new FormData();
                formData.append("email", dataState?.email);
                const data = await generateOtp(formData);
                toast.success("Code sent successfully. Please check your email")
                if (data?.status === STATUS.SUCCESS) {
                    setIsTypeOtp(true);
                } else {
                    setIsTypeOtp(false)
                }
            }
            if (value === 1) {
                if (isUpdatePass) {
                    let formData = new FormData();
                    formData.append("email", dataState?.email);
                    formData.append("newPass", dataState?.newPass);
                    const data = await changePassword(formData);
                    toast.success("Updated password successfully")
                    setTimeout(() => {
                        if (data?.data) {
                            navigate("/login");
                        }
                    }, 2000)

                } else {
                    let formData = new FormData();
                    formData.append("email", dataState?.email);
                    formData.append("otpnum", dataState?.otpnum);
                    const data = await validateOtp(formData);
                    toast.success("Code validation successful")
                    setIsUpdatePass(true)
                }
            }
        } catch (error) {
            toast.error("An error occurred")
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
                    {isUpdatePass ?
                        <>
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Update password</h5>
                            <div>
                                <label htmlFor="newPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">A new password</label>
                                <input value={dataState?.newPass} onChange={handleChange} name="newPass" id="newPass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
                            </div>
                            <div>
                                <label htmlFor="newPassConf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input value={dataState?.newPassConf} onChange={handleChange} name="newPassConf" id="newPassConf" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div className="flex items-start">
                                <Link to="/login" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Return to login.</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update password</button>

                        </>
                        :
                        <Box sx={{ width: '100%', color: "white" }} className="custom-tab">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                                    <Tab sx={{ color: "white" }} label="Forgot password" {...a11yProps(0)} />
                                    <Tab sx={{ color: "white" }} label="Enter OTP code" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ marginTop: 30 }}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input value={dataState?.email} onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required />
                                    </div>
                                    <div className="flex items-start mt-3 mb-3">
                                        <Link to="/login" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Return to login.</Link>
                                    </div>
                                    {
                                        loading
                                            ?
                                            <div className='flex justify-center'><CircularProgress /></div>
                                            :
                                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send code</button>
                                    }
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ marginTop: 30 }}>
                                    <div>
                                        <label htmlFor="otpnum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert code</label>
                                        <input value={dataState?.otpnum} onChange={handleChange} name="otpnum" id="otpnum" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ABC" required />
                                    </div>
                                    <div className="flex items-start mt-3 mb-3">
                                        <Link to="/login" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Return to login.</Link>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm </button>
                                </div>
                            </CustomTabPanel>
                        </Box>}
                </form>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default ForgetPass;
