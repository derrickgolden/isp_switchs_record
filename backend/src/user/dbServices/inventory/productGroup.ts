import { RowDataPacket } from "mysql2";
import { SwitchDetailsProps } from "user/types/productDetails";
import { BoxDetailsProps, productgroupDetails } from "user/types/productGroupTypes";
import { universalResponse } from "user/types/universalResponse";
const { pool } = require("../../../mysqlSetup");

export const addProductGroup = async (productgroupDetails: productgroupDetails ): Promise<universalResponse> => {

    const {site_location, description, shop_id} = productgroupDetails;
    
    const connection: RowDataPacket = await pool.getConnection();
    try {

            var [res] = await connection.query(`
                INSERT INTO site_details (site_location, description, shop_id)
                VALUES (?, ?, ?)
            `, [site_location, description, shop_id]);

        connection.release();

        return {
            success: true,
            msg: `Site Loacation at ${site_location} Registered`,
            details: []
        };
    } catch (error) {
        console.error('Error:', error.message);
        connection.release();

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};

export const addBoxDetails = async (productgroupDetails: BoxDetailsProps ): Promise<universalResponse> => {

    const {site_id, building_name, description, shop_id} = productgroupDetails;
    
    const connection: RowDataPacket = await pool.getConnection();
    try {

            var [res] = await connection.query(`
                INSERT INTO box_details (site_id, building_name, description, shop_id)
                VALUES (?, ?, ?, ?)
            `, [site_id, building_name, description, shop_id]);

        connection.release();

        return {
            success: true,
            msg: `Box at ${building_name} is Registered`,
            details: []
        };
    } catch (error) {
        console.error('Error:', error.message);
        connection.release();

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};

export const addSwitchDetails = async (productgroupDetails:  SwitchDetailsProps ): Promise<universalResponse> => {

    const {box_id, description, switch_no, total_ports} = productgroupDetails;
    
    const connection: RowDataPacket = await pool.getConnection();
    try {

            var [res] = await connection.query(`
                INSERT INTO switch_details(box_id, switch_no, total_ports, description)
                VALUES (?, ?, ?, ?)
            `, [box_id, switch_no, total_ports, description]);
       
        connection.release();

        return {
            err: false,
            success: true,
            msg: `New switch added successfully`,
            details: res
        };

    } catch (error) {
        console.error('Error:', error.message);
        connection.release();

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};

export const getSiteList = async ( shop_id: number): Promise<universalResponse> => {
    const connection: RowDataPacket = await pool.getConnection();
        try {
            var [res] = await connection.query(`
            SELECT * FROM site_details 
            WHERE shop_id = ?
        `, [shop_id]);

        connection.release();

        return {
            success: true,
            msg: `Site list`,
            details: res,
        };
    } catch (error) {
        console.error('Error:', error.message);
        connection.release();

        if (error.sqlMessage) {
            return { success: false, msg: "Database Error", err: error.sqlMessage };
        } else {
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
};

export const getBoxDetails = async ( shop_id: number): Promise<universalResponse> => {
    const connection: RowDataPacket = await pool.getConnection();
        try {
            var [res] = await connection.query(`
            SELECT 
                bd.shop_id,
                bd.box_id,
                bd.site_id,
                bd.building_name,
                bd.description AS box_description,
                sd.site_location,
                sd.description AS site_description,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'switch_id', sw.switch_id,
                        'switch_no', sw.switch_no,
                        'total_ports', sw.total_ports,
                        'description', sw.description
                    )
                ) AS switches
            FROM 
                box_details bd
            JOIN 
                site_details sd ON bd.site_id = sd.site_id
            JOIN 
                switch_details sw ON bd.box_id = sw.box_id
            WHERE 
                bd.shop_id = ? -- Replace ? with the specific shop_id or pass it as a parameter
            GROUP BY 
                bd.box_id;

        `, [shop_id]);

        connection.release();

        return {
            success: true,
            msg: `Site list`,
            details: res,
        };
    } catch (error) {
        console.error('Error:', error.message);
        connection.release();

        if (error.sqlMessage) {
            return { success: false, msg: "Database Error", err: error.sqlMessage };
        } else {
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
};    

module.exports = {
    addProductGroup,
    addBoxDetails,
    getSiteList,
    getBoxDetails,
    addSwitchDetails ,
}