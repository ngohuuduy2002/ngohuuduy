import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, Box, Grid, ImageList, ImageListItem, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import { addProduct, getListImageProduct, insertChooseSize, updateListImageProduct, updateProduct, uploadImageMainProduct } from './ManageProductServices';
import { CachedOutlined } from '@material-ui/icons';
import { getAllCategorys } from '../ManageCategory/ManageCategoryServices';
import { Autocomplete } from '@mui/material';
import { filterOptions } from '../../../../appFunction';
import { getAllSales } from '../Sale/SaleServices';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}


export default function ManageProductDialog(props) {
    let {
        item,
        handleClose,
        updatePageData,
    } = props;
    const [loading, setLoading] = useState(false);
    const [dataState, setDataState] = useState({});
    const [updatedImage, setUpdatedImage] = useState("");
    const [imageData, setImageData] = useState(null);
    const [updatedImagePhu, setUpdatedImagePhu] = useState("");
    const [imageDataPhu, setImageDataPhu] = useState(null);
    const [updatedImageSize, setUpdatedImageSize] = useState("");
    const [imageDataSize, setImageDataSize] = useState(null);
    const [listImageProduct, setListImageProduct] = useState(null);
    const [listTypeProduct, setListTypeProduct] = useState([]);
    const [listSales, setListSales] = useState([]);

    const handleChange = (event) => {
        let { name, value } = event.target;
        setDataState((pre) => ({ ...pre, [name]: value }))
    }

    const handleChangeSelect = (value, name) => {
        setDataState((pre) => ({ ...pre, [name]: value }))
    }

    const handleImageChange = (e, setImageDataFunc, setUpdatedImageFunc) => {
        const newImage = e.target.files[0];
        if (newImage) {
            setUpdatedImageFunc(newImage);
            const reader = new FileReader();
            reader.onload = () => {
                setImageDataFunc(reader.result);
            };
            reader.readAsDataURL(newImage);
        }
    };

    const convertData = (value) => {
        return {
            productName: value?.productName,
            productDes: value?.productDes,
            importPrice: value?.importPrice,
            exportPrice: value?.exportPrice,
            idCategoty: value?.category?.idCategories,
            idSale: value?.sale?.idSale,
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dataState?.idProduct) {
                const data = await updateProduct(convertData(dataState), dataState?.idProduct)
                toast.success("Successfully updated the product");
            } else {
                const data = await addProduct(convertData(dataState));
                toast.success("New product successfully added");
            }
        } catch (error) {
        } finally {
            props.handleClose();
            props.updatePageData();
        }
    }

    const handleSaveImage = async () => {
        try {
            setLoading(true);
            const uploadImageData = async (image, serviceFunction) => {
                if (image) {
                    let formData = new FormData();
                    formData.append("idProduct", dataState?.idProduct);
                    formData.append("image", image);
                    const data = await serviceFunction(formData);
                }
            };

            await Promise.all([
                uploadImageData(updatedImage, uploadImageMainProduct),
                uploadImageData(updatedImagePhu, updateListImageProduct),
                uploadImageData(updatedImageSize, insertChooseSize)
            ]);
            setLoading(false);
            toast.success("Image updated successfully.");
            handleClose();
            updatePageData();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    const handleGetProducDetail = async (id) => {
        try {
            if (id) {
                const data = await getListImageProduct(id);
                setListImageProduct(data?.data);
            }
            const dataCate = await getAllCategorys();
            const dataSale = await getAllSales();
            setListTypeProduct(dataCate?.data);
            setListSales(dataSale?.data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        setDataState(item)
        setImageData(item?.imageMain);
        setImageDataSize(item?.choosingSize);
        handleGetProducDetail(item?.idProduct);
    }, [])

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth="md"
            minWidth="md"
            width="md"
            fullWidth
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="scroll-dialog-title">Add new/Update product color</DialogTitle>
                <DialogContent className="custom-scroll-content" id='journal-scroll'>
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextField
                                className='w-full'
                                label="Product's name"
                                name='productName'
                                value={dataState?.productName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextField
                                className='w-full'
                                label="Describe"
                                name='productDes'
                                value={dataState?.productDes}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextField
                                className='w-full'
                                type='number'
                                label="Purchase price"
                                name='importPrice'
                                value={dataState?.importPrice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <TextField
                                className='w-full'
                                type='number'
                                label="Price"
                                name='exportPrice'
                                value={dataState?.exportPrice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <Autocomplete
                                className='w-full'
                                options={listTypeProduct}
                                name='category'
                                getOptionLabel={(option) => option?.cateName || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => <TextField {...params}
                                    label="Product type"
                                    value={dataState?.category}
                                />}
                                value={dataState?.category || item?.category}
                                onChange={(e, value) => handleChangeSelect(value, "category")}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                            <Autocomplete
                                className='w-full'
                                options={listSales}
                                name='category'
                                getOptionLabel={(option) => option?.nameSale || ""}
                                filterOptions={filterOptions}
                                renderInput={(params) => <TextField {...params}
                                    label="Discount code"
                                    value={dataState?.sale}
                                />}
                                value={dataState?.sale || item?.sale}
                                onChange={(e, value) => handleChangeSelect(value, "sale")}
                            />
                        </Grid>
                        {dataState?.idProduct && <>
                            {['main', 'HD choose size', 'secondary'].map((imageType, index) => (
                                <Grid item md={index === 2 ? 12 : 4} sm={index === 2 ? 12 : 6} xs={12} key={index}>
                                    <Box>
                                        Image {imageType}
                                        <Button style={{ textTransform: "none", marginLeft: 10 }} color="primary" variant="contained" size='small'><label htmlFor={`avataImage${imageType}`}>Upload photos</label></Button>
                                        {
                                            index === 2
                                                ?
                                                <>
                                                    <Avatar
                                                        style={{ width: 150, height: 150, margin: "10px 0" }}
                                                        sizes="large"
                                                        variant="rounded"
                                                        src={index === 0 ? imageData : index === 1 ? imageDataSize : imageDataPhu}
                                                    />
                                                    <ImageList
                                                        sx={{ width: 500, height: 450 }}
                                                        variant="quilted"
                                                        cols={4}
                                                        rowHeight={121}
                                                    >
                                                        {listImageProduct?.map((item, index) => (
                                                            <ImageListItem key={index} cols={1} rows={1}>
                                                                <img
                                                                    {...srcset(item.image, 121, 1, 1)}
                                                                    alt={""}
                                                                    loading="lazy"
                                                                />
                                                            </ImageListItem>
                                                        ))}
                                                    </ImageList>
                                                </>
                                                :
                                                <Avatar
                                                    style={{ width: 150, height: 150, marginTop: 10 }}
                                                    sizes="large"
                                                    variant="rounded"
                                                    src={index === 0 ? imageData : index === 1 ? imageDataSize : imageDataPhu}
                                                />
                                        }
                                        <TextField
                                            type="file"
                                            id={`avataImage${imageType}`}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => {
                                                index === 0 ? handleImageChange(e, setImageData, setUpdatedImage) : index === 1 ? handleImageChange(e, setImageDataSize, setUpdatedImageSize) : handleImageChange(e, setImageDataPhu, setUpdatedImagePhu);
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                            <Grid item xs={12} className='flex justify-center'>
                                {
                                    loading
                                        ?
                                        <div className='loading'><CachedOutlined /></div>
                                        :
                                        <Button style={{ textTransform: "none" }} size='small' color="primary" variant='contained' onClick={handleSaveImage}>Update photo information</Button>}
                            </Grid>
                        </>}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} style={{ textTransform: "none" }} size='small' color="secondary" variant='contained'>
                        Cancel
                    </Button>
                    {/* {!dataState?.idProduct &&  */}
                    <Button type='submit' style={{ textTransform: "none" }} size='small' color="primary" variant='contained'>
                        Save
                    </Button>
                    {/* } */}
                </DialogActions>
            </form>
        </Dialog>
    );
}
