import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoxDetailsProps, SwitchProps, setGroupList } from "../../../../redux/groupList";
import { RootState } from "../../../../redux/store";
import DataTableProductGroup from "../../sharedComponents/DataTableProductGroup";
import { getBoxDetailsApi } from "./apiCalls/getApiCalls";

interface  GroupListProps{
    onHandleActionDetails: (row: BoxDetailsProps) => void;
    onHandlePortDetails: (row: SwitchProps) => void
  }

const GroupList: React.FC<GroupListProps> = ({onHandleActionDetails, onHandlePortDetails}) =>{
    const [search, setSearch] = useState('group_name');
    const [searchType, setSearchType] = useState('group_name');
    
    const dispatch = useDispatch();
    const groupList = useSelector((state: RootState) => state.groupList);
    const activeShop = useSelector((state: RootState) => state.activeShop);

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
        {
            name: "Action",
            cell: (row: BoxDetailsProps) => <>
            <button onClick={() => onHandleActionDetails(row)} 
                disabled= { false}
                className={`btn p-0 px-1 btn-primary btn-sm`}  >
                    View in Detail
            </button></>,
        },
    ]

    useEffect(() =>{
        const shop_id = activeShop.shop?.shop_id;
        if(shop_id){
            const data = JSON.stringify({shop_id});
            getBoxDetailsApi(data).then((res) =>{
                console.log(res)
                if(res.success){
                    dispatch(setGroupList(res.details))
                }
            });  
        }
    }, [groupList.length === 0, activeShop]);

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
                                    <h2>Select a shop first.</h2>
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