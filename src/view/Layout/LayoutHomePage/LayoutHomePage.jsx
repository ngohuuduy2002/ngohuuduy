import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const LayoutHomePage = () => {
    return (
        <>
            <div className="max-md:ml-0 max-lg:ml-0">
                <Header></Header>
                <div className="px-4 pt-5">
                    <Outlet />
                </div>
            </div>
            {/* <Sidebar></Sidebar>
            {isLoading && <Mask />} */}
        </>
    );
};

export default LayoutHomePage;
