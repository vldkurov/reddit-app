import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Box from "@mui/material/Box";

function Root() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'space-between'
        }}>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </Box>
    )
}

export default Root