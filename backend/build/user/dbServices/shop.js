"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopListDetails = exports.registerShop = void 0;
const { pool } = require("../../mysqlSetup");
const registerShop = async ({ shopDetails, user, logo }) => {
    const { shop_name, location, shop_email, shop_tel, extra_info } = shopDetails;
    const { user_id } = user;
    const filename = logo?.filename || null;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        var [res] = await connection.query(`
                INSERT INTO company_details (
                    user_id, shop_name, location, shop_email, shop_tel, logo_path, extra_info
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [user_id, shop_name, location, shop_email, shop_tel, filename, extra_info]);
        const shop_id = res.insertId;
        await connection.commit();
        connection.release();
        return {
            success: true,
            msg: `Company has been Registered`,
            details: [{ shop_id }]
        };
    }
    catch (error) {
        console.error('Error:', error.message);
        connection.release();
        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        }
        else {
            return { success: false, msg: error.message };
        }
    }
};
exports.registerShop = registerShop;
const getShopListDetails = async () => {
    const connection = await pool.getConnection();
    try {
        var [res] = await connection.query(`
                SELECT * FROM company_details 
                WHERE user_id = ?
            `, [38]);
        connection.release();
        return {
            success: true,
            msg: `Company details`,
            details: res
        };
    }
    catch (error) {
        console.error('Error:', error.message);
        connection.release();
        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        }
        else {
            return { success: false, msg: error.message };
        }
    }
};
exports.getShopListDetails = getShopListDetails;
module.exports = {
    registerShop: exports.registerShop,
    getShopListDetails: exports.getShopListDetails,
};
//# sourceMappingURL=shop.js.map