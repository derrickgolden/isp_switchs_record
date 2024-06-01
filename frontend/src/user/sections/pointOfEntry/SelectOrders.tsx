import InventorySelect from "./InventorySelect";
import PoeCalcOrderDisplay from "./PoeCalcOrderDisplay";
import { InventorySelectProps, Order, PosCalcProps } from "./types";

interface SalectOrdersProps extends Omit<InventorySelectProps, 'orderDetails' | 'handlePayment'>, PosCalcProps{
    ordersList: Order[];
    showInventoryOrders: string;
}
const SelectOrders: React.FC<SalectOrdersProps> = ({handleNewOrderSelect, handleEditOrder, ordersList,
    setShowInventoryOrders, showInventoryOrders, PoeCalcHandles, selectCustomer, btnClicks}) =>{
    return(
        (() => {
            return ordersList.map((order, i) => {
            if(order.activeOrder){
                const {totalPrice, orderDetails} = order;
                return(
                    <div key={i}
                    className="sales-entry-container d-flex flex-column flex-md-row col-12">
                    <PoeCalcOrderDisplay 
                        showInventoryOrders = {showInventoryOrders}
                        handleEditOrder={handleEditOrder}
                        orderDetails={orderDetails}
                        totalPrice={totalPrice}
                        PoeCalcHandles={PoeCalcHandles}
                        selectCustomer={selectCustomer}
                        btnClicks={{...btnClicks, btnConfirmText: "Payment"}}
                    />
                    <div className={`${showInventoryOrders === "inventory" ? "" : "d-none"} 
                    col-md-7 px-0 d-md-flex`} >
                        <InventorySelect 
                            handleNewOrderSelect={handleNewOrderSelect}
                            handleEditOrder={handleEditOrder}
                            orderDetails={orderDetails}
                            handlePayment={PoeCalcHandles.handlePayment}
                            setShowInventoryOrders={setShowInventoryOrders}
                        />
                    </div>
                </div>
                )
            }
            return null 
        })})()
    )
}

export default SelectOrders;