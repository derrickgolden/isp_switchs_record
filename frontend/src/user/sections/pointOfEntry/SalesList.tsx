import { useEffect, useState } from "react";
import DisplayOrdersList from "../../components/pointOfEntry/DisplayList";
import { getSessionStorage } from "../../controllers/getSessionStorage";
import { getSalesReportApi } from "../../pages/apiCalls/getSalesReport";
import { useDispatch, useSelector } from "react-redux";
import { SalesApiData, setSalesReportList } from "../../../redux/salesReport";
import { RootState } from "../../../redux/store";
import { useSalesListContext } from "../../pages/createContext";
import PoeCalcOrderDisplay from "./PoeCalcOrderDisplay";
import { SalesItemApiData } from "../../components/reports/types";
import Swal from "sweetalert2";
import { BtnClicksProps, RefundDetailsObj } from "./types";
import { calcNewUnitDiscPrice } from "../../pages/calculations/calcNewUnitDiscPrice";

interface SalesListMapped extends Omit<SalesApiData, 'cashier' | 'sale_date'> {
  // Define additional properties or methods if needed
  cashier: string;
  sale_date: string;
};

const  SalesList = () =>{
    const [showReview, setShowReview] = useState(false);
    const [refundDetails, setRefundDetails] = useState<RefundDetailsObj[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [activeCard, setActiveCard] = useState(0);
    const [salesList, setSalesList] = useState<SalesListMapped[]>([]);
    const dispatch = useDispatch();
    // const salesList = useSelector((state: RootState) => state.salesReport);

    const {setEntryStep, handleNewCustomerOrder, showInventoryOrders,
        PoeCalcHandles, selectCustomer, btnClicks, handleNewOrderSelect,
        setOrdersList
    } = useSalesListContext();
    const [btnClick, setBtnClicks] = useState<BtnClicksProps>({
        isNewPayment: true, isDigit: false, focusedBtn: "qty"
    });

    const handleDigitClick = (digit: number) => {
        setRefundDetails(order => {
            return order.map((details) =>{
                const { units_sold, product_name, activeCard} = details;
                if(activeCard){
                    const {newUnits} = calcNewUnitDiscPrice({
                        btnClicks: btnClick, orderDetail: details, operator: "digitClick", setBtnClicks, digit
                    });
    
                    if(units_sold >= newUnits){
                        return {...details, refund_units: newUnits};
                    }else{
                        Swal.fire(`You can not refund more than units sold (${units_sold}) for ${product_name}`);
                    };
                };
                return details;
            });
        });
    };

    const handleDecreaseNcancelOrder = () => {
        // Your logic for handling quantity increment by one          
        setRefundDetails((arr) => {
          return arr.map(details =>{
            const { units_sold, product_name, activeCard, } = details;
            if(activeCard){
                const {newUnits, newDisc, newPrice} = calcNewUnitDiscPrice({
                  btnClicks, orderDetail: details, operator: "slice", setBtnClicks,
                });
                  // check if we are updating qty | discount | price
                //   const newOrderDetails = handleUpdatingStock({
                //     orderDetail, setUpdateStock, newUnits, newDisc, newPrice
                //   });

                  return {...details, refund_units: newUnits};;
            //   const{ totalPrice, total_profit }= calcTotalPrice(newOrders);
            }
            return details
          })            
        });
    }
    const handleQuantityIncByOne = () => {
        // Your logic for handling quantity increment by one          
        setRefundDetails((arr) => {
          return arr.map(details =>{
            const { units_sold, product_name, activeCard, } = details;
            if(activeCard){
                const {newUnits, newDisc, newPrice} = calcNewUnitDiscPrice({
                  btnClicks, orderDetail: details, operator: "add", setBtnClicks, digit: 1
                });
                  // check if we are updating qty | discount | price
                //   const newOrderDetails = handleUpdatingStock({
                //     orderDetail, setUpdateStock, newUnits, newDisc, newPrice
                //   });

                  return {...details, refund_units: newUnits};;
            //   const{ totalPrice, total_profit }= calcTotalPrice(newOrders);
            }
            return details
          })            
        });
    }

    const handlePayment = () =>{
        if(refundDetails.length){
            setOrdersList((arr) =>{
                return arr.map((order) =>{
                    if(order.activeOrder){
                        return {...order, orderDetails: []}
                    }
                    return order;
                });
            })
        };
        refundDetails.map((details, i) =>{
            const { refund_units } = details;
            if(refund_units && refund_units > 0){
                const units = refund_units * -1;
                const isRefund = true;
                handleNewOrderSelect( details, isRefund, units );
            };
        });
        setEntryStep({current: "inProgress", prev: "salesList"});
    };

    const {localShop} = getSessionStorage();
    useEffect(() =>{
        if(localShop){
            const url = "sales/get-sales"
            const shop_id = localShop.shop_id
            const salesReport = getSalesReportApi({url, shop_id});
            salesReport.then((data) =>{
                if(data.success){
                    const mappedData = data.details.map((sale) =>{
                        const {cashier, sales_items, sale_date} = sale;
                        const mappedItems = sales_items.map((item) =>{
                            return {...item, units: item.units_sold}
                        })
                        return {...sale, cashier: cashier.cashier_f_name, sales_items: mappedItems,
                            sale_date: new Date(sale_date).toLocaleString(),
                        };
                    })

                    setSalesList(mappedData);
                }
            })
        }
    }, []);
    
    const handleChangeActiveOrder = (sale: SalesApiData) =>{
        const {sales_items, total_price} = sale;
        const mapSaleItems = sales_items.map((items, i) =>{
            if(i === 0){
                return {...items, activeCard: true, refund_units: 0, isProductRefund: true}   
            }
            return {...items, activeCard: false, refund_units: 0, isProductRefund: true}
        })
        setRefundDetails(mapSaleItems);
        setTotalPrice(Number(total_price));
    };

    const handleEntryStep = () =>{
        setEntryStep(obj =>({...obj, current: "inProgress"}));
    };
    
    const handleDeleteCustomerOrder = () =>{

    };

    const handleEditOrder = (order: SalesItemApiData) =>{
        setRefundDetails(salesItems =>{
            return salesItems.map(item =>{
                if(item.product_id === order.product_id && item.units_sold > 0){
                    return {...item, activeCard: true};
                }
                return {...item, activeCard: false};
            });
        });
    };
  
    const poeCalcHandles = {...PoeCalcHandles, handleDigitClick, handlePayment, 
        handleDecreaseNcancelOrder, handleQuantityIncByOne};

    return(
        <div className="d-flex sales-entry-container">
            <DisplayOrdersList
                showReview = {showReview} 
                handleEntryStep = {handleEntryStep} 
                handleNewCustomerOrder = {handleNewCustomerOrder} 
                list = {salesList}
                listType = "refund"
                handleChangeActiveOrder = {handleChangeActiveOrder} 
                handleDeleteCustomerOrder = {handleDeleteCustomerOrder} 
                setShowReview = {setShowReview}
            />
            <PoeCalcOrderDisplay
                showInventoryOrders = {showInventoryOrders}
                handleEditOrder={handleEditOrder}
                orderDetails={refundDetails}
                totalPrice={totalPrice}
                PoeCalcHandles={poeCalcHandles}
                selectCustomer={selectCustomer}
                btnClicks={{...btnClicks, btnConfirmText: "Refund"}}
            />
        </div>
    )
};

export default SalesList;