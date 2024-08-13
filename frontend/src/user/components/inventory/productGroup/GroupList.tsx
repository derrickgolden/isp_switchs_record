import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoxDetailsProps, SwitchProps, setGroupList } from "../../../../redux/groupList";
import { RootState } from "../../../../redux/store";
import DataTableProductGroup from "../../sharedComponents/DataTableProductGroup";
import { getBoxDetailsApi } from "./apiCalls/getApiCalls";

interface  GroupListProps{
    onHandlePortDetails: (row: SwitchProps) => void
  }

const GroupList: React.FC<GroupListProps> = ({ onHandlePortDetails}) =>{
    const [search, setSearch] = useState('group_name');
    const [searchType, setSearchType] = useState('group_name');
    
    const groupList = useSelector((state: RootState) => state.groupList);
    const activeShop = useSelector((state: RootState) => state.activeShop);
    // console.log(groupList)
    const columns = [
        {
            name: "Box ID",
            selector: (row: BoxDetailsProps) => row.box_id,
            sortable: true
        },
        {
            name: "Building Name",
            selector: (row: BoxDetailsProps) => row.building_name,
            sortable: true
        },
        {
            name: "Box Description",
            selector: (row: BoxDetailsProps) => row.box_description,
            sortable: true
        },   
    ]

    const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch(e.target.value);
        setSearchType(e.target.value); // Prop to set the search type in the parent component
    };

    return(
        <div className="px-md-5 pb-5">
            <div className="container-fluid" >
                {/* <Breadcrumb title={title} brad={brad} /> */}
                <Link to="#" ><button type="button" className="btn btn-outline-success active btn-sm ">All</button></Link>
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>Box List</h4>
                                {/* <select value={search} onChange={handleSearchChange}>
                                    <option value="product_name">Product Name</option>
                                    <option value="group_name">Product BoxDetailsProps</option>
                                    <option value="product_id">Product Id</option>
                                </select> */}
                            </div>
                            <div className="card-body">
                                {activeShop.shop ?  
                                    <DataTableProductGroup 
                                        search={ searchType }
                                        apidata={groupList} 
                                        columns={columns} 
                                        onHandlePortDetails ={onHandlePortDetails}
                                    />  :
                                    <h2>Select a box first.</h2>
                                }           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupList;