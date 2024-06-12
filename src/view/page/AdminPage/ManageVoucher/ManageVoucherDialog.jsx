import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField } from '@material-ui/core';
import { insertVoucher, updateVoucher } from './ManageVoucherServices';
import { toast } from 'react-toastify';
import { convertDate } from '../../../../appFunction';

export default function ManageVoucherDialog(props) {
    let {
        open,
        item,
        handleClose,
        updatePageData
    } = props;
    const [dataState, setDataState] = useState({});

    const handleChange = (event) => {
        let { name, value } = event.target;
        setDataState((pre) => ({ ...pre, [name]: value }))
    }

    const convertDataSubmit = (value) => {
        return {
            idVoucher: value?.idVoucher,
            nameVoucher: value?.nameVoucher,
            code: value?.code,
            totalPriceApply: value?.totalPriceApply,
            startDate: convertDate(value?.startDate),
            endDate: convertDate(value?.endDate),
            percent: value?.percent,
            quantity: value?.quantity,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dataState?.idVoucher) {
                const data = await updateVoucher(convertDataSubmit(dataState));
                toast.success("Update successful !")
            } else {
                const data = await insertVoucher(convertDataSubmit(dataState));
                toast.success("Successfully added!")
            }
        } catch (error) {
            console.log(error)
        } finally {
            handleClose();
            updatePageData();
        }
    }

    useEffect(() => {
        setDataState({
            ...item,
            startDate: convertDate(new Date(item?.startDate)),
            endDate: convertDate(new Date(item?.endDate)),
        })
    }, [item?.idCategories])
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            minWidth="md"
            width="md"
            fullWidth
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="alert-dialog-title">Add new/Update coupons</DialogTitle>
                <DialogContent className="custom-scroll-content">
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Voucher name"
                                name='nameVoucher'
                                value={dataState?.nameVoucher}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Voucher code"
                                name='code'
                                value={dataState?.code}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Effective date"
                                name='startDate'
                                type='date'
                                value={dataState?.startDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="End date"
                                name='endDate'
                                type='date'
                                value={dataState?.endDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Quantity"
                                name='quantity'
                                type="number"
                                value={dataState?.quantity}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Percentage discount"
                                name='percent'
                                type="number"
                                value={dataState?.percent}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Total price applicable"
                                name='totalPriceApply'
                                type="number"
                                value={dataState?.totalPriceApply}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item md={9} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Describe"
                                name='des'
                                value={dataState?.des}
                                onChange={handleChange}
                            />
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ textTransform: "none" }} size='small' color="primary" variant='contained'>
                        Cancel
                    </Button>
                    <Button type='submit' style={{ textTransform: "none" }} size='small' color="secondary" variant='contained'>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
