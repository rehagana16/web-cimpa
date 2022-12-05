import {React, useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Axios } from "../config/axios"

function Konfirmasi(){

    const navigate = useNavigate()
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
    const goBack = () => {
        navigate("/listPeserta")
    }
    const uploadFoto = (id, event) => {
        event.preventDefault();
        console.log(id)
        // console.log("TEST")
        const value = event.target.files[0]
        const formData = new FormData()
        formData.append('file', value)
        formData.append('id', id)
        Axios.post("/api/pesertaCimpa/UpdateBuktiBayar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log(response)
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
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
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                    Upload Bukti Bayar
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
                                            {data.is_confirmed ? "SUDAH" : "BELUM"}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.bukti_bayar === "" ? "BELUM ADA" : <a href={data.bukti_bayar}> Link Bukti Bayar</a>}
                                        </td>
                                        <td>
                                            {data.bukti_bayar === "" ? (<input 
                                                type="file"
                                                name="bukti_bayar" 
                                                onChange={(event) => {uploadFoto(data.id, event)}}
                                                class="flex justify-center py-2 px-4 rounded"
                                            />) : null}
                                                {/* {klasis === "Admin" ? "Konfirmasi" : "Upload Bukti Bayar"} */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <button 
                        onClick={goBack}
                        className="flex justify-center bg-blue-700 hover:bg-blue-900s text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                        Back
                    </button>
                </div>
                <div>
                </div>
            </div>
        </div>
    )

}

export default Konfirmasi;