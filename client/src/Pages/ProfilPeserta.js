import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Axios } from "../config/axios";

function ProfilPeserta() {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id')

    const [peserta, setPeserta] = useState(null);

    const getPeserta = () => {
        Axios.get("api/pesertaCimpa/" + id)
            .then((res) => {
                setPeserta(res.data)
                console.log(res)
            })
            .catch(() => {
                console.log("ERROR")
            })
    }

    useEffect(() => {
        getPeserta()
    }, [])

    
    return (
        peserta !== null &&
        <div>
            <img className="w-1/2" src={peserta.foto} alt="Foto Peserta"></img>
            <div>{peserta.nama}</div>
            <div>{peserta.klasis}</div>
            <div>{peserta.runggun}</div>
            <div>{peserta.link_sosmed}</div>
            <div>{peserta.no_telp}</div>
            <div>{peserta.id_peserta}</div>
        </div>
    )
}

export default ProfilPeserta
