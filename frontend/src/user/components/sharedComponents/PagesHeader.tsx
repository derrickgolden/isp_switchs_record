import { FaChevronRight } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";

interface PagesHeaderProps{
    setShowDetails: (showlist: string) => void;
    btnInfo: {text: string, navigate: string, details: string};
}

const PagesHeader: React.FC<PagesHeaderProps> = ({setShowDetails, btnInfo }) =>{
    const [totals, setTotals] = useState<number>()
    const groupList = useSelector((state: RootState) => state.groupList)    
    const productList = useSelector((state: RootState) => state.productList)
    
    useEffect(() =>{
        if(btnInfo.details === "product"){
            setTotals(productList.length);
        }else if(btnInfo.details === "group"){
            setTotals(groupList.length)
        }
    }, [ groupList, productList])
    
    return(
        <section className="upper-section bg-light py-5 px-2 mb-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center px-md-5">
                <div>
                    <div className="d-flex align-items-center">
                        <h1 className="font-weight-bold fs-4 lh-1" 
                            style={{fontFamily: 'sans-serif', color: 'rgba(29, 36, 46, 0.5)'}}>
                                Boxes &nbsp;
                        </h1>
                        <FaChevronRight />
                        <h1 className="font-weight-bold fs-4" style={{ fontFamily: 'Poppins', color: '#1D242E' }}>
                            &nbsp; {btnInfo.details ==="product"? `List of switches(${totals})`:
                                    btnInfo.details === "group"? `List of Boxes(${totals})` : null}
                        </h1>
                    </div>
                    <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                        {btnInfo.details ==="product"? `List of switches.`:
                        btnInfo.details === "group"? `List of boxes installed.` : null}
                    </p>
                </div>
                <div className=" d-flex gap-4 align-items-center" 
                style={{ width: "fit-content", height: "46px" }}>
                    <button onClick={() => setShowDetails("addsite")}
                    type="button" className="d-flex align-items-center btn btn-outline-danger">
                        <IoAddOutline size={20} /> Site
                    </button>
                    <button onClick={() => setShowDetails(btnInfo.navigate)}
                    type="button" className="d-flex align-items-center btn btn-outline-danger ">
                        <IoAddOutline size={20} /> {btnInfo.text}
                    </button>
                    <button onClick={() => setShowDetails("addswitch")}
                    type="button" className="d-flex align-items-center btn btn-outline-danger ">
                        <IoAddOutline size={20} /> Switch
                    </button>
                </div>                  
            </div>
        </section>
    )
}

export default PagesHeader;