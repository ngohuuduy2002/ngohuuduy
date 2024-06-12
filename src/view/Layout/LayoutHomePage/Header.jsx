import { Box, Button, Popover } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CardGiftcard, SupervisedUserCircle } from '@material-ui/icons';
import { PATH } from '../../../appConst';
import { getProductCategory } from '../../../services/appServices';


function Header() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isProfile, setIsProfile] = useState(false);
    const [listCategory, setlistCategory] = useState([]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentuser");
        window.location.href = "/login"
    }

    const getListCategory = async () => {
        try {
            const data = await getProductCategory();
            setlistCategory(data?.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        if (window.location.pathname === PATH.PROFILE.path) {
            setIsProfile(true)
        } else {
            setIsProfile(false)
        }
        getListCategory();
    }, [])
    return (
        <Box
            className='flex items-center justify-between gap-3 bg-white h-[60px] shadow-lg sticky top-0 z-50'
        >
            <div className='flex items-center justify-between gap-3'>
                <div><Link to="/"><img src="/lolo.png" className='h-10 pl-2 pr-10' /></Link></div >
                {listCategory?.map(i => {
                    return <div className='font-bold p-2 hover:text-blue-200'><Link to={`/${i?.idCategories}`}>{i?.cateName}</Link></div>
                })}
            </div >
            <div className='flex items-center justify-between gap-3 pr-5 cursor-pointer'>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box className='min-w-[200px] flex flex-col justify-start items-start p-3'>
                        <Link to="/profile"><Button startIcon={<SupervisedUserCircle />}> Personal page </Button></Link>
                        <Link to="/progress"><Button startIcon={<CardGiftcard />}> List of orders </Button></Link>
                        <Button onClick={handleLogout} startIcon={<ExitToAppIcon />}> Log out </Button>
                    </Box>
                </Popover>
                <Link to="/cart">
                    <ShoppingCartIcon />
                </Link>
                <div aria-describedby={id} onClick={handleClick}>
                    <PersonIcon />
                </div>
            </div>
        </Box >
    )
}

export default Header
