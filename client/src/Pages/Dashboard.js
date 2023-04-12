import React, { useState } from "react";
import NavButton from "../Components/NavButton";
import Konfirmasi from "./Konfirmasi";
import ListPeserta from "./ListPeserta";
import Registration from "./Registration";

function Dashboard() {
    const [currPage, setCurrPage] = useState("ListPeserta")

    const renderPage = () => {
        if(currPage === "ListPeserta") {
            return(
                <ListPeserta />
            )
        } else if (currPage === "Konfirmasi") {
            return(
                <Konfirmasi />
            )
        } else if (currPage === "Registrasi") {
            return(
                <Registration />
            )
        }
    }
    return(
        <>
            <NavButton 
                currPage={currPage}
                setCurrPage={setCurrPage}
            />
            {renderPage()}
        </>
    )
}

export default Dashboard;