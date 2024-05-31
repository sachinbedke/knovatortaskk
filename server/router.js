const { getCarts, addCart } = require("./controller")

const router = require("express").Router()

router
    .get("/", getCarts)
    .post("/add", addCart)



module.exports = router