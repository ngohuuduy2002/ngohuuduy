import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField } from '@material-ui/core';
import { insertProductDetails, updateProductDetails } from './ManageProductDetailServices';
import { toast } from 'react-toastify';
import { getAllColors } from '../ManageColor/ManageColorServices';
import { getAllSize } from '../ManageSize/ManageSizeServices';
import { Autocomplete } from '@mui/material';
import { getAllProduct } from '../ManageProduct/ManageProductServices';

export default function ManageProductDetailDialog(props) {
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

    const handleChangeSelect = (value, name) => {
        setDataState((pre) => ({ ...pre, [name]: value }))
    }

    const convertDataSubmit = (value) => {
        return {
            idProduct: value?.product?.idProduct,
            idSize: value?.size?.idSize,
            idColor: value?.color?.idColor,
            productRemain: value?.productRemain,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dataState?.idProductDetails) {
                const data = await updateProductDetails(convertDataSubmit(dataState));
                toast.success("Update successful !")
            } else {
                const data = await insertProductDetails(convertDataSubmit(dataState));
                toast.success("Successfully added!")
            }
        } catch (error) {
            toast.error("An error occurred !")
            console.log(error)
        } finally {
            handleClose();
            updatePageData();
        }
    }

    const getOption = async () => {
        try {
            const color = await getAllColors();
            const size = await getAllSize();
            const product = await getAllProduct();
            setDataState((pre) => ({
                ...pre,
                listColor: color?.data,
                listSize: size?.data,
                listProduct: product?.data
            }))
        } catch (error) {

        }
    }

    useEffect(() => {
        setDataState({
            ...item
        })
        getOption();
    }, [])
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
                <DialogTitle id="alert-dialog-title">Add new/Update product color</DialogTitle>
                <DialogContent className="custom-scroll-content">
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Autocomplete
                                className='w-full'
                                id="combo-box"
                                fullWidth
                                options={dataState?.listProduct || []}
                                name='productName'
                                getOptionLabel={(option) => option?.productName || ""}
                                renderInput={(params) => <TextField {...params}
                                    label="Product's name"
                                    value={dataState?.product || ""}
                                />}
                                disabled={dataState?.idProductDetails}
                                value={dataState?.product || null}
                                onChange={(e, value) => handleChangeSelect(value, "product")}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Autocomplete
                                className='w-full'
                                id="combo-box"
                                fullWidth
                                options={dataState?.listColor || []}
                                name='colorName'
                                getOptionLabel={(option) => option?.colorName || ""}
                                renderInput={(params) => <TextField {...params}
                                    label="Product color"
                                    value={dataState?.color || ""}
                                />}
                                value={dataState?.color || null}
                                onChange={(e, value) => handleChangeSelect(value, "color")}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Autocomplete
                                className='w-full'
                                id="combo-box"
                                fullWidth
                                options={dataState?.listSize || []}
                                name='sizeName'
                                getOptionLabel={(option) => option?.sizeName || ""}
                                renderInput={(params) => <TextField {...params}
                                    label="Product size"
                                    value={dataState?.size || ""}
                                />}
                                value={dataState?.size || null}
                                onChange={(e, value) => handleChangeSelect(value, "size")}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="The remaining amount"
                                name='productRemain'
                                value={dataState?.productRemain}
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
