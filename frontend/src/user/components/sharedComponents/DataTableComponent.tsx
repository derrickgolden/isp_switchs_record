import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { DataTableComponentProps } from './types'
import { Product } from '../inventory/types'

const DataTableComponent: React.FC<DataTableComponentProps> = ({ apidata, columns, search }) =>{
  const [data, setData] = useState(apidata as Product[])
  const [datafilter, setFilter] = useState('')
  const [datafinals, setFinals] = useState(apidata as Product[])

  useEffect(() => {
    let result: Product[] = data?.filter((val ) => {      
      if (search == 'product_name') {
        return val.product_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'group_name') {
        return val.group_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'product_id') {
        return val.product_id?.toString().match(datafilter?.toString())
      }
    }) as Product[]

    setFinals(result)

  }, [datafilter])

  useEffect(() => {
    setFinals(apidata as Product[])
    setData(apidata as Product[])
  }, [apidata])



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

export default DataTableComponent;
