import { AddCircleOutlined, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getByCateID } from './ProductServices';
import { formatCurrency } from '../../../appFunction';

function Product() {
    const [listItem, setListItem] = useState([]);
    const idProductType = useParams();

    const getListProductByType = async () => {
        try {
            const data = await getByCateID(idProductType?.id);
            setListItem(data?.data?.data || [])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getListProductByType();

    }, [idProductType?.id]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <div>
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <Link to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 ">
                            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home page
                        </Link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <Link to="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 ">{listItem[0]?.category?.cateName}</Link>
                        </div>
                    </li>
                </ol>
            </nav>
            <section class="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
                <section
                    class="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
                    {listItem?.map(i => {
                        return (
                            <div>
                                <div class="card">
                                    <div class="card-img">
                                        <img class="img" src={i?.imageMain ? i?.imageMain : "https://www.dropbox.com/s/mlor33hzk73rh0c/x14423.png?dl=1"} alt="" />
                                    </div>
                                    <div class="card-title">{i?.productName}</div>
                                    <div class="card-subtitle">{i?.productDes}</div>
                                    <div class="card-subtitle">{`${i?.sale?.percent ? "Giảm giá: " + i?.sale?.percent + " %" : ""} `}</div>
                                    <hr class="card-divider" />
                                    <div class="card-footer">
                                        <div class="card-price">{formatCurrency(i?.exportPrice || 0)}</div>
                                        <button class="card-btn">
                                            <Link to={`/${i?.category?.idCategories}/${i?.idProduct}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path><path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path></svg></Link>
                                        </button>
                                    </div>
                                </div>
                            </div>)
                    })}
                </section>
            </section>
        </div>
    )
}

export default Product
