"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCustomerDetails = void 0;
const { pool } = require("../../../mysqlSetup");
const editCustomerDetails = async (customerDetails) => {
    const { full_name, email, address, shop_id, customer_id } = customerDetails;
    const connection = await pool.getConnection();
    try {
        var [res] = await connection.query(`
            UPDATE customer_list
            SET full_name = ?, email = ?, address = ?
            WHERE shop_id = ? AND customer_id = ?;
        `, [full_name, email, address, shop_id, customer_id]);
        connection.release();
        return {
            success: true,
            msg: `Customer details updated`,
            details: res
        };
    }
    catch (error) {
        console.error('Error:', error.message);
        connection.release();
        if (error.sqlMessage) {
            return { success: false, msg: "Database Error", err: error.sqlMessage };
        }
        else {
            return { success: false, msg: "Sorry, an error occured", err: error.message };
        }
    }
};
exports.editCustomerDetails = editCustomerDetails;
//# sourceMappingURL=editCustomerDetails.js.map