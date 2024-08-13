"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentDetails = exports.addPaymentDetails = void 0;
const { pool } = require("../../../mysqlSetup");
const addPaymentDetails = async (body) => {
    const { payment_name, paymentDetails, shop_id } = body;
    const details = JSON.stringify(paymentDetails);
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        var [res] = await connection.query(`
            INSERT INTO payment_details (payment_name, details, shop_id)
            VALUES (?, ?, ?)
        `, [payment_name, details, shop_id]);
        await connection.commit();
        connection.release();
        return {
            success: true,
            msg: `${payment_name} has been Registered`,
            details: []
        };
    }
    catch (error) {
        console.error('Error:', error.message);
        connection.release();
        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        }
        else {
            return { success: false, msg: "Error while adding customer", err: error.message };
        }
    }
};
exports.addPaymentDetails = addPaymentDetails;
const getPaymentDetails = async (body) => {
    const { shop_id } = body;
    const connection = await pool.getConnection();
    try {
        var [res] = await connection.query(`
            SELECT * FROM payment_details
            WHERE shop_id = ?
        `, [shop_id]);
        connection.release();
        return {
            success: true,
            msg: `Payment Details`,
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
            return { success: false, msg: "Error while fetching payment details", err: error.message };
        }
    }
};
exports.getPaymentDetails = getPaymentDetails;
module.exports = {
    addPaymentDetails: exports.addPaymentDetails,
    getPaymentDetails: exports.getPaymentDetails
};
//# sourceMappingURL=paymentDetails.js.map