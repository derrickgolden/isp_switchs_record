
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

import { SetStateAction, useEffect, useState } from "react";
import { getStockDetailsApi } from "./apiCalls/getStockDetails";
import { details } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getSalesReportApi } from "./apiCalls/getSalesReport";
import { setSalesReportList } from "../../redux/salesReport";
import { BottomSummaryCardProps } from "../components/ispDashboard/types";
import { analyzeDetails } from "./calculations/boxTotals";
import { getBoxDetailsApi } from "../components/sites/boxes/apiCalls/getApiCalls";
import { setGroupList } from "../../redux/groupList";

const IspDashboard: React.FC = () =>{
    const dispatch = useDispatch();

    const boxDetails = useSelector((state: RootState) => state.groupList);
    const activeShop = useSelector((state: RootState) => state.activeShop); 
    
    useEffect(() =>{
        if(activeShop.shop){
            const shop_id = activeShop.shop.shop_id;
            const data = JSON.stringify({shop_id});
            const boxDetails = getBoxDetailsApi(data);
            boxDetails.then(data =>{
                // console.log(data);
                if(data.success){
                    dispatch(setGroupList(data.details));
                }
            })   
        }
    }, [activeShop])

    const boxTotals = analyzeDetails(boxDetails);
   
    return(
        <div  className='body2 bg-white'>
            <section className="upper-section px-0 px-sm-5 bg-light py-5 mb-3">
                <div className="d-flex justify-content-between align-items-center px-5 px-sm-0">
                    <div>
                        <h3 className="font-family-poppins font-weight-700 font-size-24 line-height-24 text-dark">
                            Dashboard
                        </h3>
                        <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                            A quick data overview of the switches.
                        </p>
                    </div>  
                </div>
            </section>
            <section className="lower-section bg-white d-flex flex-row flex-wrap justify-content-around mb-5">
            {
                boxTotals.map((profit, i) =>(
                    <div key={i} className={` mb-4 card col-5 col-lg-5 text-center card 
                        shadow p-4  ${profit.bg_color}`}
                    >
                        <div >
                            <div className="card-content clearfix">
                                <p className="card-stats-title right card-title  wdt-lable">{profit.lebal}</p>
                                <h4 className="right panel-middle margin-b-0 wdt-lable">{profit.total}</h4>
                            </div>

                        </div>
                    </div>
                ))
            }
        </section>
            
        </div>
    )
}

export default IspDashboard;