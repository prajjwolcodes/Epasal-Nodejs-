const { deleteUser, getAllUser } = require("../../controller/admin/adminUserController")
const { isAuthenticated } = require("../../middleware/isAuthenticated")
const { permitTo } = require("../../middleware/permitTo")
const tryCatch = require("../../services/tryCatch")

const router = require("express").Router()

router.route("/users").get(isAuthenticated, permitTo, tryCatch(getAllUser))
router.route("/users/:id").delete(isAuthenticated, permitTo, tryCatch(deleteUser))

module.exports = router
