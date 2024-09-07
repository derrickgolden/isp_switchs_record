export interface productDetailsProp{
    pricingDetails:{
        price: number,
        unit_of_mesurement: string, 
        package_size: number
    };
    newProductDetails:{
        product_code: string, 
        product_name: string, 
        stock_qty: number, 
        instructions: string, 
        side_effect: string, 
        group_id: number,
        img_path: string,
    }
}
export interface UpdatePortProps{
    status: string; 
    port_id: number;
    pre_port_id: number; 
    port_number: number;
    description: string;
    clientDetails: {
        client_id: number;
        username: string;
        phone: string;
        house_no: string;
    }
}

export interface SwitchDetailsProps{
    switch_no: string;
    total_ports: string;
    box_id: string;
    description: string;
}

export interface GetProductListProps{
    shop_id: number;
}