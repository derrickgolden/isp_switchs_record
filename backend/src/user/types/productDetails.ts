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
export interface productDetailsProps{
    price: number,
    package_cost: string, 
    package_size: number,
    shop_id: number,
    product_code: string, 
    product_name: string, 
    stock_qty: number, 
    instructions: string, 
    side_effect: string, 
    group_id: number,
    img_path: string,
    
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