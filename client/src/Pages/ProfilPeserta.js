import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Axios } from "../config/axios";

function ProfilPeserta() {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id')

    const [peserta, setPeserta] = useState(null);

    useEffect(() => {
        Axios.get("api/pesertaCimpa/" + id)
            .then((res) => {
                setPeserta(res)
                console.log(res)
            })
            .catch(() => {
                console.log("ERROR")
            })
    })
    return (
        <div>
            Profile Page
        </div>
    )
}

export default ProfilPeserta
