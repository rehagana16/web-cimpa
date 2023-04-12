import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode"

function NavButton({currPage, setCurrPage}) {
    const [cookies, setCookie] = useCookies(['user'])
    var decoded = jwt_decode(cookies.Token)
    const klasis = decoded.klasis

    const goToRegistration = () => {
        if(klasis === "Admin" || klasis ==="Bendahara") {
            setCurrPage("Konfirmasi")
        } else {
            setCurrPage("Registrasi")
        }
    }

    const goToListPeserta = () => {
        setCurrPage("ListPeserta")

    }

    return(
        <div className="flex flex-row w-full">
            <div 
                className={(currPage === "ListPeserta"  ? "bg-[#201e45] ": "bg-[#181B43] ") + "flex justify-center w-1/2 text-white text-xl p-4 cursor-pointer bg-[#181B43]"}
                onClick={goToListPeserta}
            >
                List Peserta
            </div>
            <div 
                className={(currPage === "Konfirmasi" || currPage === "Registrasi" ? "bg-[#201e45] ": "bg-[#181B43] ") + "flex justify-center w-1/2 text-white text-xl p-4 cursor-pointer"}
                onClick={goToRegistration}
            >
                {klasis === "Admin" || klasis === "Bendahara" ? "Konfirmasi" : "Registrasi"}
            </div>
    </div>
    )
}

export default NavButton;