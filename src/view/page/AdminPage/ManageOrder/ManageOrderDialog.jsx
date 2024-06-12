import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField } from '@material-ui/core';
import { addSize, updateSize, updateStatusOrder } from './ManageOrderServices';
import { toast } from 'react-toastify';
import { convertToDate, filterOptions, getStatusOrder } from '../../../../appFunction';
import { Autocomplete } from '@mui/material';
import { STATUS_ORDER } from '../../../../appConst';

export default function ManageOrderDialog(props) {
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
            idOrder: value?.idOrder,
            sizeName: value?.sizeName,
            des: value?.des,
        }
    }

    const handleChangeSelect = (value, name) => {
        setDataState((pre) => ({ ...pre, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("status", dataState?.statusOrder?.name);
            formData.append("idOrder", item?.idOrder);
            const data = await updateStatusOrder(formData);
            toast.success("Updated successfully!")

        } catch (error) {
            console.log(error)
        } finally {
            handleClose();
            updatePageData();
        }
    }

    useEffect(() => {
        setDataState((pre) => ({
            ...pre,
            ...item,
            statusOrder: getStatusOrder(item?.statusOrder)
        }))
    }, []);

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
                <DialogTitle id="alert-dialog-title">Update orders</DialogTitle>
                <DialogContent className="custom-scroll-content">
                    <Grid container spacing={2}>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Order date"
                                name='orderAt'
                                value={convertToDate(dataState?.orderAt)}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <Autocomplete
                                className='w-full'
                                id="combo-box"
                                fullWidth
                                options={STATUS_ORDER}
                                name='statusOrder'
                                getOptionLabel={(option) => option?.name || ""}
                                renderInput={(params) => <TextField {...params}
                                    label="Order status"
                                    value={dataState?.statusOrder || ""}
                                />}
                                value={dataState?.statusOrder || null}
                                onChange={(e, value) => handleChangeSelect(value, "statusOrder")}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Orderer"
                                name='user'
                                value={dataState?.profile?.fullName}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Payment type"
                                name='orderType'
                                value={dataState?.orderType}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Payment status"
                                name='statusPayment'
                                value={dataState?.statusPayment}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Total amount"
                                name='totalPrice'
                                value={dataState?.totalPrice}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Discount amount"
                                name='totalDiscount'
                                value={dataState?.totalDiscount}
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Into money"
                                name='totalFinal'
                                value={dataState?.totalFinal}
                            // onChange={handleChange}
                            />
                        </Grid>
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
