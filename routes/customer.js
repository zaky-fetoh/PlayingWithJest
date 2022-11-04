const custLogic = require("../controller/customer");
const express = require("express")


module.exports = express.Router()
    .post(custLogic.addCustomer)
    .get("/:custId",custLogic.getCustomer)
    .put("/:custId",custLogic.updateCustomer)
    .delete("/:custId",custLogic.deleteCustomer)