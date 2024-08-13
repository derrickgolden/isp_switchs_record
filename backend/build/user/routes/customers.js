"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addCustomer_1 = require("../dbServices/customers/addCustomer");
const editCustomerDetails_1 = require("../dbServices/customers/editCustomerDetails");
const getCustomers_1 = require("../dbServices/customers/getCustomers");
const router = express_1.default.Router();
router.post('/add-customer', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, addCustomer_1.addCustomer)(body);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/get-list', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, getCustomers_1.getCustomerList)(body);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.patch('/edit-details', async (req, res) => {
    const customerDetails = req.body;
    try {
        const response = await (0, editCustomerDetails_1.editCustomerDetails)(customerDetails);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=customers.js.map