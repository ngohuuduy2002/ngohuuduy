import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { toast } from 'react-toastify';
import { Avatar, TextField } from '@material-ui/core';
import { convertDate } from '../../../appFunction';
import { changePassword } from './ProfileServices';

export default function DialogChangePass(props) {
    let {
        open,
        dataState,
        handleClose
    } = props;

    const [item, setItem] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let form = new FormData();
            form.append("email", item?.email);
            form.append("newPass", item?.newPass);
            const data = await changePassword(form);
            toast.success("Updated password successfully")
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        setItem((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    useEffect(() => {
        setItem((pre) => ({
            ...pre,
            ...dataState,
        }))
    }, [])
    return (
        <Dialog
            maxWidth="md"
            fullWidth
            scroll="paper"
            open={open}
            onClose={handleClose}
        >
            <DialogContent className="">
                <div class="font-[sans-serif] bg-gray-50" >
                    <div class="grid lg:grid-cols-2 xl:grid-cols-2 gap-4 h-full">
                        <div class="col-span-2 h-max rounded-md p-8 sticky top-0">
                            <h2 class="text-2xl font-bold text-[#333]">Update password</h2>
                            <form class="mt-10" onSubmit={handleSubmit}>
                                <div>
                                    <div class="grid grid-cols-2 gap-6">
                                        <div class="relative flex items-center">
                                            <input value={item?.email} name='email' type="email" placeholder="Email"
                                                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                                                viewBox="0 0 682.667 682.667">
                                                <defs>
                                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                                    </clipPath>
                                                </defs>
                                                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                    <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                        data-original="#000000"></path>
                                                    <path
                                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                        data-original="#000000"></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="relative flex items-center">
                                            <input onChange={handleChange} value={item?.newPass} name="newPass" type="text" placeholder="A new password"
                                                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                                                viewBox="0 0 24 24">
                                                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                                <path
                                                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                    data-original="#000000"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <div class="flex gap-6 max-sm:flex-col mt-10">
                                        <button onClick={handleClose} type="button" class="px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]">Cancel</button>
                                        <button type="submit" class="px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
