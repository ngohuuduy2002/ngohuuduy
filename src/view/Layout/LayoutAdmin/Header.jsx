import { Avatar, Badge, Box, Button, IconButton, Popover, SvgIcon, Tooltip, alpha, useMediaQuery } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BarChartRounded } from '@material-ui/icons';
import { PATH } from '../../../appConst';


const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function Header(props) {

    const { onNavOpen } = props;

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const [anchorEl, setAnchorEl] = useState(null);
    const [isProfile, setIsProfile] = useState(false);

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
    useEffect(() => {
        if (window.location.pathname === PATH.PROFILE.path) {
            setIsProfile(true)
        } else {
            setIsProfile(false)
        }
    }, [])

    return (
        <Box
            component="header"
            className='flex items-center justify-between gap-3 bg-[#151d20] text-white shadow-lg sticky top-0 z-50 min-h-16 px-3'
            sx={{
                backdropFilter: "blur(6px)",
                backgroundColor: "(theme) => alpha(theme.palette.background.default, 0.8)",
                position: "sticky",
                left: {
                    lg: `${SIDE_NAV_WIDTH}px`,
                },
                top: 0,
                width: {
                    lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
                },
                minHeight: TOP_NAV_HEIGHT,
                px: 2,
                zIndex: (theme) => theme.zIndex.appBar,
            }}
        >
            <Box alignItems="center" spacing={2}>
                {!lgUp && (
                    <IconButton onClick={onNavOpen}>
                        <SvgIcon fontSize="large" style={{ color: "white" }}>
                            <BarChartRounded />
                        </SvgIcon>
                    </IconButton>
                )}
            </Box>
            <Box alignItems="center" spacing={2}>
                {/* <Avatar /> */}
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
                            {/* <Link to="/profile"><Button startIcon={<SupervisedUserCircle />}> Trang cá nhân </Button></Link>
                            <Link to="/progress"><Button startIcon={<CardGiftcard />}> Danh sách đơn hàng </Button></Link> */}
                            <Button onClick={handleLogout} startIcon={<ExitToAppIcon />}> Log out </Button>
                        </Box>
                    </Popover>
                    <div aria-describedby={id} onClick={handleClick}>
                        <PersonIcon />
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default Header
