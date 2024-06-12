import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import { tableIcons } from '../../../utils/tableIcon';
import SaleDialog from './SaleDialog';
import { Delete, Edit } from '@material-ui/icons';
import { deleteSales, getAllSales } from './SaleServices';
import ConfirmDialog from '../../../common/ConfirmDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localization } from '../../../utils/localization';
import { convertToDate } from '../../../../appFunction';

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
function Sale() {

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
            const data = await deleteSales(item);
            toast.success("Deleted successfully!")
            updatePageData();
            handleClose();
        } catch (error) {

        }
    }

    const updatePageData = async () => {
        try {
            const data = await getAllSales();
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
                        handleDelete(rowData?.idSale);
                    } else {
                        alert("Call Selected Here:" + rowData?.idSale);
                    }
                }}
            />
        },
        { title: 'Sales name', field: 'nameSale' },
        { title: 'Percentage discount', field: 'percent' },
        { title: 'Effective date', field: 'startDate', render: (rowData) => convertToDate(rowData?.startDate) },
        { title: 'Expiry date', field: 'endDate', render: (rowData) => convertToDate(rowData?.endDate) },
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
            {open && <SaleDialog item={item} open={open} handleClose={handleClose} updatePageData={updatePageData} />}
            {openDelete && <ConfirmDialog open={openDelete} handleYesClick={handleYesClick} handleClose={handleClose} />}
            <div className='mt-3' >
                <MaterialTable
                    options={{
                        sorting: false,
                        rowStyle: (rowData) => ({
                            backgroundColor:
                                rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
                        }),
                    }}
                    title="Product color"
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

export default Sale
