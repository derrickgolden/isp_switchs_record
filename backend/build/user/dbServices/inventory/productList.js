"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProductList = exports.updatePort = void 0;
const { pool } = require("../../../mysqlSetup");
;
const updatePort = async (portDetails) => {
    const { status, port_id, port_number, description, clientDetails } = portDetails;
    const { house_no, phone, username } = clientDetails;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        var [products] = await connection.query(`
                UPDATE port_details
                SET status = ?, description = ?
                WHERE port_id = ?
            `, [status, description, port_id]);
        if (house_no || phone || username) {
            var [resp] = await connection.query(`
                    UPDATE client_details
                    SET house_no = ?, phone = ?, username = ?
                    WHERE port_id = ?
                `, [house_no, phone, username, port_id]);
            if (resp.affectedRows === 0 && resp.changedRows === 0) {
                var [resp] = await connection.query(`
                        INSERT INTO client_details (house_no, phone, username, port_id)
                        VALUES  ( ?, ?, ?, ? )
                    `, [house_no, phone, username, port_id]);
                // console.log("No rows were updated.");
            }
            // console.log(resp);
        }
        await connection.commit();
        connection.release();
        return {
            success: true,
            msg: `Port ${port_number} has been updated`,
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
            return { success: false, msg: error.message };
        }
    }
};
exports.updatePort = updatePort;
const getProductList = async (details) => {
    const { shop_id } = details;
    const connection = await pool.getConnection();
    try {
        var [res] = await connection.query(`
            SELECT
                ml.product_id,
                ml.product_code,
                ml.product_name,
                ml.instructions,
                ml.side_effect,
                ml.img_path,
                mg.group_id,
                mg.group_name,
                mg.description,
                s.containers AS stock_qty,
                s.units_per_container,
                s.open_container_units,
                s.last_stocked,
                s.warning_limit
            FROM
                product_list ml
            JOIN
                product_group mg ON ml.group_id = mg.group_id
            LEFT JOIN
                stock s ON ml.product_id = s.product_id
            WHERE mg.shop_id = ?
            `, [shop_id]);
        connection.release();
        return {
            success: true,
            msg: `Product list`,
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
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
};
exports.getProductList = getProductList;
const deleteProduct = async (product_id) => {
    const connection = await pool.getConnection();
    try {
        var [res] = await connection.query(`
            DELETE FROM product_list
            WHERE product_id = ?;
        `, [product_id]);
        connection.release();
        return {
            success: true,
            msg: `Product deleted`,
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
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
};
exports.deleteProduct = deleteProduct;
module.exports = {
    updatePort: exports.updatePort,
    getProductList: exports.getProductList,
    deleteProduct: exports.deleteProduct,
};
//# sourceMappingURL=productList.js.map