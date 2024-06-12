import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FacebookProvider, Comments } from 'react-facebook';

import { addToCart, getProductByID, getProductDetailByID } from "./ProductDetailServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getListImageProduct } from "../AdminPage/ManageProduct/ManageProductServices";
import { formatCurrency, getCurrentUser } from "../../../appFunction";

const ProductDetail = () => {

    const { id } = useParams();
    let user = getCurrentUser();
    const [count, setCount] = useState(0);
    const [item, setItem] = useState({});
    const [listData, setlistData] = useState([]);
    const [dataChange, setData] = useState({});
    const [dataState, setDataState] = useState({});
    const [urlComment, setUrlComment] = useState("");

    const convertDataState = (value) => {
        return {
            idProfile: user?.idprofile,
            idProduct: value?.item?.idProduct,
            idSize: value?.idSize,
            idColor: value?.idColor,
            quantity: count,
        }
    }

    const getProductDetail = async () => {
        try {
            const data = await getProductByID(id);
            const data2 = await getProductDetailByID(id);
            const data3 = await getListImageProduct(id);

            setItem(data?.data?.data)
            let listColor = [];
            let listSize = [];

            data2?.data?.forEach(element => {
                let idColor = element?.color?.idColor;
                let idSize = element?.size?.idSize;
                let isExitColor = listColor.find(i => i?.color?.idColor === idColor);
                let isExitSize = listColor.find(i => i?.size?.idSize === idSize);
                if (!isExitColor) {
                    listColor.push(element)
                }
                if (!isExitSize) {
                    listSize.push(element);
                }
            });

            setlistData(data2?.data?.map(i => ({
                ...i,
                isSelect: false
            })))
            setDataState((pre) => ({
                ...pre,
                listImage: data3?.data,
                listColor,
                listSize
            }))

        } catch (error) {

        }
    }
    const addCount = () => {
        setCount((prev) => prev + 1);
    };

    const minusCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };

    const validateSubmit = (value) => {
        if (!value?.idColor) {
            toast.info("You have not selected the product color yet");
            return false;
        }
        if (!value?.idSize) {
            toast.info("You have not selected product size");
            return false;
        }
        if (count <= 0) {
            toast.info("The product quantity cannot be less than 0");
            return false;
        }
        return true;
    }
    const handleAddCart = async () => {
        try {
            if (!validateSubmit({ item, ...dataChange })) return;
            const data = await addToCart({ ...convertDataState({ item, ...dataChange }) });
            toast.success("Add to cart successfully");
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelect = (value, name) => {
        if (name === "idSize") {
            let list = listData?.map(i => {
                if (i?.size?.idSize === value) {
                    i.size.isSelect = true;
                } else {
                    i.size.isSelect = false;
                }
                return i;
            });
            setlistData(list)
        }

        if (name === "idColor") {
            let list = listData?.map(i => {
                if (i?.color?.idColor === value) {
                    i.color.isSelect = true;
                } else {
                    i.color.isSelect = false;
                }
                return i;
            });
            setlistData(list);
        }

        setData(pre => ({
            ...pre,
            [name]: value
        }))
    }
    console.log(window.location.href)
    useEffect(() => {
        setUrlComment(window.location.href);
        getProductDetail();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li>
                        <div className="flex items-center">
                            <Link to="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 ">Product</Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{item?.productName}</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
                <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                    <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{item?.productName}</h2>
                    <div className=" flex flex-row justify-between  mt-5">
                        <div className=" flex flex-row space-x-3">
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#1F2937"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#1F2937"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#1F2937"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#1F2937"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20ZM9.99976 15.1C10.1601 15.0959 10.3186 15.1338 10.4598 15.21L14.2298 17.21L13.5098 13C13.4818 12.8392 13.4936 12.6741 13.5442 12.5189C13.5947 12.3638 13.6825 12.2234 13.7998 12.11L16.7998 9.17996L12.5998 8.55996C12.4457 8.52895 12.3012 8.46209 12.1778 8.3648C12.0545 8.2675 11.9558 8.14251 11.8898 7.99996L9.99976 4.24996L8.10976 7.99996C8.03741 8.14366 7.93145 8.26779 7.80089 8.3618C7.67032 8.45581 7.51899 8.51692 7.35976 8.53996L3.15976 9.15996L6.15976 12.09C6.27704 12.2034 6.36478 12.3438 6.41533 12.4989C6.46588 12.6541 6.4777 12.8192 6.44976 12.98L5.72976 17.14L9.49976 15.14C9.65951 15.0806 9.83261 15.0667 9.99976 15.1Z"
                                    fill="#1F2937"
                                />
                            </svg>
                        </div>
                        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">22 reviews</p>
                    </div>

                    <p className=" font-normal text-base leading-6 text-gray-600 mt-7">{item?.productDes}</p>
                    <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">{formatCurrency(item?.exportPrice)}</p>
                    <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">{item?.sale?.percent ? "Giảm giá: " + item?.sale?.percent + " %" : ""}</p>

                    <div className="lg:mt-11 mt-10">
                        <div className="flex flex-row justify-between">
                            <p className=" font-medium text-base leading-4 text-gray-600">Quantity</p>
                            <div className="flex">
                                <span onClick={minusCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1">
                                    -
                                </span>
                                <input id="counter" aria-label="input" className="border border-gray-300 h-full text-center w-14 pb-1" type="number" value={count} onChange={(e) => setCount(e.target.value)} />
                                <span onClick={addCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 ">
                                    +
                                </span>
                            </div>
                        </div>
                        <hr className=" bg-gray-200 w-full my-2" />
                        <div className=" flex flex-row justify-between items-center mt-4">
                            <p className="font-medium text-base leading-4 text-gray-600">Color</p>
                            <div className="flex">
                                {dataState?.listColor?.map(i => {
                                    return <button
                                        onClick={() => handleSelect(i?.color?.idColor, "idColor")}
                                        type="button"
                                        className={`text-white ${i?.color?.isSelect && "outline-none ring-4 ring-gray-300 dark:ring-gray-700"} bg-yellow-400 hover:bg-gray-900   font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-400 dark:hover:bg-gray-700  dark:border-gray-700`}>
                                        {i?.color?.colorName}
                                    </button>
                                })}
                            </div>
                        </div>
                        <hr className=" bg-gray-200 w-full mt-4" />
                        <div className=" flex flex-row justify-between items-center mt-4">
                            <p className="font-medium text-base leading-4 text-gray-600">Size</p>
                            <div className="flex">
                                {dataState?.listSize?.map(i => {
                                    return <button
                                        onClick={() => handleSelect(i?.size?.idSize, "idSize")}
                                        type="button"
                                        className={`text-white ${i?.size?.isSelect && "outline-none ring-4 ring-gray-300 dark:ring-gray-700"} bg-yellow-400 hover:bg-gray-900   font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-400 dark:hover:bg-gray-700  dark:border-gray-700`}>
                                        {i?.size?.sizeName}
                                    </button>
                                })}
                            </div>
                        </div>
                        <hr className=" bg-gray-200 w-full mt-4" />
                    </div>

                    <button onClick={handleAddCart} className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6">Add to cart</button>
                </div>


                <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                    <div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
                        <img src={item?.imageMain} />
                    </div>
                    <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                        {dataState?.listImage?.map(i => {
                            return (
                                <div className="bg-gray-100 flex justify-center items-center py-4">
                                    <img src={i?.image || "https://i.ibb.co/0jX1zmR/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1-1.png"} alt="Wooden chair - preview 1" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-md text-center">
                        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Maybe you will like it</h2>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                        <article className="relative">
                            <div className="aspect-square overflow-hidden">
                                <img className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300" src="https://componentland.com/images/oZ_djoBAmHk4vgKQh41YT.png" alt="" />
                            </div>
                            <div className="absolute top-0 m-1 rounded-full bg-white">
                                <p className="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">Sale</p>
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                                <div className="">
                                    <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                        <a href="#" title="" className="cursor-pointer">
                                            Arabian Musk
                                            <span className="absolute" aria-hidden="true"></span>
                                        </a>
                                    </h3>
                                    <div className="mt-2 flex items-center">
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm"> $79.00 </del>
                                    <p className="text-xs font-normal sm:text-sm md:text-base">$99.00</p>
                                </div>
                            </div>
                        </article>

                        <article className="relative">
                            <div className="aspect-square overflow-hidden">
                                <img className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300" src="https://componentland.com/images/oZ_djoBAmHk4vgKQh41YT.png" alt="" />
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                                <div className="">
                                    <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                        <a href="#" title="" className="cursor-pointer">
                                            Albanian Essence
                                            <span className="absolute" aria-hidden="true"></span>
                                        </a>
                                    </h3>
                                    <div className="mt-2 flex items-center">
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-normal sm:text-sm md:text-base">$299.00</p>
                                </div>
                            </div>
                        </article>

                        <article className="relative">
                            <div className="aspect-square overflow-hidden">
                                <img className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300" src="https://componentland.com/images/oZ_djoBAmHk4vgKQh41YT.png" alt="" />
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                                <div className="">
                                    <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                        <a href="#" title="" className="cursor-pointer">
                                            Siberian Perfum
                                            <span className="absolute" aria-hidden="true"></span>
                                        </a>
                                    </h3>
                                    <div className="mt-2 flex items-center">
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-normal sm:text-sm md:text-base">$49.00</p>
                                </div>
                            </div>
                        </article>

                        <article className="relative">
                            <div className="aspect-square overflow-hidden">
                                <img className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300" src="https://componentland.com/images/oZ_djoBAmHk4vgKQh41YT.png" alt="" />
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                                <div className="">
                                    <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                        <a href="#" title="" className="cursor-pointer">
                                            Danish Levoune
                                            <span className="absolute" aria-hidden="true"></span>
                                        </a>
                                    </h3>
                                    <div className="mt-2 flex items-center">
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>

                                        <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>

                                        <svg className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-normal sm:text-sm md:text-base">$79.00</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <div className="flex  justify-center items-center w-full">
                <div className="w-full sm:w-96 md:w-8/12 lg:w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-28 sm:gap-x-6 sm:gap-y-12 gap-y-12 sm:mt-14 mt-10">
                    <div>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.667 43.75H33.3337" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M25 31.25V43.75" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M35.4167 6.25L37.5 20.8333C37.5 27.1083 31.9042 31.25 25 31.25C18.0958 31.25 12.5 27.1083 12.5 20.8333L14.5833 6.25H35.4167Z" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.5 20.8333C14.3032 19.4813 16.4962 18.7505 18.75 18.7505C21.0038 18.7505 23.1968 19.4813 25 20.8333C26.8032 22.1853 28.9962 22.9161 31.25 22.9161C33.5038 22.9161 35.6968 22.1853 37.5 20.8333" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Reliability</p>
                        <p className="text-normal text-base leading-6 text-gray-600 mt-4">The level of reliability will reflect how the quality of the product is maintained from the initial stages and continues over several years of use. </p>
                    </div>
                    <div>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.833 6.66659C17.574 7.42209 14.5766 9.03575 12.1515 11.3402C9.72641 13.6447 7.96204 16.556 7.04139 19.7722C6.12073 22.9884 6.07733 26.3923 6.91568 29.6309C7.75403 32.8696 9.44359 35.8249 11.8091 38.1905C14.1747 40.556 17.13 42.2456 20.3686 43.0839C23.6073 43.9223 27.0112 43.8789 30.2274 42.9582C33.4436 42.0375 36.3549 40.2732 38.6594 37.8481C40.9638 35.423 42.5775 32.4255 43.333 29.1666C43.333 28.6141 43.1135 28.0842 42.7228 27.6935C42.3321 27.3028 41.8022 27.0833 41.2497 27.0833H33.333C32.9542 28.5395 32.1975 29.8699 31.1394 30.9397C30.0813 32.0095 28.7594 32.7809 27.3074 33.1757C25.8554 33.5705 24.3249 33.5747 22.8708 33.1879C21.4166 32.8011 20.0905 32.0371 19.0265 30.9731C17.9625 29.9091 17.1984 28.583 16.8117 27.1288C16.4249 25.6747 16.4291 24.1442 16.8239 22.6922C17.2187 21.2402 17.99 19.9183 19.0599 18.8602C20.1297 17.8021 21.4601 17.0453 22.9163 16.6666V8.33326C22.8904 8.08643 22.8158 7.84721 22.6968 7.62944C22.5777 7.41168 22.4166 7.21971 22.2229 7.06468C22.0291 6.90964 21.8064 6.79463 21.5678 6.72629C21.3293 6.65795 21.0795 6.63766 20.833 6.66659Z"
                                stroke="#4B5563"
                                strokeWidth="3.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M31.25 7.29163C33.8953 8.22305 36.2979 9.736 38.2809 11.719C40.264 13.7021 41.7769 16.1047 42.7083 18.75H33.3333C32.6946 18.0019 31.998 17.3054 31.25 16.6666V7.29163Z" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Safety</p>
                        <p className="text-normal text-base leading-6 text-gray-600 mt-4">During the production process, businesses will consider using goods in a normal way and maintain a high level of protection to ensure consumer safety. </p>
                    </div>
                    <div>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.583 14.5834H35.4164V27.0834C35.4164 28.741 34.7579 30.3307 33.5858 31.5028C32.4137 32.6749 30.824 33.3334 29.1663 33.3334H20.833C19.1754 33.3334 17.5857 32.6749 16.4136 31.5028C15.2415 30.3307 14.583 28.741 14.583 27.0834V14.5834Z" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.75 6.25V14.5833" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M31.25 6.25V14.5833" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M25 33.3334V37.5C25 38.6051 25.439 39.6649 26.2204 40.4463C27.0018 41.2277 28.0616 41.6667 29.1667 41.6667H35.4167" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Durability and aesthetics</p>
                        <p className="text-normal text-base leading-6 text-gray-600 mt-4"> The durability of a product can be understood as the length of use and lifespan of the product over a determined period of time.</p>
                    </div>
                    <div>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.667 16.6666H33.3337V33.3333H16.667V16.6666Z" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M37.4997 8.33337H12.4997C10.1985 8.33337 8.33301 10.1989 8.33301 12.5V37.5C8.33301 39.8012 10.1985 41.6667 12.4997 41.6667H37.4997C39.8009 41.6667 41.6663 39.8012 41.6663 37.5V12.5C41.6663 10.1989 39.8009 8.33337 37.4997 8.33337Z" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M33.333 33.3334L40.208 40.2084" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M33.333 16.6666L40.208 9.79163" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.667 16.6666L9.79199 9.79163" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.667 33.3334L9.79199 40.2084" stroke="#4B5563" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Product characteristics</p>
                        <p className="text-normal text-base leading-6 text-gray-600 mt-4">Products with clearly described characteristics will make it easier to reach large markets and target customers that businesses want to target.</p>
                    </div>
                </div>
            </div>
            <div className="flex mt-9 justify-center items-center w-full frame" style={{ width: '100%' }}>
                <FacebookProvider appId="959253695559182" width="100%">
                    <Comments href={"http://localhost:3000/" + id} width="100%" />
                </FacebookProvider>
            </div>
            <ToastContainer autoClose={3000} />
        </div>
    );
};

export default ProductDetail;
