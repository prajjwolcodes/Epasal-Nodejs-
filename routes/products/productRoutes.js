const multer = require("multer")
const { createProduct, getProduct, getSingleProduct, deleteProduct, editProduct } = require("../../controller/admin/productController")
const { isAuthenticated } = require("../../middleware/isAuthenticated")
const { permitTo } = require("../../middleware/permitTo")
const { storage } = require("../../middleware/multer")
const tryCatch = require("../../services/tryCatch")

const upload = multer({ storage: storage })

const router = require("express").Router()

router.route("/product")
    .post(isAuthenticated, permitTo, upload.single("productImage"), tryCatch(createProduct))
    .get(getProduct)

router.route("/product/:id").get(getSingleProduct)
    .delete(isAuthenticated, permitTo, tryCatch(deleteProduct))
    .patch(upload.single("productImage"), tryCatch(editProduct))

module.exports = router