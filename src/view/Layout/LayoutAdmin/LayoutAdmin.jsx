import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';
import SideNav from './SideNav';
import { styled, useMediaQuery } from '@material-ui/core';

const SIDE_NAV_WIDTH = 260;

function LayoutAdmin() {

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const [openNav, setOpenNav] = useState(false);

    const handlePathnameChange = useCallback(
        () => {
            if (openNav) {
                setOpenNav(false);
            }
        },
        [openNav]
    );

    useEffect(() => {
        handlePathnameChange();
    }, []);
    return (
        <div>
            <Header onNavOpen={() => setOpenNav(true)} />
            <SideNav onClose={() => setOpenNav(false)} open={openNav} />
            <div
                style={{
                    paddingLeft: lgUp ? SIDE_NAV_WIDTH : "0px",
                    minHeight: 3000,
                }}>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutAdmin
