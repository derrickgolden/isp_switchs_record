"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCustomerInvoice_1 = require("../dbServices/invoices/getCustomerInvoice");
const updateInvoiceDetails_1 = require("../dbServices/invoices/updateInvoiceDetails");
const router = express_1.default.Router();
router.get('/get-details/:sale_id', async (req, res) => {
    const { sale_id } = req.params;
    try {
        const response = await (0, getCustomerInvoice_1.getCustomerInvoiceDetails)(sale_id);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/update', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, updateInvoiceDetails_1.upadateInvoiceDetails)(body);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=invoices.js.map