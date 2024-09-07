import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BoxDetailsProps, SwitchProps } from "../../../../redux/groupList";
import { RootState } from "../../../../redux/store";
import DataTableProductGroup from "../../sharedComponents/DataTableProductGroup";

interface  GroupListProps{
    onHandlePortDetails: (row: SwitchProps) => void
    expandedRows: number[];
  }

const GroupList: React.FC<GroupListProps> = ({ onHandlePortDetails, expandedRows}) =>{
    const [search, setSearch] = useState('group_name');
    const [searchType, setSearchType] = useState('building_name');
    
    const groupList = useSelector((state: RootState) => state.groupList);
    const activeShop = useSelector((state: RootState) => state.activeShop);

    const columns = [
        {
            name: "Building Name",
            selector: (row: BoxDetailsProps) => row.building_name,
            sortable: true
        },
        {
            name: "Site Location",
            selector: (row: BoxDetailsProps) => row.site_location,
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
                                <select value={search} onChange={handleSearchChange}>
                                    <option value="building_name">Building Name</option>
                                    <option value="site_location">Site Location</option>
                                </select>
                            </div>
                            <div className="card-body">
                                {activeShop.shop ?  
                                    <DataTableProductGroup 
                                        search={ searchType }
                                        apidata={groupList} 
                                        columns={columns} 
                                        onHandlePortDetails ={onHandlePortDetails}
                                        expandedRows = {expandedRows}
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