import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogConfirm from './DialogConfirm';
import { convertToDate, formatCurrency, getCurrentUser } from '../../../appFunction';
import { confirmRepair, getOrderByProfile } from './ProgressServices';

function Progress() {

    let user = getCurrentUser();

    const [dataState, setDataState] = useState({});
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setItem(null);
    }

    const handleOpen = (id) => {
        setOpen(true);
        setItem(id);
    }

    const handleYesClick = async () => {
        try {
            const data = await confirmRepair(item);
            console.log(data);
            toast.success("Order confirmation successful")
        } catch (error) {

        } finally {
            handleSearch();
            handleClose();
        }
    }

    const handleSearch = async () => {
        try {
            const data = await getOrderByProfile(user?.idprofile);
            setDataState((pre) => ({
                ...pre,
                listData: data?.data
            }))
        } catch (error) {

        }
    }
    useEffect(() => {
        handleSearch();
    }, [])
    return (
        <>
            <section className="py-16 relative">
                <div className="w-full max-w-7xl pb-4 md:px-5 lg-6 mx-auto">
                    <h2 className="font-manrope font-bold text-4xl mb-11 leading-10 text-black text-center">
                        List of orders
                    </h2>
                    {dataState?.listData?.map(i => {
                        return (
                            <div className="mb-8 main-box border border-gray-200 rounded-xl pt-3 max-w-xl max-lg:mx-auto lg:max-w-full">
                                <div className="w-full px-3 min-[400px]:px-6">
                                    <div className="flex flex-col lg:flex-row items-center pb-1 border-b border-gray-200 gap-6 w-full">
                                        <p className="font-medium text-base whitespace-nowrap leading-7 text-emerald-500">
                                            Code orders: {i?.idOrder}</p>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                        <div className="img-box max-lg:w-full ">
                                            <div className=" min-w-[500px] w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                                <ul role="list" className="space-y-5 my-7">
                                                    <li className="flex items-center">
                                                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Order date: {convertToDate(i?.orderAt)}</span>
                                                    </li>
                                                    <li className="flex">
                                                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Order status: {i?.statusOrder}</span>
                                                    </li>
                                                    <li className="flex">
                                                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Payment type: {i?.orderType}</span>
                                                    </li>
                                                    <li className="flex">
                                                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Payment status: {i?.statusPayment}</span>
                                                    </li>
                                                    <li className="flex">
                                                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Total amount: {formatCurrency(i?.totalPrice)}</span>
                                                    </li>
                                                    <li className="flex">
                                                        <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Reduced amount: {formatCurrency(i?.totalDiscount)}</span>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                        <div className="w-full flex flex-wrap max-h-[350px] overflow-auto shadow bg-white" id="journal-scroll">
                                            {i?.orderDetails?.map(it => {
                                                return (
                                                    <div className="p-2 w-full">
                                                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                                                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                                                <path d="M22 4L12 14.01l-3-3"></path>
                                                            </svg>
                                                            <div>
                                                                <span className="font-medium">{`${it?.productName} (${it?.colorName}, ${it?.sizeName})`}</span><br></br>
                                                                <span className="font-medium">{`Quantity: ${formatCurrency(it?.quantity)}. Unit price: ${formatCurrency(it?.productPrice)}. Into money: ${formatCurrency(it?.totalPrice)}`}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                                    {i?.statusOrder !== "Has received the goods" && <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                                        <button onClick={() => handleOpen(i?.idOrder)} type="button" className="text-white bg-[#f7472e] hover:bg-[#f7472e]/80 focus:ring-4 focus:outline-none focus:ring-[#f7472e]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#f7472e]/80 dark:focus:ring-[#f7472e]/40 me-2 mb-2">
                                            <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="bitcoin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"></path></svg>
                                            Goods received
                                        </button>
                                    </div>}
                                    <p className="font-semibold text-lg text-black py-6">Into money: <span className="text-indigo-600"> {formatCurrency(i?.totalFinal)}</span></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section >
            {open && <DialogConfirm open={open} handleClose={handleClose} handleYesClick={handleYesClick} />}
            <ToastContainer autoClose={3000} />
        </>
    )
}

export default Progress
