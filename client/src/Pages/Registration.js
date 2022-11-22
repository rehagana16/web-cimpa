//TODO 
//Create global state to know how many people have already 

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import data from "../data/data"
// import util from "../service/util";
// import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../config/axios";

const form = {
    nama: "",
    runggun: "",
    klasis: "",
    jenisKelamin: "",
    noTelp: "",
    linkSosmed: "",
    foto: "TEST FOTO",
    buktiBayar: "TEST BUKTI PEMBAYARAN", 
    pesertaId: "xxxxxxxxx",
    isConfirmed: false,
}

function Registration() {
    const navigate = useNavigate();

    // const currKlasis = util.getCookie("token") != "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";
    const currKlasis = "Pembangunan Medan Delitua"
    let ListRunggun = [];
    if (currKlasis) {
        const rungguns = data[currKlasis];
        form.klasis = currKlasis;
        ListRunggun = rungguns.map((runggun) =>
            <option>{runggun}</option>
        )
    }

    // const [dataKlasis, setDataKlasis] = useState('');

    const [linkFoto, setLinkFoto] = useState('');

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
    })

    useEffect(() => {
        document.title = "Pendaftaran";
    }, [])

    const previewFile = (value) => {
        // const reader = new FileReader();
        // console.log(value);
        // reader.readAsDataURL(value);
        // reader.onloadend = () => {
        //     setPreviewSource(reader.result);
        // }
        const formData = new FormData()
        formData.append('file', value)
        Axios.post("/api/pesertaCimpa/UploadFoto", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setLinkFoto(response.data.response_url)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onClick = (value) => {
        console.log(value)

        Axios.post("/api/pesertaCimpa/", {
            Nama: value.nama,
            Runggun: value.runggun,
            Klasis: value.klasis,
            Jenis_Kelamin: value.jenisKelamin,
            No_Telp: value.noTelp,
            Link_Sosmed: value.linkSosmed,
            // isConfirmed: value.isConfirmed,
            Bukti_Bayar: value.buktiBayar,
            Id_Peserta: value.pesertaId,
            Foto: linkFoto
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    if (currKlasis !== "") {
        return (
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
                        <div className="flex flex-col justify-center items-center height-screen">
                            <h1 className="text-3xl">Pendaftaran</h1>
                            <div className="w-1/3">
                                <div className="flex-column">
                                    <div className="justify-center inputForm">
                                        <Form className="mb-10 w-full">
                                            <div className="form-row">
                                                <label className="labelRegistration" htmlFor="nama">Nama</label>
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
                                            <label className="labelRegistration" >Jenis Kelamin</label>
                                            <div className="form-group mb-10">
                                                <div className="form-check form-check-inline">
                                                    <label>
                                                        <Field type="radio" name="jenisKelamin" value="Laki-laki" className="form-check-input" />
                                                        Laki-laki
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <label>
                                                        <Field type="radio" name="jenisKelamin" value="Perempuan" className="form-check-input" />
                                                        Perempuan
                                                    </label>
                                                </div>
                                                <ErrorMessage name="jenisKelamin" component="jenisKelamin" className="error" />
                                            </div>
                                            <div className="form-group mb-10">
                                                <label className="labelRegistration" htmlFor="runggun">Runggun</label>
                                                <Field
                                                    as="Select"
                                                    name="runggun"
                                                    id="runggun"
                                                    className={
                                                        errors.runggun && touched.runggun ? "input-error" : "form-control input-not-error"
                                                    }
                                                >
                                                    <option value="">---PILIH RUNGGUN ANDA---</option>
                                                    {ListRunggun}
                                                </Field>
                                                <ErrorMessage name="runggun" component="runggun" className="error" />
                                            </div>
                                            <div className="form-group mb-10">
                                                <label className="labelRegistration" htmlFor="noTelp">No.Telepon</label>
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
                                            <div className="form-group mb-10">
                                                <label className="labelRegistration" htmlFor="linkSosmed">Link media sosial</label>
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
                                            <input type="hidden" name="foto" value="Test Foto" />
                                            <div className="form-group marginbtm10">
                                                <label className="labelRegistration" htmlFor="foto">Foto</label>
                                                <input id="foto" name="foto" type="file" onChange={(event) => {
                                                    setFieldValue("foto", event.currentTarget.files[0]);
                                                    previewFile(event.currentTarget.files[0]);
                                                }} className={
                                                    (errors.foto) ? "input-error" : "form-control input-not-error"
                                                } />
                                                <div className="warning">File harus berupa foto(jpg/jpeg/png) dan ukuran lebih kecil dari 10MB</div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!(dirty && isValid && doneUpload)}>{!doneUpload ? "Sedang Mengunggah" : "Submit"}</button>
                                        </Form>
                                        <Link to="/dataPeserta/?q=1" ><button
                                            className="btn btn-primary">Lihat data</button></Link>
                                    </div>
                                </div >
                            </div >
                        </div>
                    )
                }}
            </Formik >

        )
    } else if (currKlasis === "") {
        return (
            <div className="d-flex justify-content-center align-items-center full-height-box flex-column">
                <h1> Anda belum login/Sesi anda telah habis </h1>
                <h1> Harap login kembali </h1>
                <Link to="/"><button className="btn btn-primary">Kembali ke login</button></Link>
            </div>
        )
    }
}

export default Registration;