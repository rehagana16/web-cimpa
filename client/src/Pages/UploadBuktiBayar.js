import React, {useState, useEffect} from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"
import { Axios } from "../config/axios"

function UploadBuktiBayar() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")
    const [showModalTolakBukti, setShowModalTolakBukti] = useState({
        id : -1,
        visible: false
    })
    const [messageTolak, setMessageTolak] = useState("")
    const [allBukti, setAllBukti] = useState(null)
    const search = useLocation().search;
    const klasis = new URLSearchParams(search).get('klasis')
    console.log(klasis)

    const getBuktiBayarByKlasis = () => {
        Axios.get("api/buktibayar/?klasis=" + klasis)
            .then((res) => {
                setAllBukti(res.data)
                console.log(res.data)
            })
            .catch(() => {
                console.log("ERROR WHEN FETCH BUKTI BAYAR")
            })
    }

    const uploadFoto = (event) => {
        
        event.preventDefault();
        // console.log("TEST")
        setMessage("SEDANG UPLOAD MOHON DITUNGGU")
        setShowModal(true)
        const value = event.target.files[0]
        const formData = new FormData()
        formData.append('file', value)
        formData.append('klasis', klasis)
        Axios.post("/api/pesertaCimpa/UpdateBuktiBayar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setMessage("UPLOAD BERHASIL")
                setShowModal(true)
                console.log(response)
                window.location.reload()
            })
            .catch((error) => {
                setMessage("UPLOAD GAGAL")
                setShowModal(true)
                console.log(error)
            })
    }
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

    const terimaBukti = (id, event) => {
        event.preventDefault();
        console.log(id)
        Axios.put("/api/pesertaCimpa/ChangeStatusBuktiBayar", {
            id: id,
            message: "BUKTI DITERIMA"
        })
            .then((response) => {
                console.log(response)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const tolakBukti = (id, event) => {
        event.preventDefault();
        console.log(id)
        setShowModalTolakBukti({
            id : id,
            visible : true
        })
    }

    const formTolak = (event) => {
        event.preventDefault()
        console.log(showModalTolakBukti.id)
        Axios.put("/api/pesertaCimpa/ChangeStatusBuktiBayar", {
            id: showModalTolakBukti.id,
            message: messageTolak
        })
            .then((response) => {
                console.log(response)
                // window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const changeMessage = (event) => {
        event.preventDefault()
        setMessageTolak(event.target.value)
    }

    useEffect(() => {
        getBuktiBayarByKlasis()
    }, [])

    return(
        <div className="lg:p-16">
            {klasis === "Admin" ? (
                <div className="flex justify-center text-white text-5xl md:text-3xl lg:mb-4">Daftar Bukti Bayar</div>
            ) : (
                <>
                    <div className="flex justify-center text-white text-xl md:text-sm lg:mb-4">Upload Bukti Bayar</div>
                    <div class="max-w-2xl mx-auto">
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input 
                                    id="dropzone-file" 
                                    type="file"
                                    className="hidden"
                                    onChange={(event) => {uploadFoto(event)}}
                                />
                            </label>
                        </div> 
                        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
                    </div>
                </>
            )}
            {allBukti === null ? null : (
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 p-16 scrollbar">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full border text-center text-3xl md:text-lg text-white lg:text-sm">
                            <thead class="border-b">
                                <tr>
                                <th scope="col" class=" font-medium px-6 py-4 border-r">
                                    No.
                                </th>
                                <th scope="col" class=" font-medium px-6 py-4 border-r">
                                    Bukti Bayar
                                </th>
                                <th scope="col" class=" font-medium px-6 py-4 border-r">
                                    Klasis
                                </th>
                                <th scope="col" class=" font-medium px-6 py-4 border-r">
                                    Status
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBukti.map((data, index)=>(
                                    <tr className="border-b">
                                        <td class="px-6 py-4 whitespace-nowrap  font-medium border-r">
                                            {index + 1}
                                        </td>
                                        <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                        <a href={data.bukti_bayar}>Gambar bukti</a>
                                        </td>
                                        <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.klasis}
                                        </td>
                                        <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.status}
                                        </td>
                                        {/* {
                                            () => {
                                                if (klasis === "Admin") {
                                                    if (data.status === "MENUNGGU KONFIRMASI") {
                                                        return (
                                                            <td className="border-0">
                                                                <button className="mx-2" onClick={(event) => terimaBukti(data.id, event)}>
                                                                    TERIMA
                                                                </button>
                                                                <button className="mx-2">
                                                                    TOLAK
                                                                </button>
                                                            </td>
                                                        )
                                                    } else {
                                                        console.log("SALAAH MASUK")
                                                        return (
                                                            <td>
                                                               STATUS TIDAK MENUNGGU 
                                                            </td>
                                                        )
                                                    }
                                                } else {
                                                    return (
                                                        <td>
                                                            BUKAN ADMIN
                                                        </td>
                                                    )
                                                }
                                            }
                                        } */}
                                        {klasis === "Admin" ? (
                                            <>
                                            { data.status !== "MENUNGGU KONFIRMASI" ? (null) : (
                                                <td className="border-0 whitespace-nowrap">
                                                    <button className="bg-green-700 px-4 py-2 rounded" onClick={(event) => terimaBukti(data.id, event)}>
                                                        TERIMA
                                                    </button>
                                                    <button className="bg-red-700 px-4 py-2 rounded" onClick={(event) => tolakBukti(data.id, event)}>
                                                        TOLAK
                                                    </button>
                                                </td>
                                            )}
                                            </>
                                        ) : (
                                            null
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <Link to="/listPeserta" ><button
                                            className="flex my-4 mx-6 lg:mx-8 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded">Lihat data</button></Link>
            {showModal ? (
                <>
                    <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 bg-[#c2451e] text-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                            <div className="relative p-6 flex-auto">
                                "{message}"
                            </div>
                            <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
            {showModalTolakBukti.visible ? (
                <>
                    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 bg-[#c2451e] text-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                            <form onSubmit={formTolak}>
                                <div className="relative p-6 flex-auto">
                                    <textarea 
                                        className="bg-transparent border-0 focus:outline-none" 
                                        placeholder="Masukkan alasan tolak, jika kosong default = (Jumlah Uang tidak sesuai dengan seharusnya)"
                                        onChange={(event) => changeMessage(event)}
                                    />
                                </div>
                                <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                    // onClick={() => setShowModalTolakBukti(false)}
                                >
                                    Kirim
                                </button>
                                <button
                                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    onClick={() => setShowModalTolakBukti(false)}
                                >
                                    Close
                                </button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default UploadBuktiBayar;