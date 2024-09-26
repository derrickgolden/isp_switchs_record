"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentDetails_1 = require("../../dbServices/payments/paymentDetails");
const router = express_1.default.Router();
router.post('/add-details', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, paymentDetails_1.addPaymentDetails)(body);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/get-details', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, paymentDetails_1.getPaymentDetails)(body);
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
//# sourceMappingURL=paymentDetails.js.map