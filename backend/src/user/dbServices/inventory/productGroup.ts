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
            await connection.beginTransaction();

            const [res] = await connection.query(`
            INSERT INTO switch_details(box_id, switch_no, total_ports, description)
            VALUES (?, ?, ?, ?)
        `, [box_id, switch_no, total_ports, description]);

        const insert_id = res.insertId; // Correctly extract the insert_id

        for (let i = 1; i <= Number(total_ports); i++) {
            await connection.query(`
                INSERT INTO port_details(switch_id, port_no, status, description)
                VALUES (?, ?, 'unconnected', '')
            `, [insert_id, i]); // Assuming initial status is 'inactive' and description is empty
        }

        await connection.commit();
       
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

    try{
    var [res] = await connection.query(`
        SELECT 
            bd.shop_id,
            bd.box_id,
            bd.site_id,
            bd.building_name,
            bd.description AS box_description,
            sd.site_location,
            sd.description AS site_description,
            IFNULL(
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'switch_id', sw.switch_id,
                        'switch_no', sw.switch_no,
                        'total_ports', sw.total_ports,
                        'description', sw.description,
                        'ports', (
                            SELECT IFNULL(
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'port_id', pd.port_id,
                                        'port_number', pd.port_no,
                                        'status', pd.status,
                                        'description', pd.description,
                                        'client_details', IFNULL(
                                            JSON_OBJECT(
                                                'username', cd.username,
                                                'house_no', cd.house_no,
                                                'phone', cd.phone
                                            ), 
                                            JSON_OBJECT(
                                                'username', NULL,
                                                'house_no', NULL,
                                                'phone', NULL
                                            )
                                        )
                                    )
                                ), JSON_ARRAY())
                            FROM port_details pd
                            LEFT JOIN client_details cd ON pd.port_id = cd.port_id
                            WHERE pd.switch_id = sw.switch_id
                        )
                    )
                ), JSON_ARRAY()
            ) AS switches
        FROM 
            box_details bd
        JOIN 
            site_details sd ON bd.site_id = sd.site_id
        LEFT JOIN 
            switch_details sw ON bd.box_id = sw.box_id
        WHERE 
            bd.shop_id = ? -- Replace ? with the specific shop_id or pass it as a parameter
        GROUP BY 
            bd.box_id, sd.site_id;
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