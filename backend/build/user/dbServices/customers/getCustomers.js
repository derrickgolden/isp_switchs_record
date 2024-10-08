"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerList = void 0;
const { pool } = require("../../../mysqlSetup");
const getCustomerList = async (details) => {
    const { shop_id } = details;
    const connection = await pool.getConnection();
    try {
        var [res] = await connection.query(`
            SELECT * FROM customer_list
            WHERE shop_id = ?
            `, [shop_id]);
        return {
            success: true,
            msg: `Customer list`,
            details: res
        };
    }
    catch (error) {
        if (error.sqlMessage) {
            return { success: false, msg: "Database Error", err: error.sqlMessage };
        }
        else {
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
    finally {
        connection.release();
    }
};
exports.getCustomerList = getCustomerList;
//# sourceMappingURL=getCustomers.js.map