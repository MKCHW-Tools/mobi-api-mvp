const express = require("express");
const controller = require('../controllers/admin')
const response = require('../helpers/sendResponse')

const adminRouter = express.Router();

adminRouter.get('/users', async (req, res) => {
    // #swagger.tags = ['Admin']
    await controller.getAllUsers(req).then((data) => {
        response.sendSuccessMessage("success", data, res)
    }).catch((err) => {
        response.sendErorMessage(err.message, "", res)
    })
})

adminRouter.patch('/user_status', async (req, res) => {
    await controller.setUserStatus(req).then((data) => {
        response.sendSuccessMessage("success", data, res)
    }).catch((err) => {
        response.sendErorMessage(err.message, "", res)
    }
    )
})

module.exports = {
    adminRouter
};