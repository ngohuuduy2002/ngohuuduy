import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField } from '@material-ui/core';
import { addSales, updateSales } from './SaleServices';
import { toast } from 'react-toastify';
import { convertDate } from '../../../../appFunction';

export default function SaleDialog(props) {
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
            idSale: value?.idSale,
            nameSale: value?.nameSale,
            startDate: value?.startDate,
            endDate: value?.endDate,
            percent: value?.percent,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dataState?.idSale) {
                const data = await updateSales(convertDataSubmit(dataState));
                toast.success("Update successful !")
            } else {
                const data = await addSales(convertDataSubmit(dataState));
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
            startDate: convertDate(item?.startDate || new Date()),
            endDate: convertDate(item?.endDate || new Date()),
        })
    }, [item?.idSale])
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
                <DialogTitle id="alert-dialog-title">Add new/Update discount code</DialogTitle>
                <DialogContent className="custom-scroll-content">
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Discount code name"
                                name='nameSale'
                                value={dataState?.nameSale}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Percentage discount"
                                name='percent'
                                type='number'
                                value={dataState?.percent}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Start day"
                                name='startDate'
                                type='date'
                                placeholder=''
                                value={dataState?.startDate || null}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="End date"
                                name='endDate'
                                type='date'
                                placeholder=''
                                value={dataState?.endDate || null}
                                onChange={handleChange}
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
