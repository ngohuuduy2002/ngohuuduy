import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import { tableIcons } from '../../../utils/tableIcon';
import ManageProductDialog from './ManageProductDialog';
import { Delete, Edit } from '@material-ui/icons';
import { getAllProduct, getProductById } from './ManageProductServices';
import ConfirmDialog from '../../../common/ConfirmDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localization } from '../../../utils/localization';
import { formatCurrency } from '../../../../appFunction';

function MaterialButton(props) {
    const item = props.item;
    return (
        <>
            <Tooltip
                title={"Edit"}
                placement="right-end"
                enterDelay={300}
                leaveDelay={200}
            >
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => props.onSelect(item, 0)}
                >
                    <Edit />
                </IconButton>
            </Tooltip>
            {/* <Tooltip
                title={"Delete"}
                placement="right-end"
                enterDelay={300}
                leaveDelay={200}
            >
                <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => props.onSelect(item, 1)}
                >
                    <Delete />
                </IconButton>
            </Tooltip> */}
        </>
    );
}
function ManageProduct() {

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [item, setItem] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
        setItem(null);
    };

    const handleEdit = async (item) => {
        try {
            const data = await getProductById(item?.idProduct);
            setItem(data?.data?.data);
            handleClickOpen();
        } catch (error) {

        }
    }

    const updatePageData = async () => {
        try {
            const data = await getAllProduct();
            setListItem(data?.data)
        } catch (error) {

        }
    }
    let columns = [
        {
            title: 'Operation',
            field: '',
            width: 100,
            render: (rowData) => <MaterialButton
                item={rowData}
                onSelect={(rowData, method) => {
                    if (0 === method) {
                        handleEdit(rowData);
                    } else if (1 === method) {
                    } else {
                        alert("Call Selected Here:" + rowData?.idCategories);
                    }
                }}
            />
        },
        {
            title: 'Product name', field: 'productName',
            render: (rowData) => {
                return <div class="flex items-center gap-4">
                    <img class="w-10 h-10 rounded" src={rowData?.imageMain} />
                    <div class="font-medium ">
                        <div>{rowData?.productName}</div>
                        <div class="text-sm">{rowData?.productDes}</div>
                    </div>
                </div>
            }
        },
        { title: 'Purchase price', field: 'importPrice', render: (rowData) => formatCurrency(rowData?.importPrice) },
        { title: 'Price', field: 'exportPrice', render: (rowData) => formatCurrency(rowData?.exportPrice) },
        {
            title: 'Product type',
            field: 'category',
            render: (rowData) => rowData?.category?.cateName
        },
        { title: 'Describe', field: 'productDes' },
    ]
    useEffect(() => {
        updatePageData();
    }, [])
    return (
        <div className='p-10'>
            <Grid container spacing={2}>
                <Grid item><Button onClick={handleClickOpen} variant='contained' color="primary" size='small' ><span className='normal-case'>Add new</span></Button></Grid>
                <Grid item><Button variant='contained' color="primary" size='small' ><span className='normal-case'>Advanced search</span></Button></Grid>
            </Grid>
            {open && <ManageProductDialog item={item} open={open} handleClose={handleClose} updatePageData={updatePageData} />}
            <div className='mt-3' >
                <MaterialTable
                    options={{
                        sorting: false,
                        rowStyle: (rowData) => ({
                            backgroundColor:
                                rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
                        }),
                    }}
                    title="List of products"
                    columns={columns}
                    data={listItem}
                    icons={tableIcons}
                    localization={localization}
                />
            </div>
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default ManageProduct
