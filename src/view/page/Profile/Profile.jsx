import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogChangeInfo from './DialogChangeInfo';
import { convertDate, getCurrentUser } from '../../../appFunction';
import DialogChangePass from './DialogChangePass';

function Profile() {
    const [dataState, setDataState] = useState(null);
    const [open, setOpen] = useState(false);
    const [openChangePass, setOpenChangePass] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setOpenChangePass(false);
        search();
    }
    const search = async () => {
        try {
            let user = getCurrentUser();
            setDataState(user)
        } catch (error) {

        }
    }
    const handleOpen = () => {
        setOpen(true)
    }
    useEffect(() => {
        search()
    }, [])
    return (
        <><div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Here is some information about the user.
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Avatar
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <img src={dataState?.avt} style={{ maxWidth: 100 }} />
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            First and last name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {dataState?.fullName}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {dataState?.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {dataState?.phone}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {dataState?.address}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Date of birth
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {convertDate(dataState?.dof) || ""}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Password
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <button onClick={() => setOpenChangePass(true)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 pb-2 pt-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Change Password</button>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
            <div className='mt-3 flex justify-center items-center'><button onClick={handleOpen} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 pb-2 pt-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update personal information</button></div>
            {open && <DialogChangeInfo open={open} handleClose={handleClose} dataState={dataState} />}
            {openChangePass && <DialogChangePass open={openChangePass} handleClose={handleClose} dataState={dataState} />}
            <ToastContainer autoClose={3000} />
        </>
    )
}

export default Profile
