import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField } from '@material-ui/core';
import { addCategory, updateCategory } from './ManageCategoryServices';
import { toast } from 'react-toastify';

export default function ManageCategoryDialog(props) {
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
            idCategories: value?.idCategories,
            cateName: value?.cateName,
            des: value?.des,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dataState?.idCategories) {
                const data = await updateCategory(convertDataSubmit(dataState));
                toast.success("Update successful !")
            } else {
                const data = await addCategory(convertDataSubmit(dataState));
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
            ...item
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
                <DialogTitle id="alert-dialog-title">Add new/Update product color</DialogTitle>
                <DialogContent className="custom-scroll-content">
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Product type"
                                name='cateName'
                                value={dataState?.cateName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={9} sm={12} xs={12}>
                            <TextField
                                className='w-full'
                                label="Describe"
                                name='des'
                                value={dataState?.des}
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
