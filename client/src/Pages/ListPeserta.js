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

    const goToRegistration = () => {
        navigate("/registrasi")
    }

    useEffect(() => {
        getAllPesertaByKlasis()
    }, [])

    return(
        allPeserta !== null &&
        <div>
            <div>List Peserta</div>
            <div class="flex flex-col p-16">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full border text-center">
                            <thead class="border-b">
                                <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    No.
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Nama
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Klasis
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Runggun
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Id Peserta
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Jenis Kelamin
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    No Telp
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Link Sosmed
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Foto
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPeserta.map((data, index)=>(
                                    <tr className="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                            {index + 1}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.nama}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.klasis}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.runggun}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.id_peserta}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.jenis_kelamin}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.no_telp}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.link_sosmed}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.foto}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                <button onClick={cekStatusKonfirmasi} class="flex my-4 justify-center bg-blue-700 hover:bg-blue-900s text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Cek Status Konfirmasi
                </button>
                <button onClick={goToRegistration} class="flex justify-center bg-blue-700 hover:bg-blue-900s text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Registrasi Peserta
                </button>
                </div>
            </div>
        </div>
    )
}

export default ListPeserta