import { useState, useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { DataTableProductGroupProps } from './types'
import { BoxDetailsProps, SwitchProps } from '../../../redux/groupList'

const DataTableProductGroup: React.FC<DataTableProductGroupProps> = ({ 
  apidata, columns, search, onHandlePortDetails
 }) =>{
  const [data, setData] = useState(apidata)
  const [datafilter, setFilter] = useState('')
  const [datafinals, setFinals] = useState(apidata)

  // console.log(apidata)
  useEffect(() => {
    let result = data?.filter((val ) => {      
      if (search == 'building_name') {
        return val.building_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
    })

    setFinals(result)
  }, [datafilter])

  useEffect(() => {
    setFinals(apidata)
    setData(apidata)
  }, [apidata])

  // Define columns for the nested DataTable (Sales Items)
  const subColumns = [
    { name: 'Switch ID', selector: (row: SwitchProps) => row.switch_id, sortable: true },
    { name: 'Switch No', selector: (row: SwitchProps) => row.switch_no, sortable: true },
    { name: 'Total Ports', selector: (row: SwitchProps) => row.total_ports, sortable: true },
    { name: 'Action', cell: (row: SwitchProps) => <>
    <button onClick={() => onHandlePortDetails(row)} 
      disabled= { false } className={`btn p-0 px-1 btn-primary btn-sm`}  >
        Details
    </button></>, },
  ];

  const ExpandedComponent = ({data}: {data: BoxDetailsProps}) => {
    return(
        <div className="card " style={{border: "1px solid #91becc", borderTop: "2px solid #3aaed1" }}>
            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                <h6>Details</h6>   
            </div>
            <div className="card-body pt-0">
                {data.switches.length ? <div className="table-responsive ">
                <DataTable
                    columns={subColumns}
                    data={data.switches}
                    highlightOnHover
                />
            </div>
                :
                <h1>No data to show</h1>
                }  
            </div>
        </div>          
    );
};


  return (
    <>

      <div className="table-responsive ">
        <DataTable
          columns={columns}
          data={datafinals}
          pagination
          fixedHeader
          highlightOnHover
          responsive
          subHeader
          noHeader
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={ExpandedComponent}
          subHeaderComponent={
            <div className="row justify-content-start">
              <div className="col-12">
                <input type="text" placeholder={`search with ${search}`} className="form-control " 
                  value={datafilter} onChange={(e) => setFilter(e.target.value)} 
                />
              </div>
            </div>
           }
        />
      </div>
    </>
  )
}

export default DataTableProductGroup;
