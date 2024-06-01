import OrderDisplay from "./OrderDisplay";
import POEcalc from "./POEcalc";

const PoeCalcOrderDisplay = ({showInventoryOrders, handleEditOrder,
    orderDetails, totalPrice, PoeCalcHandles, selectCustomer, btnClicks
}) =>{
    console.log({showInventoryOrders});
    console.log(showInventoryOrders === "orders" ? "" : "d-none ");
    return(
        <div className={`${showInventoryOrders === "orders" ? "" : "d-none "} d-md-flex 
        flex-column col-12 justify-content-between col-md-5 p-0 grow-1`} >
            <OrderDisplay 
                handleEditOrder={handleEditOrder}
                orderDetails={orderDetails}
                totalPrice={totalPrice}
            />
            <POEcalc 
                PoeCalcHandles={PoeCalcHandles}
                selectCustomer={selectCustomer}
                btnClicks={btnClicks}
            />
        </div>
    )
};

export default PoeCalcOrderDisplay;