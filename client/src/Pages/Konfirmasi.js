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
    // const uploadFoto = (id, event) => {
    //     event.preventDefault();
    //     console.log(id)
    //     // console.log("TEST")
    //     const value = event.target.files[0]
    //     const formData = new FormData()
    //     formData.append('file', value)
    //     formData.append('klasis', klasis)
    //     Axios.post("/api/pesertaCimpa/UpdateBuktiBayar", formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     })
    //         .then((response) => {
    //             console.log(response)
    //             window.location.reload()
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    // const deleteBukti = (id, event) => {
    //     event.preventDefault();
    //     console.log(id)
    //     Axios.put("/api/pesertaCimpa/ChangeBuktiBayar/" + id)
    //         .then((response) => {
    //             console.log(response)
    //             window.location.reload()
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const konfirmasi = (id, event) => {
        event.preventDefault();
        Axios.put("/api/pesertaCimpa/UpdateKonfirmasi", {
            id : id
        })
            .then((response) => {
                console.log(response)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
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
                    </div>  
                ) : (
                    <div>
                        <div className="flex justify-center text-5xl mt-16 mb-16 lg:mt-8 lg:mb-4 lg:text-3xl">Status Konfirmasi</div>
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 p-16">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full border text-center text-3xl lg:text-sm">
                                    <thead class="border-b">
                                        <tr>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            No.
                                        </th>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Nama
                                        </th>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Id Peserta
                                        </th>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Status Konfirmasi
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allPeserta.map((data, index)=>(
                                            <tr className="border-b">
                                                <td class="px-6 py-4 whitespace-nowrap font-medium  border-r">
                                                    {index + 1}
                                                </td>
                                                <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                    {data.nama}
                                                </td>
                                                <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                    {data.id_peserta}
                                                </td>
                                                <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                    {data.is_confirmed ? "SUDAH" : "BELUM"}
                                                </td>
                                                <td>
                                                    <button className="bg-green-700 px-4 py-2 rounded" onClick={(event) => konfirmasi(data.id, event)}>
                                                        Konfirmasi
                                                    </button>
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
                <div className="px-16">
                    <button 
                        onClick={goBack}
                        className="flex my-4 mx-6 lg:mx-8 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Konfirmasi;