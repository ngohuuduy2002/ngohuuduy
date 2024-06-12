import { Box, Divider, Drawer, useMediaQuery } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { items } from '../Config';
import { SideNavItem } from '../Config/side-bar-nav';
import { Link, useParams } from 'react-router-dom';

function SideNav(props) {
    const { open, onClose } = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const [isChangePath, setIsChangePath] = useState(false);
    const content = (
        <Box
            sx={{
                height: "100%",
                "& .simplebar-content": {
                    height: "100%",
                },
                "& .simplebar-scrollbar:before": {
                    background: "neutral.400",
                },
            }}
        >
            <nav className="bg-white shadow-xl h-screen min-w-[250px] py-6 font-[sans-serif]">
                <div className="relative flex flex-col h-full">
                    <div className='flex justify-center'><Link to="/admin"><img src="/lolo.png" className='text-center h-10 pl-2 pr-10' /></Link></div >
                    <ul className="space-y-2 my-7 flex-1">
                        {items()?.map((item, index) => {
                            const active = item.path ? window.location.pathname === item.path : false;
                            return (
                                <li key={index} onClick={() => { setIsChangePath(pre => !pre) }}>
                                    <Link
                                        to={item?.path}
                                        className={`text-sm flex items-center text-[#007bff]  ${active ? "border-r-[5px] border-[#077bff] bg-gray-100" : ""} px-5 py-4 transition-all`}
                                    >
                                        <span className='pr-4'>{item?.icon}</span>
                                        <span>{item?.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "neutral.800",
                        color: "common.white",
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: "neutral.800",
                    color: "common.white",
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    )
}

export default SideNav
