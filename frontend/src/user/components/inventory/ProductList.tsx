
import DataTableComponent from "../sharedComponents/DataTableComponent";
import { useEffect, useState } from "react";
import { Product, ProductListProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getProductListApi } from "./apiCalls/getProductListApi";
import { setProductList } from "../../../redux/productList";
import Update_stock_modal from "./PopupModal"
import Edit_product_details from "./PopupModal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { MdBrowserUpdated } from "react-icons/md";
import { BoxDetailsProps, setGroupList } from "../../../redux/groupList";
import { ExtractedPortDetailsProps } from "../../pages/types";
import { getBoxDetailsApi } from "./productGroup/apiCalls/getApiCalls";

const ProductList: React.FC<ProductListProps> = ({onHandleActionDetails}) =>{
    const [search, setSearch] = useState('client_name');
    const [searchType, setSearchType] = useState('client_name');
    const [selectData, setSelectData] = useState<Product>()

    // open modal
    const [open_update_modal, setOpen_update_modal] = useState({ render: true, modal_open: false })
    const [open_edit_modal, setOpen_edit_modal] = useState({ render: true, modal_open: false })

    const dispatch = useDispatch();
    const boxDetails = useSelector((state: RootState) => state.groupList);
    const apiCall = useSelector((state: RootState) => state.callApi);
    const activeShop = useSelector((state: RootState) => state.activeShop);

    const columns = [
        {
            name: "Building",
            selector: (row: ExtractedPortDetailsProps) => row.building_name,
            sortable: true
        },
        {
            name: "Switch No",
            selector: (row: ExtractedPortDetailsProps) => row.switch_no,
            sortable: true
        },
        {
            name: "Port No",
            selector: (row: ExtractedPortDetailsProps) => row.port_number,
            sortable: true
        },
        {
            name: "Status",
            selector: (row: ExtractedPortDetailsProps) => row.status,
            sortable: true
        },
        {
            name: "Name",
            selector: (row: ExtractedPortDetailsProps) =>row.client_details?.username,
            sortable: true
        },
        {
            name: "House No",
            selector: (row: ExtractedPortDetailsProps) =>row.client_details?.house_no,
            sortable: true
        },
        {
            name: "Phone",
            selector: (row: ExtractedPortDetailsProps) =>row.client_details?.phone,
            sortable: true
        },
        
        {
            name: "Action",
            cell: (row: Product) => <>
                <button onClick={() => onHandleActionDetails(row)} className=" btn btn-info btn-sm ms-1"  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                </button>
                {/* <button onClick={() => {handleUpdateStock(row)}} className=" btn btn-primary btn-sm ms-1"  
                data-toggle="modal" data-target="#exampleModalCenter">
                    <MdBrowserUpdated  size={16}/>
                </button>
                <button onClick={() => {handleEditProduct(row)}} className=" btn btn-secondary btn-sm ms-1"  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button> */}
            </>,
        },  
    ]

    {/* data receve from store */ }
    useEffect(() => {
        const shop_id = activeShop.shop?.shop_id;

        if(shop_id){
            const data = JSON.stringify({shop_id});
            getBoxDetailsApi(data).then((res) =>{
                if(res.success){
                    dispatch(setGroupList(res.details))
                }
            });  
        }
    }, [apiCall, activeShop]);

    const extractedPortDetails = extractPortsWithIds(boxDetails);
    // console.log(extractedPortDetails);

    const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch(e.target.value);
        setSearchType(e.target.value); // Prop to set the search type in the parent component
    }; 

    const handleEditProduct = (row: Product) =>{
        setOpen_edit_modal({ render: !open_update_modal.render, modal_open: true })
        setSelectData(row);
    };
    
    return(
        <div>
            {
                selectData && (
                    <>
                    <Update_stock_modal 
                        select_data={selectData} open_update_data_modal={open_update_modal}
                        btn_type = "update" 
                    />
                    <Edit_product_details 
                        select_data={selectData} open_update_data_modal={open_edit_modal}
                        btn_type = "edit" 
                    />
                    </>
                )
            }
            <div className="container-fluid px-md-5" >
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>Port/Client List</h4>
                                <select value={search} onChange={handleSearchChange}>
                                    <option value="client_name">Client Name</option>
                                    <option value="phone">Phone Number</option>
                                    <option value="house_no">House Number</option>
                                    <option value="building">Building</option>
                                </select>
                            </div>
                            <div className="card-body">
                                {activeShop.shop ? 
                                 <DataTableComponent search={ searchType }
                                      apidata={extractedPortDetails} columns={columns} 
                                 />
                                :
                                <h2>Select a shop first</h2>
                                }  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;

function extractPortsWithIds(boxDetails: BoxDetailsProps[]) {
    return boxDetails.reduce((portsArray: ExtractedPortDetailsProps[], box) =>{
        const {box_id, building_name} = box; // Extract site_id at the top level
    
        if (box.switches && Array.isArray(box.switches)) {
            box.switches.forEach((switchItem) => {
                const {switch_id, switch_no} = switchItem; // Extract switch_id for each switch
    
                if (switchItem.ports && Array.isArray(switchItem.ports)) {
                    switchItem.ports.forEach((port) => {
                        // Add switch_id and site_id to each port object
                        portsArray.push({
                            ...port,
                            switch_id,
                            box_id,
                            building_name,
                            switch_no,
                        });
                    });
                }
            });
        }
        return portsArray;
    }, []);
};