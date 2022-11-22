module.exports = app => {
    const pesertaCimpa = require("../controller/pesertaCimpa")

    var router = require('express').Router()

    router.post("/", pesertaCimpa.create)

    app.use('/api/pesertaCimpa', router)
}