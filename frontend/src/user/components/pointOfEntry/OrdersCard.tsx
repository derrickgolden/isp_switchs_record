import { FaRegNoteSticky } from "react-icons/fa6";
import { CommonSalesEntryProps } from "../../sections/pointOfEntry/types";
import { OrderDetail } from "../../pages/SalesEntry";

interface OrdersCardProps extends CommonSalesEntryProps{
    order: OrderDetail;
}

const OrdersCard: React.FC< OrdersCardProps > = ({ order, handleEditOrder}) =>{
    const { activeCard, product_name, units, price, discount,
        customer_note, refund_units, sub_total } = order;

    return(
        <div onClick={() => handleEditOrder(order)}
            className={`p-2 order-display col-12
            ${activeCard? "order-display-bg" : ""}`}>
                <div 
                    className={`d-flex justify-content-between `}>
                        <div>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span className="text-poppins-semibold" style={{ whiteSpace: 'nowrap' }}>
                                {product_name}
                            </span>
                        </div>
                            <p className="mb-0"> 
                                <span className="text-poppins-semibold">
                                    { units } &nbsp;
                                </span> 
                                Units * {price} Ksh / Unit
                            </p> 
                            {
                                discount > 0 && 
                                <p className="mb-0 fst-italic"> With  &nbsp;
                                    <span className="text-poppins-semibold fst-italic">Ksh.{
                                        discount
                                    } &nbsp; </span> 
                                    discount per Unit
                                </p>                          
                            }                         
                            {
                                refund_units > 0 && 
                                <p className="mb-0 fst-italic"> To refund:&nbsp;
                                    <span className="text-poppins-semibold fst-italic">
                                        { refund_units } &nbsp; 
                                    </span>Unit(s)
                                </p>                          
                            }                         
                        </div>
                        <div className="text-poppins-semibold pl-3">
                            Ksh.{sub_total}
                        </div>
                </div>
                {
                    customer_note && (
                        <p className="mb-0 px-2 text-poppins " style={{backgroundColor: "#d6f7f7"}}>
                            <FaRegNoteSticky /> {customer_note}
                        </p>
                    )
                }
        </div>
    )
}

export default OrdersCard