import {React, useEffect, useState} from "react"
import { useLocation } from "react-router-dom"
import { Axios } from "../config/axios"

function Konfirmasi(){

    const [allPeserta, setAllPeserta] = useState(null)
    const search = useLocation().search;
    const klasis = new URLSearchParams(search).get('klasis')
    console.log(klasis)
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
                                    Id Peserta
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Status Konfirmasi
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Bukti_Bayar
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
                                            {data.id_peserta}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.is_confirmed ? true : false}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.bukti_bayar}
                                        </td>
                                        <td>
                                            <button class="flex justify-center bg-blue-700 hover:bg-blue-900s text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                                Upload Bukti Bayar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )

}

export default Konfirmasi;