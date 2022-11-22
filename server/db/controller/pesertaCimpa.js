const db = require('../model')
const PesertaCimpa = db.pesertaCimpa
const {cloudinary} = require('../../util/Cloudinary')

exports.create = (req, res) => {
    //create peserta cimpa 
    // console.log("TEST SEBELUM")
    const pesertaCimpa = {
        nama: req.body.nama,
        klasis: req.body.klasis, 
        runggun: req.body.runggun, 
        pesertaId: req.body.pesertaId,
        jenisKelamin: req.body.jenisKelamin,
        noTelp: req.body.noTelp,
        linkSosmed: req.body.linkSosmed,
        buktiBayar: req.body.buktiBayar,
        foto: req.body.foto,
        isConfirmed: false,
    };
    PesertaCimpa.create(pesertaCimpa)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: 
                    err.message || "Failed to create peserta"
            })
        })
}