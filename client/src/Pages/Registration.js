//TODO 
//Create global state to know how many people have already 

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import data from "../data/data"
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../config/axios"
import NavButton from "../Components/NavButton";

const form = {
    nama: "",
    runggun: "",
    klasis: "",
    jenisKelamin: "",
    noTelp: "",
    email: "",
    sizeBaju: "",
    linkSosmed: "",
    foto: "",
    buktiBayar: "", 
    pesertaId: "xxxxxxxxx",
    isConfirmed: false,
}

function Registration() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")
    const [cookies, setCookie] = useCookies(['user'])
    var decoded = jwt_decode(cookies.Token)
    const currKlasis = decoded.klasis
    let ListRunggun = [];
    let listSizeBaju = ["S", "M", "L", "XL", "XXL", "XXXL"]
    if (currKlasis) {
        const rungguns = data[currKlasis];
        form.klasis = currKlasis;
        ListRunggun = rungguns.map((runggun) =>
            <option className="text-black">{runggun}</option>
        )
    }

    let ListSize = listSizeBaju.map((size) => (
        <option className="text-black">{size}</option>
    ))
    // const [dataKlasis, setDataKlasis] = useState('');

    const [linkFoto, setLinkFoto] = useState('');

    const [linkBuktiBayar, setLinkBuktiBayar] = useState('')

    const [doneUpload, setDoneUpload] = useState(true);

    const FILE_SIZE = 10 * 1024 * 1024;

    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/png'
    ]

    const registerSchema = Yup.object().shape({
        nama: Yup.string()
            .required("Harap isi nama lengkap anda"),
        runggun: Yup.string()
            .required("Harap pilih runggun anda"),
        noTelp: Yup.string()
            .required("Harap masukkan nomor telepon aktif anda")
            .matches(/^(08)(\d{2})(\d{5,9})$/g,
                "Invalid phone number"
            ),
        email: Yup.string()
            .required("Harap masukkan email anda"),
        sizeBaju: Yup.string()
            .required("Harap pilih size baju anda"),
        linkSosmed: Yup.string()
            .required("Harap masukkan link media sosial anda(Instagram/Facebook)"),
        jenisKelamin: Yup.string()
            .required("Harap pilih jenis kelamin anda"),
        foto: Yup
            .mixed()
            .required("Harap masukkan foto anda")
            .test(
                "foto",
                "Harap masukkan file lebih kecil dari 10MB",
                value => {
                    return value && value.size <= FILE_SIZE;
                }
            )
            .test(
                "foto",
                "Harap Masukkan foto berupa jpeg/jpg/png",
                value => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                }
            ),
        buktiBayar: Yup
            .mixed()
            .required("Harap masukkan bukti bayar anda")
            .test(
                "Bukti Bayar",
                "Harap masukkan file lebih kecil dari 10MB",
                value => {
                    return value && value.size <= FILE_SIZE;
                }
            )
            .test(
                "Bukti Bayar",
                "Harap Masukkan foto berupa jpeg/jpg/png",
                value => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                }
            ),
    })

    useEffect(() => {
        document.title = "Pendaftaran";
    }, [])

    // useEffect(() => {
    //     console.log("LINK FOTO")
    //     console.log(linkFoto)
    //     console.log("LINK BUKTI BAYAR")
    //     console.log(linkBuktiBayar)
    // }, [linkBuktiBayar, linkFoto])

    const uploadFile = (value) => {
        const formData = new FormData()
        formData.append('file', value)
        setDoneUpload(false)
        Axios.post("/api/pesertaCimpa/UploadFoto", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setLinkFoto(response.data.response_url)
                setDoneUpload(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const uploadBuktiBayar = (value) => {
        const formData = new FormData()
        formData.append('file', value)
        setDoneUpload(false)
        Axios.post("/api/pesertaCimpa/UploadFoto", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setLinkBuktiBayar(response.data.response_url)
                setDoneUpload(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onClick = (value) => {

        Axios.post("/api/pesertaCimpa/", {
            Nama: value.nama,
            Runggun: value.runggun,
            Klasis: value.klasis,
            Jenis_Kelamin: value.jenisKelamin,
            No_Telp: value.noTelp,
            Link_Sosmed: value.linkSosmed,
            Email: value.email,
            Size_Baju: value.sizeBaju,
            Id_Peserta: value.pesertaId,
            Foto: linkFoto,
            Bukti_Bayar: linkBuktiBayar,
        })
            .then((response) => {
                console.log(response)
                setMessage("UPLOAD BERHASIL")
                setShowModal(true)
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    if (currKlasis !== "") {
        return (
            <div className="h-screen lg:h-full">
            <Formik
                initialValues={form}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                    onClick(values)
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid, dirty, setFieldValue, values } = formik;
                    return (
                        <div className="flex flex-col p-8 justify-center items-center text-3xl h-screen lg:h-full lg:text-sm">
                            <div className="w-full lg:w-1/3">
                                <div className="flex-column">
                                    <div className="justify-center inputForm">
                                        <Form className="mb-10 w-full">
                                            <div className="form-row">
                                                <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm">Nama</label>
                                                <Field
                                                    type="text"
                                                    name="nama"
                                                    id="nama"
                                                    className={
                                                        errors.nama && touched.nama ? "input-error" : "form-control input-not-error"
                                                    }
                                                />
                                                <ErrorMessage name="nama" component="nama" className="error" />
                                            </div>
                                            <div className="form-row">
                                                <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm">Jenis Kelamin</label>
                                                <div className="form-group">
                                                    <div className="form-check form-check-inline">
                                                        <label className="text-lg text-[#eba110]">
                                                            <Field type="radio" name="jenisKelamin" value="Laki-laki" className="form-check-input" />
                                                            Laki-laki
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <label className="text-lg text-[#eba110]">
                                                            <Field type="radio" name="jenisKelamin" value="Perempuan" className="form-check-input" />
                                                            Perempuan
                                                        </label>
                                                    </div>
                                                    <ErrorMessage name="jenisKelamin" component="jenisKelamin" className="error" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="runggun">Runggun</label>
                                                <Field
                                                    as="Select"
                                                    name="runggun"
                                                    id="runggun"
                                                    className={
                                                        errors.runggun && touched.runggun ? "input-error" : "form-control input-not-error"
                                                    }
                                                >
                                                    <option className="text-black" value="">---PILIH RUNGGUN ANDA---</option>
                                                    {ListRunggun}
                                                </Field>
                                                <ErrorMessage name="runggun" component="runggun" className="error" />
                                            </div>
                                            <div className="form-row">
                                                    <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="noTelp">No.Telepon</label>
                                                    <Field
                                                        type="text"
                                                        name="noTelp"
                                                        id="noTelp"
                                                        className={
                                                            errors.noTelp && touched.noTelp ? "input-error" : "form-control input-not-error"
                                                        }
                                                    />
                                                    <ErrorMessage name="noTelp" component="noTelp" className="error" />
                                            </div>
                                            <div className="form-row">
                                                    <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="email">Email</label>
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        className={
                                                            errors.email && touched.email ? "input-error" : "form-control input-not-error"
                                                        }
                                                    />
                                                    <ErrorMessage name="noTelp" component="noTelp" className="error" />
                                            </div>
                                            <div className="form-row">
                                                <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="sizeBaju">Size Baju</label>
                                                <Field
                                                    as="Select"
                                                    name="sizeBaju"
                                                    id="sizeBaju"
                                                    className={
                                                        errors.sizeBaju && touched.sizeBaju ? "input-error" : "form-control input-not-error"
                                                    }
                                                >
                                                    <option className="text-black" value="">---PILIH SIZE BAJU ANDA---</option>
                                                    {ListSize}
                                                </Field>
                                                <ErrorMessage name="sizeBaju" component="sizeBaju" className="error" />
                                            </div>
                                            <div className="form-row">
                                                
                                                    <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="linkSosmed">Link media sosial</label>
                                                    <Field
                                                        type="text"
                                                        name="linkSosmed"
                                                        id="linkSosmed"
                                                        className={
                                                            errors.linkSosmed && touched.linkSosmed ? "input-error" : "form-control input-not-error"
                                                        }
                                                    />
                                                    <ErrorMessage name="linkSosmed" component="linkSosmed" className="error" />

                                            </div>
                                            <div className="form-row">
                                                <input type="hidden" name="foto" value="Test Foto" />
                                                
                                                    <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="foto">Foto</label>
                                                    <input id="foto" name="foto" type="file" onChange={(event) => {
                                                        setFieldValue("foto", event.currentTarget.files[0]);
                                                        uploadFile(event.currentTarget.files[0]);
                                                    }} className={
                                                        (errors.foto) ? "input-error" : "form-control input-not-error"
                                                    } />
                                                    <div className="warning">File harus berupa foto(jpg/jpeg/png) dan ukuran lebih kecil dari 10MB</div>

                                            </div>
                                            <div className="form-row">
                                                <input type="hidden" name="buktiBayar" value="Bukti Bayar" />
                                                
                                                    <label className="text-3xl text-[#6B778C] mb-2 lg:text-sm" htmlFor="buktiBayar">Bukti Bayar</label>
                                                    <input id="buktiBayar" name="buktiBayar" type="file" onChange={(event) => {
                                                        setFieldValue("buktiBayar", event.currentTarget.files[0]);
                                                        uploadBuktiBayar(event.currentTarget.files[0]);
                                                    }} className={
                                                        (errors.buktiBayar) ? "input-error" : "form-control input-not-error"
                                                    } />
                                                    <div className="warning">File harus berupa foto(jpg/jpeg/png) dan ukuran lebih kecil dari 10MB</div>

                                            </div>
                                            <button
                                                type="submit"
                                                className={!(dirty && isValid && doneUpload) 
                                                                ? "flex m-0 justify-center bg-gray-500 hover:bg-gray-700s text-white font-bold py-2 px-4 border border-blue-700 rounded btn-primary"
                                                                : "flex my-4 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded"}
                                                disabled={!(dirty && isValid && doneUpload)}>{!doneUpload ? "Sedang Mengunggah" : "Submit"}</button>
                                        </Form>
                                    </div>
                                </div >
                            </div >
                        </div>
                    )
                }}
            </Formik >
            {showModal ? (
                <>
                    <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 bg-[#c2451e] text-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                            <div className="relative p-6 flex-auto">
                                "{message}"
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
            </div>
        )
    } else if (currKlasis === "") {
        return (
            <div className="d-flex justify-content-center align-items-center full-height-box flex-column">
                <h1> Anda belum login/Sesi anda telah habis </h1>
                <h1> Harap login kembali </h1>
                <Link to="/"><button className="flex my-4 justify-center bg-[#c2451e] text-white hover:bg-blue-900s font-bold py-2 px-4 border border-[#c2451e] rounded">Kembali ke login</button></Link>
            </div>
        )
    }
}

export default Registration;