"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomer = void 0;
const { pool } = require("../../../mysqlSetup");
;
const addCustomer = async (customerDetails) => {
    const { full_name, email, country, phone, address, shop_id } = customerDetails;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        var [customers] = await connection.query(`
                SELECT full_name FROM customer_list
                WHERE shop_id = ?
            `, [shop_id]);
        const customerExists = customers.some(customer => customer.full_name === full_name);
        if (customerExists) {
            return {
                success: false,
                msg: `${full_name} is already registered.`,
                details: []
            };
        }
        else {
            var [res] = await connection.query(`
                    INSERT INTO customer_list (full_name, email, country, phone, address, shop_id)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [full_name, email, country, phone, address, shop_id]);
        }
        await connection.commit();
        return {
            success: true,
            msg: `${full_name} has been Registered`,
            details: []
        };
    }
    catch (error) {
        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        }
        else {
            return { success: false, msg: "Error while adding customer", err: error.message };
        }
    }
    finally {
        connection.release();
    }
};
exports.addCustomer = addCustomer;
module.exports = { addCustomer: exports.addCustomer };
//# sourceMappingURL=addCustomer.js.map