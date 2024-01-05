const { updateStatus } = require("../../controller/admin/orderStatusController")
const { createOrder, viewOrders, updateOrder, cancelOrder } = require("../../controller/user/orderController")
const { isAuthenticated } = require("../../middleware/isAuthenticated")
const { permitTo } = require("../../middleware/permitTo")
const tryCatch = require("../../services/tryCatch")

const router = require("express").Router()

router.route("/order").post(isAuthenticated, tryCatch(createOrder))
router.route("/order/:id").patch(isAuthenticated, updateOrder).delete(isAuthenticated, cancelOrder).get(isAuthenticated, tryCatch(viewOrders))
router.route("/status/:id").patch(isAuthenticated, permitTo, updateStatus)

module.exports = router