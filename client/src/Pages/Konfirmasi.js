import {React, useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import selectStyles from "./select.module.css"
import daftarKlasis from "../data/daftarKlasis";
import { Axios } from "../config/axios"
import { useCookies } from "react-cookie"
import jwt_decode from "jwt-decode"
import util from "../services/util"

function Konfirmasi(){

    const [cookies, setCookie] = useCookies(['user'])
    const [loading, setLoading] = useState(false)
    var decoded = jwt_decode(cookies.Token)
    const klasis = decoded.klasis
    const navigate = useNavigate()
    const [allPeserta, setAllPeserta] = useState(null)
    const [filterKlasis, setFilterKlasis] = useState("")
    const listKlasis = daftarKlasis
    const getAllPesertaByKlasis = async () => {
        try {
            setLoading(true)
            var currKlasis = klasis
            if (klasis === "Bendahara") {
                currKlasis = "Admin"
            }
            const res = await Axios.get("api/pesertaCimpa/?klasis=" + currKlasis)
            if (res) {
                setAllPeserta(res.data)
                console.log(res)
            } 
            setLoading(false)
        } catch(err) {
            console.error("ERROR WHEN FETCH ALL PESERTA IN KLASIS")
        }
            // .then((res) => {
            //     setAllPeserta(res.data)
            //     console.log(res.data)
            // })
            // .catch(() => {
            //     console.log("ERROR WHEN FETCH ALL PESERTA IN KLASIS")
            // })
    }
    const goBack = () => {
        navigate("/listPeserta")
    }

    const goToHome = () => {
        navigate("/")
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

    const konfirmasi = async (data, event) => {
        event.preventDefault();
        const klasisCode = util.getKlasisCode(data.klasis)
        const runggunCode = util.getRunggunCode(data.klasis, data.runggun)
        const jenisKelaminCode = util.getJenisKelaminCode(data.jenis_kelamin)
        try {
            setLoading(true)
            const res = await Axios.put("/api/pesertaCimpa/UpdateKonfirmasi", {
                id : data.id,
                klasisCode : klasisCode,
                runggunCode : runggunCode,
                jenisKelaminCode : jenisKelaminCode,
                email : data.email
            })
            if(res) {
                window.location.reload()
            }
            setLoading(false)   
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAllPesertaByKlasis();
    }, [])

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
        <div className="flex flex-col items-center justify-center h-screen lg:h-full">
            <div class="flex flex-col text-xl h-full text-white justify-center lg:text-sm">
                {allPeserta === null ? (
                    <div className="flex text-5xl items-center justify-center py-32">
                        BELUM ADA PESERTA TERDAFTAR
                    </div>  
                ) : (
                    <div>
                        {/* <div className="flex justify-center text-5xl mt-16 mb-16 lg:mt-8 lg:mb-4 lg:text-3xl">Status Konfirmasi</div> */}
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 p-16">
                            {klasis === "Admin" || klasis ==="Bendahara" ? (
                                <div className="sm:px-6 lg:px-8">
                                    <select onChange={onChangeFilter} className={selectStyles.select}>
                                        <option className={selectStyles.option} value="Admin">All Klasis</option>
                                        {(listKlasis.map((data) => (
                                            <option className={selectStyles.option} value={data}>{data}</option>
                                        )))}
                                    </select>
                                </div>
                            ) : (null)}
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full border text-center text-3xl lg:text-sm">
                                    <thead class="border-b">
                                        <tr>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Nomor.
                                        </th>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Nama
                                        </th>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Id Peserta
                                        </th>
                                        <th scope="col" class="font-medium  px-6 py-4 border-r">
                                            Bukti Bayar
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
                                                    <a href={data.bukti_bayar}>Link Bukti Bayar</a>
                                                </td>
                                                <td class=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                    {data.is_confirmed ? "SUDAH" : "BELUM"}
                                                </td>
                                                {klasis === "Admin" ? (null) : (
                                                    <td className=" font-light px-6 py-4 whitespace-nowrap border-r">
                                                        {data.is_confirmed ?  (
                                                            (null)
                                                        ) : (
                                                            <button className="bg-green-700 px-4 py-2 rounded font-semibold" onClick={(event) => konfirmasi(data, event)}>
                                                                Konfirmasi
                                                            </button>
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {loading ? (
                <>
                    <div className="loader-container h-screen">
                        <div className="spinner">

                        </div>
                    </div>
                </>
            ) : (null)}
        </div>
    )

}

export default Konfirmasi;