"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productGroup_1 = require("../../dbServices/inventory/productGroup");
const router = express_1.default.Router();
router.post('/add-site', async (req, res) => {
    const { site_location, description, shop_id } = req.body;
    const token = req.header('Authorization');
    try {
        const response = await (0, productGroup_1.addSiteDetails)({ site_location, description, shop_id });
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/add-box', async (req, res) => {
    const { site_id, description, building_name, shop_id } = req.body;
    const token = req.header('Authorization');
    try {
        const response = await (0, productGroup_1.addBoxDetails)({ site_id, building_name, description, shop_id });
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/get-site', async (req, res) => {
    const { shop_id } = req.body;
    try {
        const response = await (0, productGroup_1.getSiteList)(shop_id);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/box-details', async (req, res) => {
    const { shop_id } = req.body;
    try {
        const response = await (0, productGroup_1.getBoxDetails)(shop_id);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        // console.log(error)
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/add-switch', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, productGroup_1.addSwitchDetails)(body);
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
//# sourceMappingURL=siteDetails.js.map