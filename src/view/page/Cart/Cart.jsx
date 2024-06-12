import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DialogPurchase from '../../components/DialogPurchase';
import { applyVoucher, deleteCart, getAllCart, getCartByIDProfile } from './CartServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatCurrency, getCurrentUser } from '../../../appFunction';

function Cart() {

    let user = getCurrentUser();
    const [dataState, setDataState] = useState({});
    const [open, setOpen] = useState(false);
    const [voucher, setVoucher] = useState("");
    const [listItem, setListItem] = useState([]);
    const addCount = (idCart) => {
        const updatedItems = listItem.map(item => {
            if (item?.idCart === idCart) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setListItem(updatedItems);
        setDataState((pre) => ({
            ...pre,
            totalPrice: calculatePrice(updatedItems),
            totalItem: updatedItems?.length,
        }))
    }

    const minusCount = (idCart) => {
        const updatedItems = listItem.map(item => {
            if (item?.idCart === idCart && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setListItem(updatedItems);
        setDataState((pre) => ({
            ...pre,
            totalPrice: calculatePrice(updatedItems),
            totalItem: updatedItems?.length,
        }))
    }

    const handleDeleteCart = async (id) => {
        try {
            const data = await deleteCart(id);
            toast.success("Successfully removed from cart")
            search();
        } catch (error) {

        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenBuy = () => {
        setOpen(true)
    }
    const search = async () => {
        try {
            const data = await getCartByIDProfile(user?.idprofile);
            setListItem(data?.data);
            setDataState((pre) => ({
                ...pre,
                totalPrice: calculatePrice(data?.data),
                totalItem: data?.data?.length,
            }))
        } catch (error) {

        }
    }

    const calculatePrice = (list = []) => {
        return list.reduce((total, product) => total + (product.quantity * (product?.product?.sale?.percent ? (product?.product?.exportPrice - (product?.product?.exportPrice * ((product?.product?.sale?.percent / 100) || 1))) : product?.product?.exportPrice)), 0);
    }

    const handleChangeVoucher = (e) => {
        setVoucher(e.target.value);
    }

    const addVoucher = async () => {
        try {
            let formData = new FormData();
            formData.append("code", voucher);
            formData.append("totalPrice", calculatePrice(listItem));
            const data = await applyVoucher(formData);
            setDataState((pre) => ({
                ...pre,
                soTienGiam: data?.data || 0
            }))
            toast.success("Apply discount code successfully");
        } catch (error) {
            toast.error(error?.response?.data || "This discount code cannot be used")
        }
    }

    useEffect(() => {
        search();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <div className="container mx-auto mt-10">
            <div className="sm:flex shadow-md my-10">
                <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Cart</h1>
                        <h2 className="font-semibold text-2xl">{listItem?.length} product</h2>
                    </div>
                    {/* product in card  */}

                    <div class="w-full max-h-[500px] overflow-auto shadow bg-white" id="journal-scroll">
                        {listItem?.map(i => {
                            console.log(i)
                            return <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                                <div className="md:w-4/12 2xl:w-1/4 w-full">
                                    <img src={i?.product?.imageMain} alt="Black Leather Purse" className="h-[200px] w-[200px] object-center object-cover md:block hidden" />
                                    <img src={i?.product?.imageMain} alt="Black Leather Purse" className="md:hidden w-full h-full object-center object-cover" />
                                </div>
                                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-base font-black leading-none text-gray-800 mt-1">{i?.product?.productName}</p>
                                        <div className="py-2 px-1 mr-6 focus:outline-none">
                                            <form className="max-w-xs mx-auto">
                                                <div className="relative flex items-center">
                                                    <button onClick={() => minusCount(i?.idCart)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                        <svg className="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input type="text" value={i?.quantity} id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" required />
                                                    <button onClick={() => addCount(i?.idCart)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                        <svg className="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <p className="text-xs leading-3 text-gray-600 pt-2">Size: {i?.size?.sizeName}</p>
                                    {i?.product?.sale?.percent ? <p className="text-xs leading-3 text-gray-600 pt-4">Discount: {i?.product?.sale?.percent}%</p> : ""}
                                    <p className="text-xs leading-3 text-gray-600 py-4">Color: {i?.color?.colorName}</p>
                                    <p className="w-96 text-xs leading-3 text-gray-600">{i?.product?.productDes}</p>
                                    <p className="text-xs leading-3 text-gray-600 pt-4"> Quantity: {i?.quantity}</p>
                                    <div className="flex items-center justify-between pt-5 mr-6">
                                        <div className="flex itemms-center">
                                            <p className="text-xs leading-3 underline text-red-500 cursor-pointer" onClick={() => handleDeleteCart(i?.idCart)}>Delete from list</p>
                                        </div>
                                        <p className="text-base font-black leading-none text-gray-800">{formatCurrency(i?.product?.sale?.percent ? i?.product?.exportPrice - (i?.product?.exportPrice * (i?.product?.sale?.percent / 100) || 1) : i?.product?.exportPrice)} / 1 product</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>


                    <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                            <path
                                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        On the homepage
                    </Link>
                </div>
                <div id="summary" className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Total amount</span>
                        <span className="font-semibold text-sm">{formatCurrency(calculatePrice(listItem))}</span>
                    </div>
                    {/* <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">
                            Transport fee
                        </label>
                        <select className="block p-2 text-gray-600 w-full text-sm">
                            <option>Standard shipping - $10.00</option>
                        </select>
                    </div> */}

                    <div className="pt-10 pb-5">
                        <label
                            for="promo"
                            className="font-semibold inline-block mb-3 text-sm uppercase"
                        >
                            Discount code
                        </label>
                        <input
                            type="text"
                            id="promo"
                            value={voucher}
                            onChange={handleChangeVoucher}
                            placeholder="Enter discount code"
                            className="p-2 text-sm w-full"
                        />

                    </div>
                    {dataState?.soTienGiam && <div className='mb-5 mt-1'>Orders are reduced: {formatCurrency(dataState?.soTienGiam)}</div>}
                    <button onClick={addVoucher} className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                        Apply
                    </button>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Into money</span>
                            <span>{formatCurrency(calculatePrice(listItem) - (dataState?.soTienGiam || 0))} </span>
                        </div>
                        <button onClick={handleOpenBuy} className=" font-semibold  py-3 text-sm  uppercase w-full bg-[#333] text-white hover:bg-[#222]">
                            Buy
                        </button>
                    </div>
                </div>
            </div>
            {open && <DialogPurchase open={open} handleClose={handleClose} item={listItem} dataState={dataState} />}
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default Cart
