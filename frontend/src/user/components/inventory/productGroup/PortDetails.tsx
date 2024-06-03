import { MdInventory } from "react-icons/md";
import PortCard from "./PortCard";

const PortDetails = ({setShowDetails}) =>{
    const data = ([
        {icon:<MdInventory size={32}/>, status: "Good", totals: 5, caption: "Inventory Status", forCssDispaly: "success", footerCaption: "View detailed report", btnType: "inventory", data: 12}, 
        {icon:<MdInventory size={32}/>, status: "Good", totals: 5, caption: "Low Stock Warning", forCssDispaly: "warning", footerCaption: "View detailed report", btnType: "warning", data: 12},
        {icon:<MdInventory size={32}/>, status: "Good", totals: 10, caption: "Product Available", forCssDispaly: "info", footerCaption: "Visit inventory", btnType: "available", data: 12},
        {icon:<MdInventory size={32}/>, status: "Good", totals: 20, caption: "Products Shortage", forCssDispaly: "danger", footerCaption: "Resolve now", btnType: "shortage", data: 13}
    ])
    return(
        <div className="d-flex">
            <div className="px-4 col-10 d-flex flex-wrap gap-4 portsCard">
                {
                    data.map((port, i) =>(
                        <PortCard 
                            key={1}
                            data={port}
                        />
                    ))
                }
            </div>
            <div className="d-flex flex-column gap-2 col-2 border ">
                {
                    [1,2,3,4,5,6,7,8,9,10].map((port, i)=>(
                    <button onClick={() =>{}} 
                        disabled= { false}
                        className={`btn btn-light bold`}  >
                            {port}
                    </button>

                    ))
                }
                    <button onClick={() =>{}} 
                        disabled= { false}
                        className={`btn btn-secondary bold`}  >
                            Back
                    </button>
            </div>
        </div>
    )
};

export default PortDetails;