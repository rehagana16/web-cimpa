import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Axios } from "../config/axios";
import jwt_decode from "jwt-decode"

function ListPeserta() {
    const [cookies, setCookie] = useCookies(['user'])
    var decoded = jwt_decode(cookies.Token)
    const klasis = decoded.klasis //will retrieved from cookie
    const navigate = useNavigate();
    const [allPeserta, setAllPeserta] = useState(null)
    const getAllPesertaByKlasis = () => {
        Axios.get("api/pesertaCimpa/?klasis=" + klasis)
            .then((res) => {
                setAllPeserta(res.data)
                console.log(res.data)
            })
            .catch(() => {
                console.log("ERROR WHEN FETCH ALL PESERTA IN KLASIS")
            })
    }

    const cekStatusKonfirmasi = () => {
        navigate("/konfirmasi/?klasis=" + klasis)
    }

    const uploadBuktiBayar = () => {
        navigate("/uploadbuktibayar/?klasis=" + klasis)
    }

    const goToRegistration = () => {
        navigate("/registrasi")
    }

    useEffect(() => {
        getAllPesertaByKlasis()
    }, [])

    return(
        <div className="h-screen lg:h-full p-8 lg:p-2">
            <div class="flex flex-col text-xl h-full text-white sm:justify-center lg:text-sm">
            {allPeserta === null ? (
                <div className="flex text-5xl items-center justify-center py-32">
                    BELUM ADA PESERTA TERDAFTAR
                </div>) : (
                <div>
                    <div className="flex justify-center text-5xl mt-16 mb-16 lg:mt-8 lg:mb-4 lg:text-3xl">List Peserta</div>
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 p-16 scrollbar">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full border text-center text-3xl lg:text-sm">
                                <thead class="border-b">
                                    <tr>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        No.
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Nama
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Klasis
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Runggun
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Id Peserta
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Jenis Kelamin
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        No Telp
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Link Sosmed
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Foto
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Status Konfirmasi
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPeserta.map((data, index)=>(
                                        <tr className="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap  font-medium border-r">
                                                {index + 1}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.nama}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.klasis}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.runggun}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.id_peserta}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.jenis_kelamin}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.no_telp}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.link_sosmed}
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                <a href={data.foto}>Link Foto</a>
                                            </td>
                                            <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                {data.is_confirmed ? "SUDAH" : "BELUM"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

                <div className="p-16">
                    {klasis === "Admin" ? (
                        <button onClick={cekStatusKonfirmasi} class="flex my-4 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded">
                            Cek Status Konfirmasi
                        </button>
                    ) : (
                        <button onClick={uploadBuktiBayar} class="flex my-4 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded">
                            Upload Bukti Bayar
                        </button>
                    )}
                    {klasis === "Admin" ? (
                        <button onClick={uploadBuktiBayar} class="flex my-4 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded">
                            Daftar Bukti Bayar
                        </button>
                    ) : (
                        <button onClick={goToRegistration} class="flex justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded">
                            Registrasi Peserta
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListPeserta