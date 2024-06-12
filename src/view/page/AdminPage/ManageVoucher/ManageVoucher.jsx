import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import { tableIcons } from '../../../utils/tableIcon';
import ManageVoucherDialog from './ManageVoucherDialog';
import { Delete, Edit } from '@material-ui/icons';
import { deleteVoucher, getAllVouchers } from './ManageVoucherServices';
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
            <Tooltip
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
            </Tooltip>
        </>
    );
}
function ManageVoucher() {

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

    const handleEdit = (item) => {
        setItem(item);
        handleClickOpen();
    }
    const handleDelete = (id) => {
        setItem(id);
        setOpenDelete(true);
    }

    const handleYesClick = async () => {
        try {
            const data = await deleteVoucher(item);
            toast.success("Deleted successfully!")
            updatePageData();
            handleClose();
        } catch (error) {

        }
    }

    const updatePageData = async () => {
        try {
            const data = await getAllVouchers();
            setListItem(data?.data)
        } catch (error) {

        }
    }
    let columns = [
        {
            title: 'Operation',
            field: '',
            render: (rowData) => <MaterialButton
                item={rowData}
                onSelect={(rowData, method) => {
                    if (0 === method) {
                        handleEdit(rowData);
                    } else if (1 === method) {
                        handleDelete(rowData?.idVoucher);
                    } else {
                        alert("Call Selected Here:" + rowData?.idVoucher);
                    }
                }}
            />
        },
        { title: 'Voucher name', field: 'nameVoucher' },
        { title: 'Voucher code', field: 'code' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Percentage discount', field: 'percent' },
        { title: 'Total price applicable', field: 'totalPriceApply', render: (rowData) => formatCurrency(rowData?.totalPriceApply) },
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
            {open && <ManageVoucherDialog item={item} open={open} handleClose={handleClose} updatePageData={updatePageData} />}
            {openDelete && <ConfirmDialog open={openDelete} handleYesClick={handleYesClick} handleClose={handleClose} />}
            <div className='mt-3' >
                <MaterialTable
                    title="Coupons"
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

export default ManageVoucher
