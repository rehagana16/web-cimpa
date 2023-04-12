import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Axios } from "../config/axios";
import { FotoModal } from "../Components/FotoModal";
import jwt_decode from "jwt-decode"
import selectStyles from "./select.module.css"
import daftarKlasis from "../data/daftarKlasis";

function ListPeserta() {
    const [cookies, setCookie] = useCookies(['user'])
    const [filteredResult, setFilteredResult] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    var decoded = jwt_decode(cookies.Token)
    const klasis = decoded.klasis //will retrieved from cookie
    const navigate = useNavigate();
    const [allPeserta, setAllPeserta] = useState(null)
    const [doneUpload, setDoneUpload] = useState(true)
    const [isUploading, setIsUploading] = useState(false)
    const [isOpenPhoto, setIsOpenPhoto] = useState(false)
    const [currPhoto ,setCurrPhoto] = useState("")
    const [message, setMessage] = useState("SEDANG MENGUNGGAH")
    const [filterKlasis, setFilterKlasis] = useState("")
    const listKlasis = daftarKlasis
    const getAllPesertaByKlasis = () => {
        var currKlasis = klasis
        if (klasis === "Bendahara") {
            currKlasis = "Admin"
        }
        Axios.get("api/pesertaCimpa/?klasis=" + currKlasis)
            .then((res) => {
                setAllPeserta(res.data)
            })
            .catch(() => {
                console.log("ERROR WHEN FETCH ALL PESERTA IN KLASIS")
            })
    }

    const getAllPesertaByKlasisFilter = () => {
        if(filterKlasis === "") {
            filterKlasis = "Admin"
        }
        Axios.get("api/pesertaCimpa/?klasis=" + filterKlasis)
            .then((res) => {
                setAllPeserta(res.data)
            })
            .catch(() => {
                console.log("ERROR WHEN FETCH ALL PESERTA IN KLASIS")
            })
    }

    const changeBuktiBayar = async (id, value) => {
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', value)
        setDoneUpload(false)
        const res = await Axios.post("/api/pesertaCimpa/UploadFoto", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if (res) {
            const response = await Axios.put("/api/pesertaCimpa/ChangeBuktiBayar", {
                "Id" : id,
                "Url" : res.data.response_url
            })
            if(response) {
                setMessage("UPLOAD BERHASIL")
                window.location.reload()
            }
        } else {
            setMessage("UPLOAD PHOTO FAILED")
        }
    }


    // const handleChange = (e) => {
    //     e.preventDefault()
    //     setSearchValue(e.target.value)
    // }

    // const cekStatusKonfirmasi = () => {
    //     navigate("/konfirmasi/?klasis=" + klasis)
    // }

    // const uploadBuktiBayar = () => {
    //     navigate("/uploadbuktibayar/?klasis=" + klasis)
    // }

    // const goToRegistration = () => {
    //     navigate("/registrasi")
    // }

    const openModal = (photo) => {
        setCurrPhoto(photo)
        setIsOpenPhoto(true)
    }

    const closeModal = () => {
        setIsOpenPhoto(false)
    }

    useEffect(() => {
        getAllPesertaByKlasis()
    }, [])

    useEffect(() => {
        if(filterKlasis !== "") {
            getAllPesertaByKlasisFilter();
        }
    }, [filterKlasis])

    const onChangeFilter = (e) => {
        e.preventDefault();
        setFilterKlasis(e.target.value);

    }

    return(
        <div className="h-screen lg:h-full">
            <div class="flex flex-col text-xl h-full text-white sm:justify-center lg:text-sm">
            {allPeserta === null ? (
                <div className="flex text-5xl items-center justify-center py-32">
                    BELUM ADA PESERTA TERDAFTAR
                </div>) : (
                <div>
                    {/* <div className="flex justify-center text-5xl mt-16 mb-16 lg:mt-8 lg:mb-4 lg:text-3xl">List Peserta</div> */}
                    {klasis === "Admin" || klasis ==="Bendahara" ? (
                        <div className="sm:-mx-6 lg:-mx-8 lg:px-24 sm:px-22">
                            <select onChange={onChangeFilter} className={selectStyles.select}>
                                <option className={selectStyles.option} value="Admin">All Klasis</option>
                                {(listKlasis.map((data) => (
                                    <option className={selectStyles.option} value={data}>{data}</option>
                                )))}
                            </select>
                        </div>
                    ) : (null)}
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 px-16 scrollbar">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            
                            <div class="overflow-hidden">
                                <table class="min-w-full border text-center text-3xl lg:text-sm">
                                <thead class="border-b">
                                    <tr>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Nomor
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
                                        Email
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Size Baju
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Link Sosmed
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Foto
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Bukti Bayar
                                    </th>
                                    <th scope="col" class=" font-medium px-6 py-4 border-r">
                                        Status Konfirmasi
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {(allPeserta.map((data, index) => (
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
                                            {data.email}
                                        </td>
                                        <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.size_baju}
                                        </td>
                                        <td class="overflow-x-hidden w-3 font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.link_sosmed}
                                        </td>
                                        <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                            <a href={data.foto}>Link Foto</a>
                                        </td>
                                        <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                            <a onClick={() => openModal(data.bukti_bayar)} className="cursor-pointer">Link Bukti Bayar</a>
                                        </td>
                                        <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                                            {data.is_confirmed ? "SUDAH" : "BELUM"}
                                        </td>
                                        {klasis === "Admin" || data.is_confirmed || klasis ==="Bendahara" ? (null) : (
                                            <td className="font-light px-6 py-4 whitespace-nowrap border-r">
                                                <div>
                                                    <input type="hidden" name="buktiBayar" value="Bukti Bayar"/>
                                                    
                                                        <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="buktiBayar">Change Bukti Bayar</label>
                                                        <input id="buktiBayar" name="buktiBayar" type="file" onChange={(event) => {
                                                            changeBuktiBayar(data.id, event.currentTarget.files[0]);
                                                        }} className="form-control input-not-error"/>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                   )))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isUploading ? (
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
                                onClick={() => setIsUploading(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
            {
                isOpenPhoto ? (
                    <FotoModal closeModal={closeModal} linkFoto={currPhoto}/>
                ) : (null)
            }
            </div>
        </div>
    )
}

export default ListPeserta